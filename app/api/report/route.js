import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getIsoFormatDateUTC } from "@/utils/timeFormat";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startdate = searchParams.get("startdate");
  const enddate = searchParams.get("enddate");
  const jenisServer = searchParams.get("jenisServer");

  const res = await prisma.logbook.findMany({
    where: {
      janisServer: jenisServer,
      waktuMasuk: {
        gte: getIsoFormatDateUTC(startdate, "00:00:00"),
        lte: getIsoFormatDateUTC(enddate, "23:59:59"),
      },
    },
  });

  return NextResponse.json(res);
}
