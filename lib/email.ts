import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReservationEmailData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  phone: string;
}

export async function sendReservationConfirmation(data: ReservationEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Illusion Cafe <onboarding@resend.dev>', // Change this to your verified domain
      to: [data.email],
      subject: 'Reservation Confirmation - Illusion Cafe & Sports Lounge',
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
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 400;
                letter-spacing: 1px;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px 20px;
                border: 1px solid #e0e0e0;
              }
              .detail-row {
                margin: 15px 0;
                padding: 10px;
                background-color: white;
                border-left: 3px solid #efe7d2;
              }
              .detail-label {
                font-weight: bold;
                color: #0a0b0a;
                margin-bottom: 5px;
              }
              .detail-value {
                color: #555;
                font-size: 16px;
              }
              .footer {
                background-color: #0a0b0a;
                color: #efe7d2;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 10px 10px;
                font-size: 14px;
              }
              .note {
                background-color: #fff9e6;
                border-left: 4px solid #ffcc00;
                padding: 15px;
                margin: 20px 0;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>ILLUSION CAFE & SPORTS LOUNGE</h1>
            </div>
            <div class="content">
              <h2 style="color: #0a0b0a; margin-top: 0;">Reservation Confirmed!</h2>
              <p>Hi ${data.name},</p>
              <p>Thank you for choosing Illusion Cafe & Sports Lounge. Your reservation has been confirmed.</p>

              <div style="margin: 30px 0;">
                <div class="detail-row">
                  <div class="detail-label">Name</div>
                  <div class="detail-value">${data.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Date</div>
                  <div class="detail-value">${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Time</div>
                  <div class="detail-value">${data.time}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Number of Guests</div>
                  <div class="detail-value">${data.guests} ${data.guests === 1 ? 'guest' : 'guests'}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone</div>
                  <div class="detail-value">${data.phone}</div>
                </div>
              </div>

              <div class="note">
                <strong>Please note:</strong> If you need to cancel or modify your reservation, please call us at (678) 407-8169 at least 2 hours before your scheduled time.
              </div>

              <p>We look forward to serving you!</p>
            </div>
            <div class="footer">
              <p style="margin: 5px 0;"><strong>Illusion Cafe & Sports Lounge</strong></p>
              <p style="margin: 5px 0;">4955 Sugarloaf Pkwy Ste 112, Lawrenceville, GA 30044</p>
              <p style="margin: 5px 0;">Phone: (678) 407-8169</p>
              <p style="margin: 5px 0;">Email: Illusionsportslounge@gmail.com</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(data: ReservationEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Illusion Cafe <onboarding@resend.dev>',
      to: ['Illusionsportslounge@gmail.com'], // Admin email
      subject: 'New Reservation - Illusion Cafe',
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
                border-radius: 0 0 10px 10px;
              }
              .detail-row {
                margin: 10px 0;
                padding: 10px;
                background-color: white;
                border-left: 3px solid #efe7d2;
              }
              .detail-label {
                font-weight: bold;
                color: #0a0b0a;
                display: inline-block;
                width: 150px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">New Reservation Received</h2>
            </div>
            <div class="content">
              <p><strong>A new reservation has been made:</strong></p>
              <div class="detail-row">
                <span class="detail-label">Name:</span> ${data.name}
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span> ${data.email}
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span> ${data.phone}
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span> ${data.time}
              </div>
              <div class="detail-row">
                <span class="detail-label">Guests:</span> ${data.guests}
              </div>
              <p style="margin-top: 20px;">
                <a href="http://localhost:3000/admin-x7k9p2/reservations" style="background-color: #0a0b0a; color: #efe7d2; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Admin Panel</a>
              </p>
            </div>
          </body>
        </html>
      `,
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

export async function sendStatusUpdateEmail(
  data: ReservationEmailData & { status: string; previousStatus?: string }
) {
  const statusMessages = {
    confirmed: {
      subject: 'Reservation Confirmed',
      message: 'Your reservation has been confirmed by our team.',
      color: '#28a745'
    },
    cancelled: {
      subject: 'Reservation Cancelled',
      message: 'Your reservation has been cancelled.',
      color: '#dc3545'
    },
    completed: {
      subject: 'Thank You for Visiting',
      message: 'Thank you for dining with us! We hope to see you again soon.',
      color: '#6c757d'
    }
  };

  const statusInfo = statusMessages[data.status as keyof typeof statusMessages];
  if (!statusInfo) return { success: false, error: 'Invalid status' };

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Illusion Cafe <onboarding@resend.dev>',
      to: [data.email],
      subject: `${statusInfo.subject} - Illusion Cafe`,
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
                background-color: ${statusInfo.color};
                color: white;
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
              .detail-row {
                margin: 10px 0;
                padding: 10px;
                background-color: white;
                border-left: 3px solid #efe7d2;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">${statusInfo.subject}</h1>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              <p>${statusInfo.message}</p>
              <div style="margin: 20px 0;">
                <div class="detail-row">
                  <strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div class="detail-row">
                  <strong>Time:</strong> ${data.time}
                </div>
                <div class="detail-row">
                  <strong>Guests:</strong> ${data.guests}
                </div>
              </div>
              ${data.status !== 'cancelled' ? '<p>If you have any questions, please contact us at (678) 407-8169.</p>' : '<p>If you did not request this cancellation, please contact us immediately at (678) 407-8169.</p>'}
              <p style="margin-top: 30px;">
                <strong>Illusion Cafe & Sports Lounge</strong><br>
                4955 Sugarloaf Pkwy Ste 112, Lawrenceville, GA 30044<br>
                (678) 407-8169
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending status update email:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending status update email:', error);
    return { success: false, error };
  }
}
