import { getIsoFormatDateUTC } from "@/utils/timeFormat";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const logbooks = await prisma.logbook.findMany({});
  return NextResponse.json({ logbooks });
}

export async function POST(request) {
  const body = await request.json();

  const res = await prisma.logbook.create({
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
    }
  });


  return NextResponse.json({ res });
}