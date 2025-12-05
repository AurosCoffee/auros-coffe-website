import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@tradepass.mx';

    const { data, error } = await resend.emails.send({
      from: `Auros Coffee <${contactEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Space Mono', 'Courier New', monospace;
                line-height: 1.6;
                color: #000000;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
              }
              .header {
                background-color: #6a1917;
                color: #f5f1ed;
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0 0 10px 0;
                font-size: 32px;
                font-weight: 600;
                letter-spacing: 1px;
              }
              .header p {
                margin: 0;
                font-size: 14px;
                opacity: 0.9;
                text-transform: uppercase;
                letter-spacing: 2px;
              }
              .content {
                padding: 40px 30px;
                background-color: #ffffff;
              }
              .field {
                margin-bottom: 30px;
              }
              .label {
                font-weight: 600;
                color: #6a1917;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin-bottom: 8px;
                display: block;
              }
              .value {
                color: #333333;
                font-size: 15px;
                padding: 12px;
                background-color: #f5f1ed;
                border-left: 3px solid #6a1917;
              }
              .value a {
                color: #6a1917;
                text-decoration: none;
              }
              .value a:hover {
                text-decoration: underline;
              }
              .message-section {
                background-color: #f5f1ed;
                padding: 25px;
                border-left: 4px solid #6a1917;
                margin-top: 10px;
              }
              .message-text {
                color: #333333;
                white-space: pre-wrap;
                word-wrap: break-word;
                line-height: 1.8;
              }
              .footer {
                background-color: #e8e3dc;
                text-align: center;
                padding: 30px;
                color: #666666;
                font-size: 12px;
              }
              .footer p {
                margin: 0 0 5px 0;
              }
              .divider {
                height: 1px;
                background-color: #e8e3dc;
                margin: 20px 0;
              }
              .icon {
                font-size: 24px;
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="icon">☕</div>
                <h1>AUROS COFFEE</h1>
                <p>New Contact Message</p>
              </div>

              <div class="content">
                <div class="field">
                  <span class="label">📧 From</span>
                  <div class="value">
                    <strong>${name}</strong>
                  </div>
                </div>

                <div class="field">
                  <span class="label">✉️ Email Address</span>
                  <div class="value">
                    <a href="mailto:${email}">${email}</a>
                  </div>
                </div>

                <div class="divider"></div>

                <div class="field">
                  <span class="label">💬 Message</span>
                  <div class="message-section">
                    <div class="message-text">${message}</div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <p><strong>Auros Coffee</strong></p>
                <p>This email was sent from your website contact form</p>
                <p style="margin-top: 15px; opacity: 0.7;">Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
