"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default theme;
