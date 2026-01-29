import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending here
    // Options:
    // 1. Resend (https://resend.com) - recommended
    // 2. SendGrid
    // 3. Nodemailer with SMTP
    // 4. Formspree (client-side alternative)

    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Scrap Society <noreply@scrapsociety.nl>',
    //   to: 'hello@scrapsociety.nl',
    //   subject: `[${subject}] New message from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    // });

    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
