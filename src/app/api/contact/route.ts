import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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

    console.log("[Contact Form Submission]", entry);

    const dataDir = join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    const filePath = join(dataDir, "contact-submissions.json");

    let submissions: unknown[] = [];
    try {
      const { readFile } = await import("fs/promises");
      const existing = await readFile(filePath, "utf-8");
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    submissions.push(entry);
    await writeFile(filePath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
