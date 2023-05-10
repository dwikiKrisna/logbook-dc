'use client';

import React, { useState } from 'react'

import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReportTable from './ReportTable';


//form validation schema  with yup
const formSchema = yup.object().shape({
    jenisServer: yup.string().required(),
    tanggalStart: yup.string().required(),
    tanggalEnd: yup.string().required(),
});



const Report = () => {

    const [formValue, setFormValue] = useState(undefined)

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

    const onSubmit = async (values) => {
        console.log({ ...values });
        setFormValue({ ...values })

    };

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
        <>

            <div className="container max-w-screen-2xl mx-auto my-5 p-5">
                <h1 className="text-2xl font-bold mb-5">Create Report</h1>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Jenis Ruang Server</span>
                                </label>
                                <select className="select select-bordered" {...register('jenisServer')} defaultValue="DC" >
                                    <option value='DC'>DC</option>
                                    <option value="DRC">DRC</option>
                                </select>
                                <p className="text-red-500 text-xs italic">{errors.jenisServer?.message}</p>
                            </div>
                            <TextInput

                                name="tanggalStart"
                                label="Tanggal Start"
                                type="date"
                                placeholder="Tanggal Start"
                            />
                            <TextInput

                                name="tanggalEnd"
                                label="Tanggal End"
                                type="date"
                                placeholder="Tanggal End"
                            />
                            <button className="btn btn-primary mt-5" type="submit">Create Report</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Report