import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "Missing uuid" }, { status: 400 });
  }

  const VIDEO_URL = process.env.VIDEO_URL;
  const path = `${VIDEO_URL}/${uuid}`; // or any other path logic
  console.log("Path:", path);

  try {
    const qrDataUrl = await QRCode.toDataURL(path);

    return new NextResponse(Buffer.from(qrDataUrl.split(",")[1], "base64"), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="qr.png"',
      },
    });
  } catch (error) {
    console.error("QR generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate QR" },
      { status: 500 }
    );
  }
}
