"use client";

import React from "react";

import useSWR from "swr";
import axios from "axios";
import { getDate, getTime } from "@/utils/timeFormat";
import FormCheckout from "./FormCheckout";
import Link from "next/link";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Checkout = () => {
  const { data, error, isLoading } = useSWR(`/api/checkout`, fetcher);

  if (error) {
    return (
      <div className="container max-w-screen-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-10">Check-Out</h1>
        <p className="text-md text-red-500">failed to load data</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-screen-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-10">Check-Out</h1>
        <p className="text-md ">loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container max-w-screen-2xl mx-auto p-5">
        <Link href="/">
          <button className="btn btn-md btn-ghost mb-5 "> 🏠 Kembali</button>
        </Link>
        <h1 className="text-2xl font-bold mb-10">Daftar Belum Check-Out</h1>

        <div className="">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50 ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Nama
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Institusi
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
                  Tanggal Masuk
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center border border-slate-300"
                >
                  Jam Masuk
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
                    <td className="px-6 py-4 border border-slate-300 text-center">
                      <div className="grid grid-cols-1 divide-y">
                        <div>{logbook.nama} </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 border border-slate-300 text-center">
                      <div className="grid grid-cols-1 divide-y">
                        <div>{logbook.institusi}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border border-slate-300">
                      <div>
                        <p>{logbook.keperluan}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 border border-slate-300 text-center ">
                      {getDate(logbook.waktuMasuk)}
                    </td>

                    <td className="px-6 py-4 border border-slate-300 text-center ">
                      {getTime(logbook.waktuMasuk)}
                    </td>

                    <td className="px-6 py-4 border border-slate-300 items-center">
                      {/* The button to open modal */}
                      <label
                        htmlFor={`modal-${logbook.id}`}
                        className="btn btn-xs rounded-full"
                      >
                        check-out
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`modal-${logbook.id}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box relative">
                          <label
                            htmlFor={`modal-${logbook.id}`}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <h3 className="font-bold text-lg mb-5">
                            Check out a.n. {logbook.nama}
                          </h3>

                          <FormCheckout id={logbook.id} />
                        </div>
                      </div>
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

export default Checkout;
