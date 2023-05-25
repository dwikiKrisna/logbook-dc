import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LogoutButton } from "@/components/Buttons";

export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions);
    console.log("tes", session);
    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-lg mb-5">Anda belum memiliki akses, login terlebih dahulu!</h1>
                    <Link className="btn btn-primary" href="/auth/login">Login</Link>
                </div>
            </div>
        );
    }

    return <>
        <div className="flex">
            <div className="max-w-sm px-5 min-h-screen shadow-xl">
                <Link href="/">
                    <div className="flex gap-2 items-center m-3">

                        <Image src="/Logo.png" width={50} height={50} alt="logo" />
                        <h1 className="text-lg font-bold ">Logbook DC/DRC</h1>
                    </div>
                </Link>
                <ul className="menu bg-base-100 w-56">
                    <li>
                        <Link href="/admin">
                            🏠 Home
                        </Link>
                    </li>

                    <li>  <Link href="/admin/report">📄 Report </Link></li>

                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </div>

            <div className="bg-slate-100 flex-1">
                {children}

            </div>
        </div>

    </>;
}