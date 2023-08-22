import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductPage";
import Navbar from "./Navbar";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";

export default function Routes_() {
  const storage = localStorage.getItem("token");
  console.log(storage);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            // userInfo.user.user_id === "" ?
            storage ? <Navigate to="/" /> : <LoginPage />
          }
        />
        <Route
          path="registrarse"
          element={
             <RegisterPage />
          }
        />

        <Route
          path="/"
          element={
            // userInfo.user.user_id !== "" ? (
            <ProductsPage />
            // ) : (
            // <Navigate to="/login" />
            // )
          }
        />
        <Route path="carrito" element={<CartPage />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />


      </Routes>
    </BrowserRouter>
  );
}
