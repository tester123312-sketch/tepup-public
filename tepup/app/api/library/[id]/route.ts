import { NextResponse } from 'next/server';
import { getDocumentById } from '@/lib/services/library-service';

// GET /api/library/[id] - Public endpoint for single library document
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const document = await getDocumentById(id);

    if (!document || !document.isActive) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    console.error('Error fetching library document:', error);
    return NextResponse.json(
      { error: 'Không thể tải tài liệu' },
      { status: 500 }
    );
  }
}
