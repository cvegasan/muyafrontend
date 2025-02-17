import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
    rol_id: 2, // Agregamos rol_id con valor por defecto 2
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Destructuramos incluyendo rol_id
      const { nombre, email, password, password2, rol_id } = formData;

      // Pasamos rol_id al método de registro
      const result = await register(nombre, email, password, password2, rol_id);

      if (result.success) {
        toast.success("Registro existoso");
        navigate("/login");
      } else {
        setError(result.error || "Error en el registro");
      }
    } catch (error) {
      setError("Error al procesar el registro");
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
        <h2 className="login-item">CREA TU CUENTA</h2>
        {error && (
          <div className="error-message text-red-500 mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="input-login"
              disabled={loading}
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirma tu Contraseña"
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
              {loading ? "REGISTRANDO..." : "REGISTRAR"}
              <UserPlus className="button-icon" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
