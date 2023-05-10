import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
    children,
}) {
    return <>
        <div className="flex">
            <div className="max-w-sm px-5 min-h-screen shadow-xl">
                <div className="flex gap-2 items-center m-3">

                    <Image src="/Logo.png" width={50} height={50} alt="logo" />
                    <h1 className="text-lg font-bold ">Logbook DC/DRC</h1>
                </div>
                <ul className="menu bg-base-100 w-56">
                    <li>
                        <Link href="/admin">
                            🏠 Home
                        </Link>
                    </li>

                    <li>  <Link href="/admin/report">📄 Report </Link></li>

                    <li><a>🔐 Log Out</a></li>
                </ul>
            </div>

            <div className="bg-slate-100 flex-1">
                {children}
            </div>
        </div>

    </>;
}