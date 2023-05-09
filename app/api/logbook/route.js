import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const logbooks = await prisma.logbook.findMany({});
  return NextResponse.json({ logbooks });
}
