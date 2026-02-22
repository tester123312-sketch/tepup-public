import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/admin-auth';

// GET /api/admin/courses - List all courses
export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const courses = await prisma.course.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
      include: {
        category: {
          select: { id: true, name: true },
        },
        _count: {
          select: { levels: true },
        },
      },
    });

    // Count lessons for each course
    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await prisma.lesson.count({
          where: {
            level: { courseId: course.id },
          },
        });
        return { ...course, lessonCount };
      })
    );

    return NextResponse.json({ data: coursesWithLessonCount });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/admin/courses - Create new course
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, icon, categoryId, isNew } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Tên khóa học là bắt buộc' },
        { status: 400 }
      );
    }

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug là bắt buộc' },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Danh mục là bắt buộc' },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: slug.trim() },
    });

    if (existingCourse) {
      return NextResponse.json(
        { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
        { status: 400 }
      );
    }

    // Get max sortOrder for category
    const maxSortOrder = await prisma.course.aggregate({
      where: { categoryId },
      _max: { sortOrder: true },
    });

    const course = await prisma.course.create({
      data: {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description?.trim() || null,
        icon: icon || 'book-open',
        categoryId,
        isNew: isNew ?? false,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
      },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
