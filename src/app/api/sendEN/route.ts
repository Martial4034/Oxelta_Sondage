import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplateEn } from '@/components/EmailTemplateEn';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Oxelta <contact@oxelta.io>',
      to: [email],
      subject: 'Thank you for your participation',
      react: EmailTemplateEn({ email }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
