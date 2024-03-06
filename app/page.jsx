import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen">
      <div className="flex flex-col flex-1 justify-center items-center">
        <div>
          <h1 className=" text-3xl font-bold mb-2 ">
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              Catatan Akses Masuk
            </mark>
          </h1>
          <h1 className="text-4xl font-bold mb-5">
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              Ruang Server (Data Center)
            </mark>
          </h1>

          <Link href="/form">
            <button className="btn btn-md mr-5">Check-In</button>
          </Link>
          <Link href="/checkout">
            <button className="btn btn-md btn-outline ">Check-Out</button>
          </Link>
        </div>
      </div>

      <div className="bg-green-600 flex flex-col p-5 justify-between">
        <div>
          <div className="mb-5 bg-white p-5 border-2 border-black">
            <p className="font-bold text-center">Klasifikasi Informasi</p>
            <p className="text-green-500 font-bold text-center">TERBUKA</p>
          </div>
          <Image
            className="mx-auto"
            src="/Logo.png"
            width={150}
            height={150}
            alt="PPATK Logo"
          />
        </div>

        <div>
          <p className="text-xl font-bold text-white text-center">
            Pusat Teknologi Informasi{" "}
          </p>
          <p className="text-xl font-bold text-white text-center">PPATK</p>
        </div>
      </div>
    </main>
  );
}
