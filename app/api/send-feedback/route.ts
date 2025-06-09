// app/api/send-feedback/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { wantsFeatures, suggestion, submittedAt } = body;

  try {
    const response = await resend.emails.send({
      from: "MUNU Feedback <feedback@resend.dev>",
      to: "rydhlnst@gmail.com",
      subject: "📝 Feedback Baru dari MUNU",
      html: `
        <h2>📝 Feedback Baru Masuk</h2>
        <p><strong>Waktu Kirim:</strong> ${submittedAt}</p>
        <p><strong>Fitur yang Diinginkan:</strong></p>
        <ul>
          ${wantsFeatures.map((f: string) => `<li>${f}</li>`).join("")}
        </ul>
        <p><strong>Saran Tambahan:</strong></p>
        <p>${suggestion || "- tidak ada -"}</p>
      `,
    });
    console.log("📬 Email terkirim:", response);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
