import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { useCart } from "../context/CartContext";
import { host } from "../utils";
import "./ProductsPage.css"; // Estilos específicos de la página
import { useEffect, useState } from "react";

function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const { dispatch } = useCart();
  useEffect(() => {
    fetch(`${host}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setProductsData(data.data);
      });
  }, []);


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
        console.log({data});
        dispatch({ type: "iNIZIALIZE_CART", payload: data });
      }
      // si es 403
      else if (response.status === 403) {
        localStorage.removeItem("token");
        // window.location.href = "/login";
        
      }
    });
  }, [productsData]);

  return (
    <>
      <Navbar />
      <div className="product-grid">
        {productsData.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
