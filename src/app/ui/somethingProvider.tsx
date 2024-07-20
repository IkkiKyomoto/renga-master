"use client";

import React from "react";
import Header from "@/app/ui/header";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Session } from "next-auth";

export default function SomethingProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <div>
      <SessionProvider session={session}>
        <div>
          <ToastContainer />

          {children}
        </div>
      </SessionProvider>
    </div>
  );
}
