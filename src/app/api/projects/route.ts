import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const projects = await prisma.archive.findMany({
    select: {
      uuid: true,
      name: true,
    },
  });

  return NextResponse.json(projects, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
