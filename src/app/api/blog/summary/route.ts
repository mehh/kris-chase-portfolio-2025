import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { slug, title, content, description } = await req.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title, content' },
        { status: 400 }
      );
    }

    // Check if summary already exists in database
    const { data: existingSummary, error: fetchError } = await supabaseAdmin
      .from('blog_post_summaries')
      .select('summary_data')
      .eq('post_slug', slug)
      .single();

    if (existingSummary && !fetchError) {
      // Return cached summary
      return NextResponse.json(existingSummary.summary_data);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set' },
        { status: 500 }
      );
    }

    const openai = createOpenAI({ apiKey });

    // Extract key content (first 3000 chars for context)
    const contentPreview = content.substring(0, 3000);

    const systemPrompt = `You are an expert content analyst. Generate a concise, valuable summary and key takeaways for technical blog articles. 
Your response must be valid JSON with this exact structure:
{
  "summary": "A 2-3 sentence summary of the article's main points",
  "keyTakeaways": [
    "First key takeaway in one clear sentence",
    "Second key takeaway",
    "Third key takeaway"
  ]
}
Always provide exactly 3-5 key takeaways. Be specific and actionable. Focus on insights that would be valuable to engineering leaders and technical professionals.`;

    const userPrompt = `Article Title: ${title}
${description ? `Description: ${description}\n` : ''}
Article Content (excerpt): ${contentPreview}

Generate a summary and key takeaways for this article.`;

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
      maxOutputTokens: 500,
    });

    // Collect the full response
    let fullResponse = '';
    for await (const chunk of result.textStream) {
      fullResponse += chunk;
    }

    // Try to parse as JSON, fallback to structured response if parsing fails
    let summaryData;
    try {
      summaryData = JSON.parse(fullResponse);
    } catch {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          summaryData = JSON.parse(jsonMatch[0]);
        } catch {
          // Fallback: create structured response from text
          const lines = fullResponse.split('\n').filter((l) => l.trim());
          const summary = lines[0] || fullResponse.substring(0, 200);
          const takeaways = lines
            .slice(1)
            .filter((l) => l.trim().match(/^[-•*]\s/))
            .map((l) => l.replace(/^[-•*]\s/, '').trim())
            .slice(0, 5);

          summaryData = {
            summary,
            keyTakeaways: takeaways.length > 0 ? takeaways : [summary],
          };
        }
      } else {
        // Ultimate fallback
        summaryData = {
          summary: fullResponse.substring(0, 200),
          keyTakeaways: [fullResponse.substring(0, 150)],
        };
      }
    }

    // Save to database for future requests
    try {
      await supabaseAdmin
        .from('blog_post_summaries')
        .upsert({
          post_slug: slug,
          summary_data: summaryData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'post_slug',
        });
    } catch (dbError) {
      // Log but don't fail the request if DB save fails
      console.error('Failed to save summary to database:', dbError);
    }

    return NextResponse.json(summaryData);
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
