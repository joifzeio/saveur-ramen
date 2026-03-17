import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // Phone is optional
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

async function sendAdminNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Saveurs Ramen <onboarding@resend.dev>',
      to: ['saveurs.ramen.rennes@gmail.com'],
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #0a0b0a;
                color: #efe7d2;
                padding: 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px 20px;
                border: 1px solid #e0e0e0;
              }
              .detail-row {
                margin: 10px 0;
                padding: 10px;
                background-color: white;
                border-left: 3px solid #efe7d2;
              }
              .message-box {
                background-color: white;
                padding: 15px;
                border-left: 3px solid #efe7d2;
                margin: 15px 0;
                white-space: pre-wrap;
              }
              .footer {
                background-color: #0a0b0a;
                color: #efe7d2;
                padding: 15px;
                text-align: center;
                border-radius: 0 0 10px 10px;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="detail-row">
                <strong>From:</strong> ${data.name}
              </div>
              <div class="detail-row">
                <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
              </div>
              ${data.phone ? `<div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>` : ''}
              <div class="detail-row">
                <strong>Subject:</strong> ${data.subject}
              </div>
              <div class="message-box">
                <strong>Message:</strong><br><br>
                ${data.message}
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #666;">
                Reply directly to this email to respond to ${data.name}.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 5px 0;">Saveurs Ramen</p>
              <p style="margin: 5px 0;">Contact Form Notification</p>
            </div>
          </body>
        </html>
      `,
      replyTo: data.email,
    });

    if (error) {
      console.error('Error sending admin notification:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

async function sendConfirmationEmail(data: {
  name: string;
  email: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Saveurs Ramen <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Merci de nous avoir contacté — Saveurs Ramen',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #0a0b0a;
                color: #efe7d2;
                padding: 30px 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px 20px;
                border: 1px solid #e0e0e0;
                border-radius: 0 0 10px 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">SAVEURS RAMEN</h1>
            </div>
            <div class="content">
              <h2 style="color: #0a0b0a; margin-top: 0;">Thank You for Reaching Out!</h2>
              <p>Hi ${data.name},</p>
              <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible, typically within 24 hours.</p>
              <p>Si votre demande est urgente, n'hésitez pas à nous appeler directement au <strong>+33 2 99 77 43 48</strong>.</p>
              <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe Saveurs Ramen</strong></p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              <p style="font-size: 14px; color: #666;">
                <strong>Saveurs Ramen</strong><br>
                9 Rue de Châtillon, 35000 Rennes, France<br>
                Tél : +33 2 99 77 43 48<br>
                Instagram: @saveurs_ramen
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    const errors: string[] = [];

    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      errors.push('Name must be between 2 and 100 characters');
    }

    if (!email || !validateEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (phone && !validatePhone(phone)) {
      errors.push('Please provide a valid phone number');
    }

    if (!subject || subject.trim().length < 2 || subject.trim().length > 200) {
      errors.push('Subject must be between 2 and 200 characters');
    }

    if (!message || message.trim().length < 10 || message.trim().length > 2000) {
      errors.push('Message must be between 10 and 2000 characters');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Send admin notification
    const adminResult = await sendAdminNotificationEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send confirmation to user
    const confirmationResult = await sendConfirmationEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    // Log email results but don't fail the request
    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error);
    }
    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        emailSent: confirmationResult.success,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
