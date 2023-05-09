import Image from "next/image";
import React from "react";

const getLogbooks = async () => {
  const res = await fetch("http://localhost:3000/api/logbook", {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return data;
};

const Admin = async () => {
  const { logbooks } = await getLogbooks();
  return (
    <body>
      <div className="container max-w-screen-2xl mx-auto my-5 p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <div className="mb-12">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">DC / DRC</span>
            </label>
            <select className="select select-bordered" defaultValue="DC">
              <option disabled selected>
                Pilih
              </option>
              <option>DC</option>
              <option>DRC</option>
            </select>
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text">Tanggal</span>
            </label>
            <div className="flex gap-5 items-center">
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-96 max-w-xs"
              />
              <p>s.d.</p>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-96 max-w-xs"
              />
            </div>
          </div>

          <button className="btn btn-md mt-3">Generate report</button>
        </div>
        <div className="divider"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama <br /> Institusi <br /> No.KTP/SIM/ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Keperluan
                </th>
                <th scope="col" className="px-6 py-3">
                  Jam Keluar <br />
                  Jam Masuk
                </th>
                <th scope="col" className="px-6 py-3">
                  Pemberi Izin
                </th>
                <th scope="col" className="px-6 py-3">
                  Pendamping
                </th>
              </tr>
            </thead>
            <tbody>
              {logbooks.map((logbook, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">20-07-2023</td>
                  <td className="px-6 py-4">
                    {logbook.nama} <br /> {logbook.institusi} <br />{" "}
                    {logbook.jenisIdentitas} {logbook.noIdentitas}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p>{logbook.keperluaan}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {logbook.waktuMasuk} {logbook.waktuKeluar}
                  </td>
                  <td className="px-6 py-4">
                    {logbook.namaPemberiIzin}
                    <br />
                    <Image
                      src={logbook.parafPemberiIzin}
                      width={100}
                      height={100}
                      alt='paraf pemberi izin'
                    />
                  </td>
                  <td className="px-6 py-4">
                    {logbook.namaPendamping} <br />
                    <Image
                      src={logbook.parafPendamping}
                      width={100}
                      height={100}
                      alt='paraf pendamping'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
};

export default Admin;
