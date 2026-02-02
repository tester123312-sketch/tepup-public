import { NextResponse } from 'next/server';
import {
  getChapterBySlug,
  getChapterContent,
} from '@/lib/services/content-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [chapterContext, content] = await Promise.all([
      getChapterBySlug(slug),
      getChapterContent(slug),
    ]);

    if (!chapterContext) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      chapter: chapterContext.chapter,
      story: chapterContext.story,
      part: chapterContext.part,
      content,
    });
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
