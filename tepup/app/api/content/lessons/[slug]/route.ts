import { NextResponse } from 'next/server';
import {
  getLessonBySlug,
  getLessonContent,
  getExercisesForLesson,
} from '@/lib/services/content-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [lessonContext, content, exercises] = await Promise.all([
      getLessonBySlug(slug),
      getLessonContent(slug),
      getExercisesForLesson(slug),
    ]);

    if (!lessonContext) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lesson: lessonContext.lesson,
      course: lessonContext.course,
      level: lessonContext.level,
      content,
      exercises,
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
