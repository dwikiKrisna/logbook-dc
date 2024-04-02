"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SignaturePad from "react-signature-canvas";
import * as yup from "yup";
import Success from "./Success";

//form validation schema  with yup
const formSchema = yup.object().shape({
  jenisServer: yup.string().required("Jenis server harus diisi"),
  nama: yup.string().required("Nama harus diisi"),
  paraf: yup
    .string()
    .required("Paraf pemberi izin harus diisi")
    .matches(
      /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Signature must be png"
    ),
  institusi: yup.string().required("Institusi harus diisi"),
  nomorIdentitas: yup.string().required("Nomor identitas harus diisi"),
  keperluan: yup.string().required("Keperluan harus diisi"),
  namaPemberiIzin: yup.string().required("Nama pemberi izin harus diisi"),
  parafPemberiIzin: yup
    .string()
    .required("Paraf pemberi izin harus diisi")
    .matches(
      /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Signature must be png"
    ),
  namaPendamping: yup.string().required("Nama pendamping harus diisi"),
  parafPendamping: yup
    .string()
    .required("Paraf pendamping harus diisi")
    .matches(
      /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Signature must be png"
    ),
});

const Form = () => {
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
    console.log(values);
    console.log("oke");
    try {
      setLoading(true);
      const res = await axios.post("/api/logbook", {
        ...values,
      });
      // console.log(res);
      setSuccess(true);
      setResult(res.data.res);
    } catch (error) {
      console.log(error);
    } finally {
      // console.log('done');
      setLoading(false);
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
        <p className="mt-2 text-red-500 text-xs ">{errors[name]?.message}</p>
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

    const clear = (event) => {
      event.preventDefault();
      sigCanvas.current?.clear();
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
              canvasProps={{
                className: "max-w-xs border rounded-lg bg-white",
              }}
            />
          )}
        />
        <p className="text-red-500 text-xs ">{errors[name]?.message}</p>
        <div>
          <button className="btn btn-xs mt-2" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    );
  };

  if (success) {
    return (
      <>
        <Success result={result} />
      </>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center items-center">
          <progress className="progress w-32  progress-primary"></progress>
        </div>
      )}

      <div className="bg-slate-100 min-h-screen">
        <div className="container max-w-screen-md mx-auto p-5">
          <Link href="/">
            <button className="btn btn-md btn-ghost mb-5 "> 🏠 Kembali</button>
          </Link>

          <div className="bg-white p-5 rounded-xl shadow-md shadow-blue-100">
            <h1 className="text-2xl font-bold mb-5">
              Form Logbook Masuk ke Ruang Server
            </h1>
            <form>
              <div className="gap-2 flex-col flex">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Jenis Ruang Server</span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("jenisServer")}
                    defaultValue="DC"
                  >
                    <option value="DC">DC / Data Center</option>
                    <option value="DRC">DRC / Data Recovery Center</option>
                  </select>
                  <p className="mt-2 text-red-500 text-xs ">
                    {errors.jenisServer?.message}
                  </p>
                </div>

                <TextInput
                  name="nama"
                  label="Nama Pengunjung"
                  type="text"
                  placeholder="Nama"
                />
                <SignatureBox
                  name="paraf"
                  label="Paraf Pengunjung"
                  control={control}
                />
                <TextInput
                  name="institusi"
                  label="Institusi"
                  type="text"
                  placeholder="Institusi"
                />
                <TextInput
                  name="nomorIdentitas"
                  label="Nomor Identitas"
                  type="text"
                  placeholder=""
                />

                <div className="form-control w-full  ">
                  <label className="label">
                    <span className="label-text">Keperluan</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 "
                    placeholder="Tulis keperluan anda masuk ke ruang server"
                    {...register("keperluan")}
                  />
                  <p className="mt-2 text-red-500 text-xs ">
                    {errors.keperluan?.message}
                  </p>
                </div>

                <TextInput
                  name="namaPemberiIzin"
                  label="Nama Pemberi Izin"
                  type="text"
                  placeholder=""
                />
                <SignatureBox
                  name="parafPemberiIzin"
                  label="Paraf Pemberi Izin"
                  control={control}
                />
                <TextInput
                  name="namaPendamping"
                  label="Nama Pendamping"
                  type="text"
                  placeholder=""
                />
                <SignatureBox
                  name="parafPendamping"
                  label="Paraf Pendamping"
                  control={control}
                />
              </div>
              <button
                className="btn btn-md mt-3 btn-primary"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
