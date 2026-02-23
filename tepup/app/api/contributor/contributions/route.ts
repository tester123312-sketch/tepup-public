import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getContributorSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const session = await getContributorSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const where: Record<string, unknown> = { contributorId: session.user.id };
  if (status) where.status = status;

  const contributions = await prisma.contribution.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return NextResponse.json(contributions);
}

export async function POST(req: NextRequest) {
  const session = await getContributorSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { type, data, message } = body;

  if (!type || !data) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
  }

  const contribution = await prisma.contribution.create({
    data: {
      contributorId: session.user.id,
      type,
      data,
      message,
      status: 'DRAFT',
    },
  });

  return NextResponse.json(contribution, { status: 201 });
}
