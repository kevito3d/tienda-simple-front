import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./CartPage.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { host } from "../utils";

function CartPage() {
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
          <Link to="/checkout" className="checkout-button">
            Realizar Compra
          </Link>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      </div>
    </>
  );
}

export default CartPage;
