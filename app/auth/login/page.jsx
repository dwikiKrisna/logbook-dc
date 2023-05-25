'use client'

import { redirect } from 'next/navigation';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react"

export default function Login() {
    const { data: session, status } = useSession()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        signIn("credentials", { username, password });
    };


    if (status === "authenticated") {
        redirect('/admin');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 max-w-sm mx-auto p-5 shadow-xl shadow-blue-100 rounded-xl bg-white my-auto">

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Masuk ke Admin Dashboard
                    </h1>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Enter your details below.
                    </p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="input w-full  bg-slate-100"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="input w-full  bg-slate-100"
                    />

                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    );
}
