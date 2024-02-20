import React from "react";
import { createRoot } from "react-dom/client";
import App from "./layout/_index";
import "./style.scss";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
