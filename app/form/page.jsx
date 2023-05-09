"use client";

import { useRef } from "react"
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import React from "react";
import SignaturePad from "react-signature-canvas";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//form validation schema  with yup
const formSchema = yup.object().shape({
  nama: yup.string().required(),
  institusi: yup.string().required(),
  jenisIdentitas: yup.string().required(),
  nomorIdentitas: yup.string().required(),
  keperluan: yup.string().required(),
  tanggal: yup.string().required(),
  waktuMasuk: yup.string().required(),

  waktuKeluar: yup.string().required(),
  namaPemberiIzin: yup.string().required(),
  parafPemberiIzin: yup.string().required()
    .matches(/^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Signature must be png"
    ),
  namaPendamping: yup.string().required(),
  parafPendamping: yup.string().required()
    .matches(/^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Signature must be png"
    ),
});


const Form = () => {
  let sigCanvas = useRef({});



  //form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors } = {},
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (values) => {
    console.log({ ...values });
  };

  //signature canvas
  const formatIntoPng = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL();
      return dataURL;
    }
  };

  //text input component
  const TextInput = ({ name, label, type, placeholder }) => {
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          {...register(name)}
          name={name}
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
        />
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
      </div>
    );
  };


  return (
    <body>
      <div className="container  bg-white shadow-xl max-w-screen-md mx-auto my-5 p-5 bg-slate-50">
        <Link href="/">
          <button className="btn btn-md mb-5">Kembali</button>
        </Link>
        <h1 className="text-2xl font-bold mb-5">
          Form Logbook Masuk ke Ruang Server
        </h1>
        <form >
          <div className="flex flex-wrap gap-3">
            <TextInput name='nama' label="Nama" type="text" placeholder="Nama" />
            <TextInput name='institusi' label="Institusi" type="text" placeholder="Institusi" />
            <TextInput
              name='jenisIdentitas'
              label="Jenis Identitas"
              type="text"
              placeholder="NIK/NIP"

            />
            <TextInput name='nomorIdentitas' label="Nomor Identitas" type="text" placeholder="" />
            <div className="form-control w-full max-w-xs ">
              <label className="label">
                <span className="label-text">Keperluan</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 "
                placeholder="Tulis keperluan anda masuk ke ruang server"
                {...register('keperluan')}
              />
              <p className="text-red-500 text-xs italic">{errors.keperluan?.message}</p>
            </div>
            <TextInput name='tanggal' label="Tanggal" type="date" placeholder="" />
            <TextInput name='waktuMasuk' label="Waktu Masuk" type="time" placeholder="" />
            <TextInput name='waktuKeluar' label="Waktu Keluar" type="time" placeholder="" />
            <TextInput name="namaPemberiIzin" label="Nama Pemberi Izin" type="text" placeholder="" />

            <div className="form-control">
              <label className="label">
                <span className="label-text">Paraf Pemberi Izin</span>
              </label>
              <Controller
                name="parafPemberiIzin"
                control={control}
                render={({ field }) => (
                  <SignaturePad
                    ref={sigCanvas}
                    onEnd={() => field.onChange(formatIntoPng())}
                    penColor="black"
                    canvasProps={{ className: "w-full h-32 border rounded-lg bg-white" }}
                  />
                )}
              />
              <p className="text-red-500 text-xs italic">{errors.parafPemberiIzin?.message}</p>
            </div>


            <TextInput name='namaPendamping' label="Nama Pendamping" type="text" placeholder="" />


            <div className="form-control">
              <label className="label">
                <span className="label-text">Paraf Pendamping</span>
              </label>
              <Controller
                name="parafPendamping"
                control={control}
                render={({ field }) => (
                  <SignaturePad
                    ref={sigCanvas}
                    onEnd={() => field.onChange(formatIntoPng())}
                    penColor="black"
                    canvasProps={{ className: "w-full h-32 border rounded-lg bg-white" }}
                  />
                )}
              />
              <p className="text-red-500 text-xs italic">{errors.parafPendamping?.message}</p>

            </div>


          </div>
          <button className="btn btn-md mt-3" onClick={handleSubmit(onSubmit)} >Submit</button>
        </form>
      </div>
    </body>
  );
};

export default Form;
