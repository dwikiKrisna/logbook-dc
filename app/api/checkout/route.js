import { db } from "@/utils/db.server";
import { NextResponse } from "next/server";

// get all logbook with status masuk (not checkout)
export async function GET(request) {
  const res = await db.logbook.findMany({
    where: {
      status: "masuk",
    },
    select: {
      id: true,
      nama: true,
      institusi: true,
      keperluan: true,
      waktuMasuk: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(res);
}

// checkout logbook with id
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  const res = await db.logbook.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: "keluar",
      waktuKeluar: new Date(),
      keterangan: body.keterangan,
    },
  });

  return NextResponse.json({ res });
}
