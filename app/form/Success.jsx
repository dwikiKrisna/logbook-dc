import { getDate, getTime } from '@/utils/timeFormat'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = ({ result }) => {
    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div className='flex justify-center  items-center gap-5 mb-5'>
                <Image src='/Logo.png' width={50} height={50} alt='logo' />
                <h1 className='text-2xl  font-bold '>Logbook {result.janisServer}</h1>
            </div>
            <div className='flex justify-center'>
                <h1 className='text-2xl font-bold mb-10'>
                    Berhasil Mengisi Form <span className='bg-blue-800 text-white px-1 mx-1 rounded-md'> Check-In </span>  Ruang Server
                </h1>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
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
                    </tr>
                </thead>
                <tbody className='text-black'>

                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                        <td className="px-6 py-4 border border-slate-300">
                            {1}
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                            {getDate(result.waktuMasuk)}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 text-center">
                            <div className="grid grid-cols-1 divide-y">
                                <div>{result.nama} </div>
                                <div>{result.institusi}</div>
                                <div>{result.noIdentitas}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 border border-slate-300">
                            <div>
                                <p>{result.keperluan}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4 border border-slate-300 text-center">
                            {" "}
                            {getTime(result.waktuMasuk)}
                        </td>
                        <td className="px-6 py-4 border border-slate-300 text-center">
                            <div className="grid grid-cols-1 divide-y">
                                {result.namaPemberiIzin}
                                <Image
                                    src={result.parafPemberiIzin}
                                    width={100}
                                    height={100}
                                    alt="paraf pemberi izin"
                                />
                            </div>


                        </td>
                        <td className="px-6 py-4 border border-slate-300 text-center">
                            <div className="grid grid-cols-1 divide-y">
                                {result.namaPendamping}
                                <Image
                                    src={result.parafPendamping}
                                    width={100}
                                    height={100}
                                    alt="paraf pendamping"
                                />
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            {/* button untuk isi ulang form dengan mereload halaman */}
            <div className='flex justify-center mt-5 gap-5'>

                <button onClick={() => {
                    window.location.reload()
                }} className='btn '>Isi Lagi</button>

                <Link href='/'>
                    <button className='btn btn-primary'>Isi Check-Out</button>
                </Link>
            </div>

        </div>
    )
}

export default Success