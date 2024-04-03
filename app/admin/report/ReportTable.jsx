import React from "react";
import useSWR from "swr";
import axios from "axios";
import { getDate, getTime } from "@/utils/timeFormat";
import Image from "next/image";
import Report from "./page";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ReportTable = React.forwardRef(({ formValue }, ref) => {
  const { data, error, isLoading } = useSWR(
    `/api/report?startdate=${formValue.tanggalStart}&enddate=${formValue.tanggalEnd}&jenisServer=${formValue.jenisServer}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div ref={ref} className="bg-white p-10 relative">
      <div className="absolute right-10 top-10 border-2 py-2 px-5">
        <p className="text center">Klasifikasi Informasi</p>
        <p className=" text-center font-bold text-green-600">TERBUKA</p>
      </div>
      <h1 className="text-2xl font-bold text-center">Catatan (Logbook)</h1>
      <h1 className="text-2xl font-bold text-center">
        Akses Masuk Ruang Server (
        {formValue.jenisServer === "DC"
          ? "Data Center"
          : "Data Recovery Center"}
        )
      </h1>
      <p className="text-center  mb-5 text-slate-700">
        {formValue.tanggalStart === formValue.tanggalEnd ? (
          <> Tanggal {formValue.tanggalStart} </>
        ) : (
          <>
            {" "}
            Tanggal {formValue.tanggalStart} s.d. {formValue.tanggalEnd}
          </>
        )}
      </p>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-blue-50 ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300 "
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Tanggal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Nama <br /> Institusi <br /> No.KTP/SIM/ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Keperluan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Jam Keluar <br />
              Jam Masuk
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Pemberi Izin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center border border-slate-300"
            >
              Pendamping
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {data.map((logbook, index) => {
            return (
              <tr key={index} className="bg-white border-b ">
                <td className="px-6 py-4 border border-slate-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border border-slate-300">
                  {getDate(logbook.waktuMasuk)}
                </td>

                <td className="px-6 py-4 border-slate-300 text-center">
                  <div className="flex">
                    <div className="grid grid-cols-1 divide-y w-64">
                      <div>{logbook.nama} </div>
                      <div>{logbook.institusi}</div>
                      <div>{logbook.noIdentitas}</div>
                    </div>
                    <Image
                      src={logbook.paraf}
                      width={100}
                      height={100}
                      alt="paraf "
                    />
                  </div>
                </td>

                <td className="px-6 py-4 border border-slate-300">
                  <div>
                    <p>{logbook.keperluan}</p>
                  </div>
                </td>
                <td className="px-6 py-4 border border-slate-300">
                  {" "}
                  {getTime(logbook.waktuMasuk)} s.d.{" "}
                  {getTime(logbook.waktuKeluar)}
                </td>
                <td className="px-6 py-4 border border-slate-300 text-center">
                  <div className="grid grid-cols-1 divide-y">
                    {logbook.namaPemberiIzin}
                    <Image
                      src={logbook.parafPemberiIzin}
                      width={100}
                      height={100}
                      alt="paraf pemberi izin"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 border border-slate-300 text-center">
                  <div className="grid grid-cols-1 divide-y">
                    {logbook.namaPendamping}
                    <Image
                      src={logbook.parafPendamping}
                      width={100}
                      height={100}
                      alt="paraf pendamping"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

ReportTable.displayName = "ReportTable";

export default ReportTable;
