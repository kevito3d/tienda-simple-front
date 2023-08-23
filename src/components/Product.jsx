import React from "react";
import "./Product.css"; // Estilos específicos del componente
import { host } from "../utils";
import { useCart } from "../context/CartContext";

function Product({ product }) {
  const islogged = localStorage.getItem("token");
  const { state, dispatch } = useCart();


  const handleAddToCart = (e) => {
    // Aquí podrías implementar la lógica para agregar el producto al carrito
    if (!islogged) {
      e.preventDefault();
      alert("Debes iniciar sesión para agregar al carrito");
    }
    fetch(`${host}/api/cart`, {
      method: state.cartItems.find((item) => item.product.id === product.id) 
        ? "PUT"
        : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity:
          // si ya existe el producto en el carrito, aumenta la cantidad
          state.cartItems.find((item) => item.product.id === product.id)
            ? state.cartItems.find((item) => item.product.id === product.id)
                .quantity + 1
            : 1,
      }),
    }).then(async (response) => {
      if (response.ok) {
        // const data = await response.json();
        dispatch({ type: "ADD_TO_CART", payload: { quantity: 1, product } });
      }
    });
  };

  return (
    <div className="product-item">
      <img
        className="product-image"
        src={`${host}${product.url_image}`}
        alt={product.name}
      />
      <div className="product-overlay">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default Product;
