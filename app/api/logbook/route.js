import { db } from "@/utils/db.server";
import { getIsoFormatDateUTC } from "@/utils/timeFormat";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//pagination logbook with limit and page in query params
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'You are not logged in.' })
  }


  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const logbooks = await db.logbook.findMany({
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(logbooks);
}




export async function POST(request) {
  const body = await request.json();

  const res = await db.logbook.create({
    data: {
      janisServer: body.jenisServer,
      nama: body.nama,
      institusi: body.institusi,
      noIdentitas: body.nomorIdentitas,
      keperluan: body.keperluan,
      waktuMasuk: getIsoFormatDateUTC(body.tanggal, body.waktuMasuk),
      waktuKeluar: getIsoFormatDateUTC(body.tanggal, body.waktuKeluar),
      namaPemberiIzin: body.namaPemberiIzin,
      parafPemberiIzin: body.parafPemberiIzin,
      namaPendamping: body.namaPendamping,
      parafPendamping: body.parafPendamping,
    },
  });

  return NextResponse.json({ res });
}

//delete logbook by id in params

export async function DELETE(request) {

  if (!session) {
    return NextResponse.json({ message: 'You are not logged in.' })
  }


  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const res = await db.logbook.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ res });
}
