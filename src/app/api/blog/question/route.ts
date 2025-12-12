import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { BlogPost } from '@/data/blog-posts';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { post, question }: { post: BlogPost; question: string } =
      await req.json();

    if (!post || !question) {
      return NextResponse.json(
        { error: 'Missing post or question' },
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

    const systemPrompt = `You are a helpful assistant answering questions about a specific blog article. 
Use only the information from the article provided. If the question cannot be answered from the article, 
politely say so. Be concise, accurate, and helpful.`;

    const userPrompt = `Article Title: ${post.title}
Article Description: ${post.description}
Article Content: ${post.content}

Question: ${question}

Answer the question based on the article content above.`;

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2,
      maxOutputTokens: 600,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error answering question:', error);
    return NextResponse.json(
      { error: 'Failed to answer question' },
      { status: 500 }
    );
  }
}
