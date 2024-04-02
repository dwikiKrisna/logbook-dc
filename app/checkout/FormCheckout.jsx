"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = yup.object().shape({
  keterangan: yup.string().required("Keterangan harus diisi"),
});

const FormCheckout = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors } = {},
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (values) => {
    console.log("oke");
    try {
      setLoading(true);
      const res = await axios.post(`/api/checkout?id=${id}`, {
        ...values,
      });
      console.log(res);
      setSuccess(true);
      setResult(res.data.res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  if (success) {
    return (
      <>
        <div className="">
          <p className="font-bold">Keterangan:</p>
          <p className="">{result.keterangan}</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <form>
        <div className="form-control w-full max-w-md ">
          <textarea
            className="textarea textarea-bordered h-24 "
            placeholder="Tulis keterangan anda keluar dari ruang server"
            {...register("keterangan")}
          />
          <p className="mt-2 text-red-500 text-xs ">
            {errors.keterangan?.message}
          </p>
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
  );
};

export default FormCheckout;
