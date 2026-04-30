import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send Welcome Email
    const { data, error } = await resend.emails.send({
      from: "Xeloria <onboarding@resend.dev>", // Or your verified domain
      to: [email],
      subject: "Welcome to Xeloria - Build your career with us!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px; border-radius: 20px;">
          <h1 style="color: #4f46e5; text-align: center; font-size: 32px; font-weight: 900;">Xeloria</h1>
          <p style="font-size: 18px; color: #374151; text-align: center;">Welcome to the future of professional branding!</p>
          <div style="background: white; padding: 30px; border-radius: 15px; margin-top: 30px;">
            <p style="color: #4b5563; line-height: 1.6;">Hi there,</p>
            <p style="color: #4b5563; line-height: 1.6;">We're thrilled to have you join our community. With Xeloria, you can:</p>
            <ul style="color: #4b5563; line-height: 1.6;">
              <li>Create ATS-optimized resumes in minutes.</li>
              <li>Launch a professional portfolio with custom themes.</li>
              <li>Read expert career advice on our blog.</li>
            </ul>
            <a href="https://xeloria.vercel.app/dashboard" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">Get Started Now</a>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 40px;">&copy; 2024 Xeloria. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      if (error.message.includes("testing emails")) {
        return NextResponse.json({ 
          error: "Subscription is in sandbox mode. Please verify your domain in Resend or use your registered email." 
        }, { status: 400 });
      }
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
