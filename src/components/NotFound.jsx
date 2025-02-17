import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Página no encontrada</h1>
        <Link to="/" className="about-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
