// /app/api/get-video/route.ts
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

const accountName = process.env.AZURE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_ACCOUNT_KEY!;
const containerName = "videos";

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  if (!uuid)
    return NextResponse.json({ error: "UUID missing" }, { status: 400 });

  const blobName = `${uuid}.mp4`;
  const credential = new StorageSharedKeyCredential(accountName, accountKey);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      expiresOn: new Date(Date.now() + 5 * 60 * 1000),
      permissions: BlobSASPermissions.parse("r"),
      protocol: SASProtocol.Https,
    },
    credential
  ).toString();

  const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
  return NextResponse.json({ url });
}
