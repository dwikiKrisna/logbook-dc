import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen">
      <div className="flex flex-col flex-1 justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold p-2 mb-2">Catatan Akses Masuk</h1>
          <h1 className="text-4xl font-bold  p-2">
            Ruang Server (Data Center)
          </h1>
        </div>
      </div>
      <div className="bg-green-400 flex flex-col p-5 justify-between">
        <div className="mb-16 bg-white p-5 border-2 border-black">
          <p className="font-bold text-center">Klasifikasi Informasi</p>
          <p className="text-green-500 font-bold text-center">TERBUKA</p>
        </div>
        <div>
          <p className="text-xl font-bold mb-5">Pusat Teknologi Informasi </p>
          <p className="text-xl font-bold">PPATK</p>
        </div>
      </div>
    </main>
  );
}
