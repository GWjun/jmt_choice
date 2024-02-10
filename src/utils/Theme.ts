// Theme.ts

import { createTheme } from "@mui/material/styles";
import "./font.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#64b5f6",
    },
    secondary: {
      main: "#467eac",
    },
    text: {
      primary: "#ffffff",
    },
  },
  // typography: {
  //   fontFamily: "'Dongle', sans-serif",
  // },
});
