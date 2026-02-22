import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdmin, IMAGES_BUCKET } from '@/lib/supabase-storage';

function toWikimediaThumbnailUrl(src: string, width = 800): string {
  const match = src.match(
    /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([^/]+)\/([^/]+)\/(.+)$/
  );
  if (!match) return src;
  const [, h1, h2, filename] = match;
  if (!filename.toLowerCase().endsWith('.svg')) return src;
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${h1}/${h2}/${filename}/${width}px-${filename}.png`;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contentType = request.headers.get('content-type') || '';
  let buffer: Buffer;
  let mimeType: string;
  let filename: string;

  if (contentType.includes('multipart/form-data')) {
    // File upload (drag & drop)
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    buffer = Buffer.from(await file.arrayBuffer());
    mimeType = file.type || 'image/jpeg';
    const hash = Date.now().toString(36);
    filename = `${hash}-${file.name}`;
  } else {
    // URL upload (paste URL → fetch → upload)
    const body = await request.json() as { url?: string };
    const url = body.url;
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    // Skip if already stored in our Supabase Storage
    if (url.includes(process.env.SUPABASE_URL!)) {
      return NextResponse.json({ publicUrl: url });
    }

    const fetchUrl = toWikimediaThumbnailUrl(url);
    const response = await fetch(fetchUrl, {
      headers: { 'User-Agent': 'Tepup/1.0 (https://tepup.space; admin image upload) Node.js' },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image (${response.status})` },
        { status: 400 }
      );
    }

    mimeType = response.headers.get('content-type') || 'image/jpeg';
    buffer = Buffer.from(await response.arrayBuffer());

    const originalName = fetchUrl.split('/').pop()!.split('?')[0];
    const hash = Buffer.from(url).toString('base64url').slice(0, 8);
    const ext = originalName.includes('.') ? '' : '.jpg';
    filename = `${hash}-${originalName}${ext}`;
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage
    .from(IMAGES_BUCKET)
    .upload(filename, buffer, { contentType: mimeType, upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(filename);
  return NextResponse.json({ publicUrl: data.publicUrl });
}
