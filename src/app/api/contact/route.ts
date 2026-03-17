import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const entry = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Log to server console (visible in Vercel logs)
    console.log("[Contact Submission]", JSON.stringify(entry));

    // If CONTACT_EMAIL env var is set, use Web3Forms (free, no signup needed for basic)
    // Otherwise, just log. In production, set up Resend/SendGrid/Web3Forms.
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio Contact: ${name.trim()}`,
          from_name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        throw new Error(`Web3Forms responded with ${res.status}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact Error]", err);
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
