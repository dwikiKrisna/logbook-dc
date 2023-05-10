"use client";

import { useRef, useState } from "react"
import { useForm, Controller, set } from "react-hook-form";
import Link from "next/link";
import React from "react";
import SignaturePad from "react-signature-canvas";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { getDate, getTime } from "@/utils/timeFormat";
import Image from "next/image";

//form validation schema  with yup
const formSchema = yup.object().shape({
  jenisServer: yup.string().required(),
  nama: yup.string().required(),
  institusi: yup.string().required(),
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState({});

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


  // api call to backend with axios 
  const onSubmit = async (values) => {
    console.log({ ...values });
    try {
      setLoading(true);
      const res = await axios.post('/api/logbook', {
        ...values
      })
      console.log(res);
      setSuccess(true)
      setResult(res.data.res)

    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
      setLoading(false);
    }
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

  //signature component
  const SignatureBox = ({ name, label }) => {
    let sigCanvas = useRef({});

    const formatIntoPng = () => {
      if (sigCanvas.current) {
        const dataURL = sigCanvas.current.toDataURL();
        return dataURL;
      }
    };


    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <Controller
          name={name}
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
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>

      </div>

    )
  }

  console.log("result", result)

  if (success) {
    return (
      <div className="container shadow-xl max-w-screen-md mx-auto my-5 p-5 bg-slate-100">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-5 text-green-600">
            Berhasil Input Logbook!
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-md">Nama: {result.nama}</p>
            <p className="text-md">Institusi: {result.institusi}</p>
            <p className="text-md">Nomor Identitas: {result.noIdentitas}</p>
            <p className="text-md">Keperluan: {result.keperluan}</p>
            <p className="text-md">Tanggal: {getDate(result.waktuMasuk)}</p>
            <p className="text-md">Waktu Masuk: {getTime(result.waktuMasuk)}</p>
            <p className="text-md">Waktu Keluar: {getTime(result.waktuKeluar)}</p>
            <p className="text-md">Nama Pemberi Izin: {result.namaPemberiIzin}</p>
            <Image alt='paraf pemberi izin' className="bg-white rounded-lg" src={result.parafPemberiIzin} width={200} height={200} />
            <p className="text-md mb-5 ">Nama Pendamping: {result.namaPendamping}</p>
            <Image alt='paraf pedamping' className="bg-white mb-5 rounded-lg" src={result.parafPendamping} width={200} height={200} />

            <div>
              <button className="btn btn-md mr-5" onClick={() => window.print()}>Print</button>
              <button className="btn btn-md" onClick={() => window.location.reload()}>Isi Kembali</button>
            </div>

          </div>
        </div>
      </div>
    )


  }


  return (
    <>
      {loading && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>}
      <div className="container shadow-xl max-w-screen-md mx-auto my-5 p-5 bg-slate-50">
        <Link href="/">
          <button className="btn btn-md mb-5">Kembali</button>
        </Link>
        <h1 className="text-2xl font-bold mb-5">
          Form Logbook Masuk ke Ruang Server
        </h1>
        <form >
          <div className="flex flex-wrap gap-3">


            <div className="form-control">
              <label className="label">
                <span className="label-text">Jenis Ruang Server</span>
              </label>
              <select className="select select-bordered" {...register('jenisServer')} defaultValue="DC" >
                <option value='DC'>DC</option>
                <option value="DRC">DRC</option>
              </select>
              <p className="text-red-500 text-xs italic">{errors.jenisServer?.message}</p>
            </div>

            <TextInput name='nama' label="Nama" type="text" placeholder="Nama" />
            <TextInput name='institusi' label="Institusi" type="text" placeholder="Institusi" />
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
            <SignatureBox name="parafPemberiIzin" label="Paraf Pemberi Izin" control={control} />
            <TextInput name='namaPendamping' label="Nama Pendamping" type="text" placeholder="" />
            <SignatureBox name="parafPendamping" label="Paraf Pendamping" control={control} />

          </div>
          <button className="btn btn-md mt-3" disabled={loading} onClick={handleSubmit(onSubmit)} >{loading ? "Loading..." : "Submit"}</button>
        </form>
      </div>
    </>
  );
};

export default Form;
