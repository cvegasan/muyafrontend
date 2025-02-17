import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="https://res.cloudinary.com/dcv4katvi/image/upload/v1738533330/LOGO_wp4aue.png"
            alt="Logo"
            className="logofooter-img"
          />
          <div className="logo-text">
            <span className="brand-name">MUYA</span>
            <span className="brand-tagline">Agricultura Urbana</span>
            <span className="registered">®</span>
          </div>
        </div>

        <div className="footer-info">
          <p>Región de Valparaíso, Chile</p>
          <p>+569 94408276</p>
        </div>

        <div className="footer-social">
          <Link
            to="https://www.instagram.com/muya.cultura"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Instagram className="social-icon" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
