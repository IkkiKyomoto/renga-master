"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Session } from "next-auth";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function SomethingProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <div>
      <AppRouterCacheProvider>
        <SessionProvider session={session}>
          <div>
            <ToastContainer position="top-left" />

            {children}
          </div>
        </SessionProvider>
      </AppRouterCacheProvider>
    </div>
  );
}
