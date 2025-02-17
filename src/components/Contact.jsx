"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar el formulario
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-image">
          <img
            src="https://res.cloudinary.com/dcv4katvi/image/upload/v1738533329/planta_contacto_pgxh7o.jpg"
            alt="Hand holding green plant stems"
            className="contact-photo"
          />
        </div>
        <div className="contact-content">
          <h2>Contáctanos</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
                className="form-input"
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
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Mensaje"
                required
                className="form-input form-textarea"
              />
            </div>
            <button type="submit" className="submit-button">
              ENVIAR
              <ArrowRight className="button-icon" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
