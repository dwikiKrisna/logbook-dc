"use client";

import Link from "next/link";
import React from "react";
import SignatureCanvas from "react-signature-canvas";

const Form = () => {
  //text input component
  const TextInput = ({ label, type, placeholder }) => {
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    );
  };

  return (
    <body>
      <div className="container max-w-screen-md mx-auto my-5 p-5">
        <Link href="/">
          <button className="btn btn-md mb-12">Kembali</button>
        </Link>
        <h1 className="text-2xl font-bold mb-5">
          Form Logbook Masuk ke Ruang Server
        </h1>
        <form className="flex flex-wrap gap-3">
          <TextInput label="Nama" type="text" placeholder="Nama" />
          <TextInput label="Institusi" type="text" placeholder="Institusi" />
          <TextInput
            label="Jenis Identitas"
            type="text"
            placeholder="NIK/NIP"
          />
          <TextInput label="Nomor Identitas" type="text" placeholder="" />
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Keperluan</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Tulis keperluan anda masuk ke ruang server"
            ></textarea>
          </div>
          <TextInput label="Tanggal" type="date" placeholder="" />
          <TextInput label="Waktu Masuk" type="time" placeholder="" />
          <TextInput label="Waktu Keluar" type="time" placeholder="" />
          <TextInput label="Nama Pemberi Izin" type="text" placeholder="" />

          <div className="form-control">
            <label className="label">
              <span className="label-text">Paraf Pemberi Izin</span>
            </label>
            <SignatureCanvas
              penColor="black"
              canvasProps={{ className: "w-full h-32 border rounded-lg" }}
            />
          </div>

          <TextInput label="Nama Pendamping" type="text" placeholder="" />

          <div className="form-control">
            <label className="label">
              <span className="label-text">Paraf Pendamping</span>
            </label>
            <SignatureCanvas
              penColor="black"
              canvasProps={{ className: "w-full h-32 border rounded-lg" }}
            />
          </div>
        </form>
      </div>
    </body>
  );
};

export default Form;
