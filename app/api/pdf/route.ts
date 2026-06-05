import { pdf } from "@react-pdf/renderer";
import { buildResumeDocument } from "@/lib/buildResumeDocument";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const doc = buildResumeDocument(data);

    const instance = pdf(doc);

    const blob = await instance.toBlob();
    const arrayBuffer = await blob.arrayBuffer();

    return new Response(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (err: any) {
    console.error("PDF ERROR:", err);

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
} 
