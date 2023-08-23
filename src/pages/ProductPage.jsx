import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { host } from "../utils";
import "./ProductsPage.css"; // Estilos específicos de la página
import { useEffect, useState } from "react";

function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  
  useEffect(() => {
    fetch(`${host}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data.data);
      });
  }, []);


  

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
