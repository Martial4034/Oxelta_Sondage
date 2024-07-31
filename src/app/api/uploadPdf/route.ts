// src/app/api/uploadPdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'pdfs');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file || !fileName) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const filePath = join(UPLOAD_DIR, fileName);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
