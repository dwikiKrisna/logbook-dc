import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/utils/db.server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//pagination logbook with limit and page in query params
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not logged in." });
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
      namaPemberiIzin: body.namaPemberiIzin,
      parafPemberiIzin: body.parafPemberiIzin,
      namaPendamping: body.namaPendamping,
      parafPendamping: body.parafPendamping,
    },
  });

  return NextResponse.json({ res });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "You are not logged in." });
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
