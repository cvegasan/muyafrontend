import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta según tu estructura
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <nav className={`navbar ${isHome ? "navbar-transparent" : "navbar-solid"}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img
            src="https://res.cloudinary.com/dcv4katvi/image/upload/v1738533330/LOGO_wp4aue.png"
            alt="Logo"
            className="logo-img"
          />
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/productos">Productos</Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
          {isAuthenticated() ? (
            <Link to="/" onClick={handleLogout} className="login-link">
              Cerrar Sesión
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              Ingresa
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
