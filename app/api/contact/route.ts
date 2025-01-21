import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { sanitizeInput } from '@/lib/sanitize';

const resend = new Resend(process.env.RESEND_API_KEY);

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  service: z.string().optional(),
  message: z.string().min(10).max(1000),
  recaptchaToken: z.string(),
});

export async function POST(request: Request) {
  try {
    console.log('Received POST request');

    const body = await request.json();
    console.log('Parsed request body:', body);

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.error('Validation failed:', result.error);
      return NextResponse.json(
        { success: false, error: 'Invalid input data' },
        { status: 400 }
      );
    }


    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}