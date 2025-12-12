import { NextResponse } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { slug, title, content, description } = await req.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title, content' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set' },
        { status: 500 }
      );
    }

    const openai = createOpenAI({ apiKey });

    // Extract key content (first 4000 chars for context)
    const contentPreview = content.substring(0, 4000);

    const systemPrompt = `You are an expert social media content creator specializing in technical and professional content for engineering leaders, CTOs, and technical professionals.

Your task is to create engaging social media posts from blog articles. Generate content that:
- Captures the key insights and value proposition
- Is engaging and shareable
- Uses appropriate tone for the platform (LinkedIn: professional, thoughtful; Twitter: concise, punchy)
- Includes a clear call-to-action or hook
- Stays true to the article's main points
- Uses relevant hashtags sparingly (2-3 max)

For Twitter threads, break content into logical tweets (max 280 chars each, aim for 2-4 tweets).
For LinkedIn, create a single post (max 3000 chars, but aim for 500-800 for engagement).

Your response must be valid JSON with this exact structure:
{
  "linkedin": "Full LinkedIn post text with line breaks",
  "twitter": "Single tweet version (if fits in 280 chars) or first tweet of thread",
  "twitterThread": ["Tweet 1", "Tweet 2", "Tweet 3"]
}

Always provide both LinkedIn and Twitter versions. For Twitter, if content exceeds 280 characters, use the thread format.`;

    const userPrompt = `Article Title: ${title}
${description ? `Description: ${description}\n` : ''}
Article Content (excerpt): ${contentPreview}

Generate a LinkedIn post and Twitter thread from this article. Make them engaging, shareable, and true to the article's insights.`;

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxOutputTokens: 1500,
    });

    // Try to parse as JSON
    let socialPostData;
    try {
      socialPostData = JSON.parse(result.text);
    } catch {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          socialPostData = JSON.parse(jsonMatch[0]);
        } catch {
          // Fallback: create structured response
          const lines = result.text.split('\n').filter((l) => l.trim());
          socialPostData = {
            linkedin: lines.join('\n\n'),
            twitter: lines[0] || title,
            twitterThread: lines.slice(0, 4).filter((l) => l.length <= 280),
          };
        }
      } else {
        // Ultimate fallback
        socialPostData = {
          linkedin: result.text,
          twitter: title,
          twitterThread: [title],
        };
      }
    }

    // Ensure twitterThread is an array
    if (!Array.isArray(socialPostData.twitterThread)) {
      socialPostData.twitterThread = [socialPostData.twitter || socialPostData.twitterThread];
    }

    return NextResponse.json(socialPostData);
  } catch (error) {
    console.error('Error generating social post:', error);
    return NextResponse.json(
      { error: 'Failed to generate social post' },
      { status: 500 }
    );
  }
}
