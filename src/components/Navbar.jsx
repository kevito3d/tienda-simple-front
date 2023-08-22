import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const islogged = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleCart = (e) => {
    if (!islogged) {
      e.preventDefault();
      alert("Debes iniciar sesión para accedcer a esta sección");
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    if (islogged) {
      localStorage.removeItem("token");
    }
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/carrito" className="nav-link" onClick={handleCart}>
            Carrito
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/compras"
            className="nav-link"
            onClick={handleCart }
          >
            Mis compras
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" onClick={handleLogout}>
            {islogged ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
