"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>🔑 Sign Out</button>;
};
