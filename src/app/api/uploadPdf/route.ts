import { NextRequest, NextResponse } from 'next/server';
import { storageAdmin } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file || !fileName) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileRef = storageAdmin.file(`pdfs/${fileName}`);
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}