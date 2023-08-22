import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./CartPage.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { host } from "../utils";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const { state } = useCart();
  const { cartItems } = state;

  const { dispatch } = useCart();

  useEffect(() => {
    // Realizar la petición a la API para obtener los elementos del carrito
    // Por ejemplo:
    fetch(`${host}/api/cart`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
    ).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "iNIZIALIZE_CART", payload: data });
      }
      // si es 403
      else if (response.status === 403) {
        localStorage.removeItem("token");
        // window.location.href = "/login";
        
      }
    });
  }, []);

  const handlecheckout =async () => {
    const respuesta =await fetch(`${host}/api/sale/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        cartItems: cartItems,
        total: totalAmount,
      }),
    })
    if (respuesta.ok) {
      dispatch({ type: "CLEAR_CART" });
      alert("Compra realizada con exito");
    }
    else if (respuesta.status === 403) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2>Tu Carrito</h2>
        <div className="cart-items">
          {cartItems &&
            cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
        </div>
        <div className="total-amount">
          <button className="checkout-button" onClick={handlecheckout}>
            Realizar Compra
          </button>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      </div>
    </>
  );
}

export default CartPage;
