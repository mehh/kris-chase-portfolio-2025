import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { BlogPost } from '@/data/blog-posts';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { post }: { post: BlogPost } = await req.json();

    if (!post) {
      return NextResponse.json({ error: 'Missing post data' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set' },
        { status: 500 }
      );
    }

    const openai = createOpenAI({ apiKey });

    const systemPrompt = `You are a technical writing assistant. Generate a concise, insightful summary with 3-5 key takeaways from the article. 
Format as a brief paragraph followed by bullet points. Be specific and actionable.`;

    const userPrompt = `Article Title: ${post.title}
Article Description: ${post.description}
Article Content (first 2000 chars): ${post.content.substring(0, 2000)}...

Generate a summary with key takeaways.`;

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
