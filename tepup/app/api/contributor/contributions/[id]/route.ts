import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getContributorSession } from '@/lib/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getContributorSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const contribution = await prisma.contribution.findFirst({
    where: { id, contributorId: session.user.id },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' },
        include: { reviewer: { select: { username: true, name: true } } },
      },
    },
  });

  if (!contribution) {
    return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 });
  }

  return NextResponse.json(contribution);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getContributorSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const contribution = await prisma.contribution.findFirst({
    where: { id, contributorId: session.user.id },
  });

  if (!contribution) {
    return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 });
  }

  if (!['DRAFT', 'CHANGES_REQUESTED'].includes(contribution.status)) {
    return NextResponse.json(
      { error: 'Chỉ có thể chỉnh sửa bản nháp hoặc đóng góp cần chỉnh sửa' },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { data, message } = body;

  const updated = await prisma.contribution.update({
    where: { id },
    data: {
      ...(data && { data }),
      ...(message !== undefined && { message }),
      status: 'DRAFT',
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getContributorSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const contribution = await prisma.contribution.findFirst({
    where: { id, contributorId: session.user.id },
  });

  if (!contribution) {
    return NextResponse.json({ error: 'Không tìm thấy' }, { status: 404 });
  }

  if (contribution.status !== 'DRAFT') {
    return NextResponse.json(
      { error: 'Chỉ có thể xóa bản nháp' },
      { status: 400 }
    );
  }

  await prisma.contribution.delete({ where: { id } });

  return NextResponse.json({ message: 'Đã xóa' });
}
