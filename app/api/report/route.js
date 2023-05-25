import { NextResponse } from "next/server";
import { getIsoFormatDateUTC } from "@/utils/timeFormat";
import { db } from "@/utils/db.server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'You are not logged in.' })
  }



  const { searchParams } = new URL(request.url);
  const startdate = searchParams.get("startdate");
  const enddate = searchParams.get("enddate");
  const jenisServer = searchParams.get("jenisServer");

  const res = await db.logbook.findMany({
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
