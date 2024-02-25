import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>,
);
