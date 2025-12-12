import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { question, articleTitle, articleContent, articleDescription } =
      await req.json();

    if (!question || !articleTitle || !articleContent) {
      return NextResponse.json(
        { error: 'Missing required fields: question, articleTitle, articleContent' },
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

    // Use first 4000 chars of content for context (to stay within token limits)
    const contentContext = articleContent.substring(0, 4000);

    const systemPrompt = `You are a helpful assistant that answers questions about a specific blog article. 
Your answers should be:
- Based ONLY on the provided article content
- Clear and concise (2-4 sentences typically)
- Technical but accessible
- If the question can't be answered from the article, say so politely

Be helpful and conversational, but stay grounded in the article's content.`;

    const userPrompt = `Article Title: ${articleTitle}
${articleDescription ? `Description: ${articleDescription}\n` : ''}
Article Content:
${contentContext}

User Question: ${question}

Answer the question based on the article content above.`;

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.4,
      maxOutputTokens: 300,
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
