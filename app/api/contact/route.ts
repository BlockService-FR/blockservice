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
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.error('Body validation failed:', result.error);
      return NextResponse.json(
        { success: false, error: 'Invalid input data' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed');
      return NextResponse.json(
        { success: false, error: 'Invalid reCAPTCHA' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      service: body.service ? sanitizeInput(body.service) : undefined,
      message: sanitizeInput(body.message),
    };
    console.log('Sanitized data:', sanitizedData);

    // Send email
    await resend.emails.send({
      from: 'BlockService <noreply@blockservice.fr>',
      to: process.env.RECIPIENT_EMAIL!,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        ${sanitizedData.service ? `<p><strong>Service:</strong> ${sanitizedData.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `,
    });

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