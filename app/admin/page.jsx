"use client";

import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import React from "react";
import { getDate, getTime } from "../../utils/timeFormat";

const fetcher = (url) => axios.get(url).then((res) => res.data);

// const getLogbooks = async () => {
//   const res = await fetch(process.env.BASE_URL + "/api/logbook", {
//     cache: "no-store",
//   });
//   return res.json();
// };

const Admin = async () => {
  // const logbookData = await getLogbooks();
  // const [logbooks] = await Promise.all([logbookData]);

  const { data, error, isLoading } = useSWR(`/api/logbook`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="container max-w-screen-2xl mx-auto my-5 p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.logbooks.map((logbook, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 border border-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border border-slate-300">
                      {getDate(logbook.waktuMasuk)}
                    </td>
                    <td className="px-6 py-4 border border-slate-300 text-center">
                      {logbook.nama} <div className="divider"></div>{" "}
                      {logbook.institusi} <div className="divider"></div>
                      {logbook.noIdentitas}
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
                      {logbook.namaPemberiIzin}
                      <div className="divider"></div>
                      <Image
                        src={logbook.parafPemberiIzin}
                        width={100}
                        height={100}
                        alt="paraf pemberi izin"
                      />
                    </td>
                    <td className="px-6 py-4 border border-slate-300 text-center">
                      {logbook.namaPendamping} <div className="divider"></div>
                      <Image
                        src={logbook.parafPendamping}
                        width={100}
                        height={100}
                        alt="paraf pendamping"
                      />
                    </td>
                    <td className="px-6 py-4 border border-slate-300">
                      <button className="btn btn-xs btn-error">delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
