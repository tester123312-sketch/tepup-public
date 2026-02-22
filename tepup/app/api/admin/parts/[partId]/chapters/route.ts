import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/admin-auth';

// GET all chapters for a part
export async function GET(
  request: Request,
  { params }: { params: Promise<{ partId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { partId } = await params;

  try {
    const chapters = await prisma.chapter.findMany({
      where: { partId },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ data: chapters });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}

// POST create new chapter
export async function POST(
  request: Request,
  { params }: { params: Promise<{ partId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { partId } = await params;

  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Tiêu đề chương là bắt buộc' },
        { status: 400 }
      );
    }

    // Get max sortOrder
    const maxSortOrder = await prisma.chapter.aggregate({
      where: { partId },
      _max: { sortOrder: true },
    });

    const chapter = await prisma.chapter.create({
      data: {
        title,
        partId,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
      },
    });

    return NextResponse.json({ data: chapter }, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
}
