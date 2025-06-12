import { NextResponse } from "next/server";
import { askMunuAction } from "@/lib/actions/askMunu";

// Konfigurasi batasan
const MAX_QUESTION_LENGTH = 1000; // ~4K tokens adalah 16000 karakter, ini aman

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // --- Middleware #1: Cek input kosong ---
    if (!body?.question || typeof body.question !== "string") {
      return NextResponse.json(
        { success: false, result: "Pertanyaan tidak valid atau kosong." },
        { status: 400 }
      );
    }

    // --- Middleware #2: Batasi panjang pertanyaan ---
    if (body.question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { success: false, result: "Pertanyaan terlalu panjang. Maksimal 1000 karakter." },
        { status: 413 }
      );
    }

    // --- Middleware #3: Validasi imageUrl opsional ---
    if (body.imageUrl && typeof body.imageUrl !== "string") {
      return NextResponse.json(
        { success: false, result: "Format URL gambar tidak valid." },
        { status: 400 }
      );
    }

    // --- Eksekusi Aksi Utama ---
    const result = await askMunuAction({
      question: body.question,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("[MUNU_ASSISTANT_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        result: "MUNU Assistant is currently unavailable. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
