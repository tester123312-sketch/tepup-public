import { NextResponse } from 'next/server';
import { getDocuments } from '@/lib/services/library-service';

// GET /api/library - Public endpoint for library documents
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;

    const documents = await getDocuments(search, category);

    return NextResponse.json({ data: documents });
  } catch (error) {
    console.error('Error fetching library documents:', error);
    return NextResponse.json(
      { error: 'Không thể tải dữ liệu thư viện' },
      { status: 500 }
    );
  }
}
