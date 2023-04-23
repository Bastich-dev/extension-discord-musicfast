import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import "./style.scss";

const root = createRoot(document.getElementById("root"));
root.render(
    <App>
        <Header />
        <Form />
        <Footer />
    </App>
);
