import { google } from 'googleapis';

// Create OAuth2 client
const createOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return oauth2Client;
};

// Build raw RFC 2822 email and encode to base64url
const buildRawEmail = (to, subject, htmlBody) => {
  const emailLines = [
    `From: Rathivarman <${process.env.GMAIL_USER}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    htmlBody,
  ];

  const email = emailLines.join('\r\n');

  return Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Send email using Gmail API directly (no nodemailer)
export const sendEmailViaGmail = async (to, subject, htmlBody) => {
  try {
    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_CLIENT_ID ||
      !process.env.GMAIL_CLIENT_SECRET ||
      !process.env.GMAIL_REFRESH_TOKEN
    ) {
      throw new Error('Gmail OAuth2 credentials not properly configured');
    }

    const auth = createOAuth2Client();
    const gmail = google.gmail({ version: 'v1', auth });

    const rawEmail = buildRawEmail(to, subject, htmlBody);

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawEmail,
      },
    });

    console.log('✅ Email sent! Message ID:', result.data.id);
    return { success: true, messageId: result.data.id };

  } catch (error) {
    console.error('❌ Gmail API Error:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Email body for contact form notification (to you)
export const createContactEmailBody = (senderName, senderEmail, senderMessage) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>From:</strong> ${senderName}</p>
            <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${senderMessage.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #666;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Confirmation email body (to the sender)
export const createConfirmationEmailBody = (userName) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
          <p>Hi ${userName},</p>
          <p>I've received your message and appreciate you taking the time to get in touch. I'll review your message carefully and get back to you as soon as possible, typically within 24 hours.</p>
          <div style="margin: 30px 0; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #3498db;">
            <p style="margin: 0;"><strong>What's next?</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>I'll review your message</li>
              <li>I'll respond within 24 hours</li>
              <li>We can discuss your project in detail</li>
            </ul>
          </div>
          <p>Best regards,<br><strong>Rathivarman</strong></p>
          <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #666;">
            <p>© 2026 Rathivarman Portfolio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};