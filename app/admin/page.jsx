"use client";

import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import React from "react";
import { getDate, getTime } from "../../utils/timeFormat";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Admin = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/logbook?page=${page}&limit=10`,
    fetcher
  );

  if (error) {
    return (
      <div className="container max-w-screen-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>
        <p className="text-md text-red-500">failed to load data</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-screen-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>
        <p className="text-md ">loading...</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(`/api/logbook?id=${id}`, {
        id: id,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container max-w-screen-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
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
                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Jenis Ruang Server
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data.map((logbook, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 border border-slate-300">
                      {logbook.id}
                    </td>
                    <td className="px-6 py-4 border border-slate-300">
                      {getDate(logbook.waktuMasuk)}
                    </td>
                    <td className="px-6 py-4 border border-slate-300 text-center flex">
                      <div className="grid grid-cols-1 divide-y">
                        <div>{logbook.nama} </div>
                        <div>{logbook.institusi}</div>
                        <div>{logbook.noIdentitas}</div>
                      </div>

                      <Image
                        src={logbook.paraf}
                        width={100}
                        height={100}
                        alt="paraf pemberi izin"
                      />
                    </td>
                    <td className="px-6 py-4 border border-slate-300">
                      <div>
                        <p>{logbook.keperluan}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 border border-slate-300 text-center ">
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

                    <td className="px-6 py-4 border border-slate-300">
                      {logbook.janisServer}
                    </td>

                    <td className="px-6 py-4 border border-slate-300">
                      <div className="dropdown  dropdown-end">
                        <label tabIndex={0} className="btn btn-error btn-xs ">
                          Delete
                        </label>
                        <div
                          tabIndex={0}
                          className="dropdown-content menu p-3 bg-slate-100 shadow  rounded-box w-52"
                        >
                          <div>
                            <p className="font-bold">Yakin untuk menghapus? </p>

                            <button
                              className="btn btn-sm mt-5 btn-primary"
                              onClick={() => {
                                handleDelete(logbook.id);
                              }}
                            >
                              Ya, saya yakin
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* pagination  */}
          <div className="flex justify-center items-center my-5">
            <div className="flex justify-center items-center gap-1">
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
                className="btn btn-sm btn-primary "
                disabled={page == 1}
              >
                Prev
              </button>
              <button className="btn btn-sm btn-primary btn-disabled text-black">
                Page : {page}
              </button>
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                className="btn btn-sm btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
