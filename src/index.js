import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { extendTheme, CssVarsProvider } from "@mui/joy/styles";

const theme = extendTheme({
  fontFamily: {
    display: "Poppins",
    body: "Poppins",
  },
  colorSchemes: { light: { palette: { primary: "#000000" } } },
  components: {},
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
