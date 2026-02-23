import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { PERSONAS } from '@/lib/ai/personas';
import type { AIModel, PersonaId } from '@/lib/types/ai-chat';

const VALID_MODELS: AIModel[] = [
  'llama-3.3-70b-versatile',
  'mixtral-8x7b-32768',
  'llama3-8b-8192',
  'gemma2-9b-it',
];

interface ChatRequestBody {
  messages: { role: 'user' | 'assistant'; content: string }[];
  model: AIModel;
  personaId: PersonaId;
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY chưa được cấu hình' }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const body: ChatRequestBody = await request.json();
    const { messages, model, personaId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages là bắt buộc' }, { status: 400 });
    }

    if (!VALID_MODELS.includes(model)) {
      return NextResponse.json({ error: 'Model không hợp lệ' }, { status: 400 });
    }

    const persona = PERSONAS[personaId] ?? PERSONAS['default'];

    // Groq uses OpenAI-compatible format: system prompt as first message
    const fullMessages = [
      { role: 'system' as const, content: persona.systemPrompt },
      ...messages,
    ];

    let stream;
    try {
      stream = await groq.chat.completions.create({
        model,
        messages: fullMessages,
        stream: true,
        max_tokens: 2048,
        temperature: 0.7,
      });
    } catch (initError) {
      console.error('Groq init error:', initError);
      return NextResponse.json({ error: 'Không thể kết nối với AI' }, { status: 500 });
    }

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error('Streaming error:', err);
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Lỗi streaming' })}\n\n`));
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          } catch { /* ignore */ }
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi kết nối với AI' },
      { status: 500 }
    );
  }
}
