// /app/api/upload/route.ts
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = "videos";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const projectName = req.nextUrl.searchParams.get("project");
  if (!projectName) {
    return NextResponse.json(
      { error: "Project name missing" },
      { status: 400 }
    );
  }

  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uuid = randomUUID();
  const blobName = `${uuid}.mp4`;

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);

  await prisma.archive.create({
    data: {
      name: projectName!,
      uuid: uuid,
    },
  });

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: file.type },
  });

  return NextResponse.json({ success: true, uuid });
}
