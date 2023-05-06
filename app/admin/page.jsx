import React from "react";

const Admin = () => {
  return (
    <body>
      <div className="container max-w-screen-2xl mx-auto my-5 p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <div className="mb-12">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">DC / DRC</span>
            </label>
            <select className="select select-bordered">
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
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>
                  Nama <br /> Institusi <br /> No.KTP/SIM/ID
                </th>
                <th>Keperluan</th>
                <th>
                  Jam Keluar <br />
                  Jam Masuk
                </th>
                <th>Pemberi Izin</th>
                <th>Pendamping</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </body>
  );
};

export default Admin;
