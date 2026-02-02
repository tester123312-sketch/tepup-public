import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/admin-auth';

// GET chapter by id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chapterId } = await params;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        content: true,
        part: {
          include: {
            story: true,
          },
        },
      },
    });

    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: chapter });
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapter' },
      { status: 500 }
    );
  }
}

// PUT update chapter
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chapterId } = await params;

  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Tiêu đề chương là bắt buộc' },
        { status: 400 }
      );
    }

    const chapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: { title },
    });

    return NextResponse.json({ data: chapter });
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to update chapter' },
      { status: 500 }
    );
  }
}

// DELETE chapter
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { chapterId } = await params;

  try {
    // Delete content first (cascade should handle this but being explicit)
    await prisma.chapterContent.delete({
      where: { chapterId },
    }).catch(() => {
      // Ignore if no content exists
    });

    await prisma.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return NextResponse.json(
      { error: 'Failed to delete chapter' },
      { status: 500 }
    );
  }
}
