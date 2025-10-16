import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Contact API called');
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact me directly.' },
      { status: 500 }
    );
  }

  // Initialize Resend with your API key
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate the request body
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: ['mibrahimtariq@icloud.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
} 