import React from "react";
import ReactDOM from "react-dom/client";
import Routes_ from "./components/Route";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <Routes_ />
  </CartProvider>
);
