"use client";

import { useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Inicio existoso");
        navigate("/productos");
      } else {
        setError(result.error || "Error en la autenticación");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="login">
      <div className="login-container">
        <h2 className="login-item">BIENVENIDO</h2>
        {error && (
          <div className="error-message text-red-500 mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="input-login"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="input-login"
              disabled={loading}
            />
          </div>
          <div className="login-button">
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "INICIANDO..." : "INICIAR SESIÓN"}
              <ArrowRight className="button-icon" />
            </button>
            <Link to="/register" className="register-button">
              Registrarse
              <UserPlus className="button-icon" />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
