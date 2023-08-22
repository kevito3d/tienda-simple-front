import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const islogged = localStorage.getItem("token");
  const handleCart = (e) => {
    if (!islogged) {
      e.preventDefault();
      alert("Debes iniciar sesión para ver el carrito");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
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
          <Link to="/login" className="nav-link" 
            onClick={islogged ? handleLogout : null}
          >
            {islogged ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
