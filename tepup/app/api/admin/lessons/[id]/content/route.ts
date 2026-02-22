import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/admin-auth';

// GET /api/admin/lessons/[id]/content - Get lesson content
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: lessonId } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        content: true,
        level: {
          include: {
            course: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        lesson: {
          id: lesson.id,
          name: lesson.name,
          course: lesson.level.course,
          level: { id: lesson.level.id, name: lesson.level.name },
        },
        content: lesson.content || {
          title: lesson.name,
          blocks: [],
        },
      },
    });
  } catch (error) {
    console.error('Error fetching lesson content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson content' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/lessons/[id]/content - Update lesson content
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: lessonId } = await params;
    const body = await request.json();
    const { title, blocks } = body;

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Tiêu đề là bắt buộc' },
        { status: 400 }
      );
    }

    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Upsert content
    const content = await prisma.lessonContent.upsert({
      where: { lessonId },
      create: {
        lessonId,
        title: title.trim(),
        blocks: blocks || [],
      },
      update: {
        title: title.trim(),
        blocks: blocks || [],
      },
    });

    return NextResponse.json({ data: content });
  } catch (error) {
    console.error('Error updating lesson content:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson content' },
      { status: 500 }
    );
  }
}
