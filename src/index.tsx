import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@emotion/react";
import { theme } from "./utils/Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
