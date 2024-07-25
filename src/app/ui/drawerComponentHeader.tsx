"use client";
import DehazeIcon from "@mui/icons-material/Dehaze";
import React from "react";
import { Drawer } from "@mui/material";
import { Button } from "@mui/material";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { Session } from "next-auth";

import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { spStyle } from "./headerListStyle";
import { LoginButton } from "@/app/ui/buttons/loginButton";
import { RegisterButton } from "@/app/ui/buttons/registerButton";
import { LogoutButton } from "@/app/ui/buttons/logoutButton";

export default function DrawerComponentHeader({
  session,
}: {
  session: Session | null;
}) {
  const { open, setOpen } = useToggleDrawer();
  const drawerWidth = 240;
  return (
    <div className="absolute right-2">
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <DehazeIcon style={{ color: "#250D00" }} />
        </Button>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <ul className={` ${spStyle.ul}`}>
          <li className={` ${spStyle.li}`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/"
            >
              トップ
            </Link>
          </li>
          <li className={` ${spStyle.li}`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/hokku"
            >
              発句する
            </Link>
          </li>
          <li className={` ${spStyle.li}`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/tsukeku"
            >
              付句する
            </Link>
          </li>
          <li className={` ${spStyle.li}`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href={`/my-page/${session?.user?.id}`}
            >
              マイページ
            </Link>
          </li>
          <li className={` ${spStyle.li}`}>
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/instruction"
            >
              遊び方
            </Link>
          </li>
          <li className={` ${spStyle.li}`}>
            {session ? (
              <div
                onClick={() => {
                  setOpen(false);
                }}
              >
                <LogoutButton />
              </div>
            ) : (
              <ul className="flex gap-6">
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <LoginButton />
                </li>
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <RegisterButton />
                </li>
              </ul>
            )}
          </li>
        </ul>
      </Drawer>
    </div>
  );
}
