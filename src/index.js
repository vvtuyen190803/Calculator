import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Calculator from "./Component/Calculator/calculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
