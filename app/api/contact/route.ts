import { NextResponse, type NextRequest } from "next/server";
import { ContactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import { prisma, isDbConfigured } from "@/lib/db";

// Force the route to run on the Node.js runtime so Prisma + Nodemailer work.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const limit = rateLimit(`contact:${ip}`, 5, 5 / 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests — please try again in a minute." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Persist if DB is configured; otherwise we still acknowledge the user.
  let stored = false;
  if (isDbConfigured()) {
    try {
      await prisma.contactMessage.create({
        data: { name: data.name, email: data.email, subject: data.subject, message: data.message },
      });
      stored = true;
    } catch (err) {
      console.error("[contact] DB insert failed:", err);
    }
  } else {
    console.warn("[contact] DATABASE_URL not set — message not persisted.");
  }

  // Optionally notify via email.
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFY_TO) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.NOTIFY_TO,
        subject: `[Portfolio] ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}\n\n(stored in DB: ${stored})`,
      });
    } catch (err) {
      console.error("[contact] SMTP send failed:", err);
    }
  }

  return NextResponse.json({ ok: true, stored });
}
