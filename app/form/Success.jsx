import { getDate, getTime } from "@/utils/timeFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = ({ result }) => {
  return (
    <div className="max-w-screen-xl mx-auto my-10 p-5">
      <div className="flex justify-center  items-center gap-5 mb-5">
        <Image src="/Logo.png" width={50} height={50} alt="logo" />
        <h1 className="text-2xl font-bold ">Logbook {result.janisServer}</h1>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-10">
          Berhasil Mengisi Form{" "}
          <span className="bg-blue-800 text-white px-1 mx-1 rounded-md">
            {" "}
            Check-In{" "}
          </span>{" "}
          Ruang Server
        </h1>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="text-black">
          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              Tanggal
            </td>
            <td className="px-6 py-4 border border-slate-300">
              {getDate(result.waktuMasuk)}
            </td>
          </tr>

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              {" "}
              Nama <br /> Institusi <br /> No.KTP/SIM/ID
            </td>
            <td className="px-6 py-4 border border-slate-300">
              <div className="grid grid-cols-1 divide-y">
                <div>{result.nama} </div>
                <div>{result.institusi}</div>
                <div>{result.noIdentitas}</div>
                <div className="grid grid-cols-1 divide-y">
                  <Image
                    src={result.paraf}
                    width={100}
                    height={100}
                    alt="paraf"
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              Keperluan
            </td>
            <td className="px-6 py-4 border border-slate-300">
              {result.keperluan}
            </td>
          </tr>

          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              Jam masuk
            </td>
            <td className="px-6 py-4 border border-slate-300">
              {getTime(result.waktuMasuk)}
            </td>
          </tr>
          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              Pemberi Izin
            </td>
            <td className="px-6 py-4 border border-slate-300">
              <div className="grid grid-cols-1 divide-y">
                {result.namaPemberiIzin}
                <Image
                  src={result.parafPemberiIzin}
                  width={100}
                  height={100}
                  alt="paraf pemberi izin"
                />
              </div>
            </td>
          </tr>

          <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
            <td className=" bg-blue-100 px-6 py-4 border border-slate-300  font-bold">
              Pemberi Izin
            </td>
            <td className="px-6 py-4 border border-slate-300">
              <div className="grid grid-cols-1 divide-y">
                {result.namaPendamping}
                <Image
                  src={result.parafPendamping}
                  width={100}
                  height={100}
                  alt="paraf pendamping"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* button untuk isi ulang form dengan mereload halaman */}
      <div className="flex justify-center mt-5 gap-5">
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="btn "
        >
          Isi Lagi
        </button>

        <Link href="/checkout">
          <button className="btn btn-primary">Isi Check-Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
