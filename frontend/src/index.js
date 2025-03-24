import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { initializeFaro } from "./App"
import "./index.css";

initializeFaro();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
