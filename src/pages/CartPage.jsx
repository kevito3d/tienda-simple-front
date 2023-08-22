import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./CartPage.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function CartPage() {
  const { state } = useCart();
  const { cartItems } = state;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  // console.log(totalAmount)
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
