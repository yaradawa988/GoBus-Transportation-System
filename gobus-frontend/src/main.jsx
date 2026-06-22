import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import AuthProvider from "./contexts/AuthContext";

import "./index.css";
import "./i18n";
createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

    </AuthProvider>

  </StrictMode>
);

window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");

  setTimeout(() => {
    loader.classList.add("preloader-hide");

    setTimeout(() => {
      loader.remove();
    }, 800);
  }, 1200);
});