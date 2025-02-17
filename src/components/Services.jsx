import { useState } from "react";
import { ChevronUp, ChevronDown, Leaf } from "lucide-react";

export function Services() {
  const [expandedId, setExpandedId] = useState(null);

  const services = [
    {
      id: 1,
      title: "Diseño de Paisajismo",
      description:
        "Diseñamos y creamos espacios verdes sostenibles, adaptados a su entorno y necesidades. Seleccionamos especies nativas y aplicamos estrategias de bajo mantenimiento para optimizar los recursos y fomentar la biodiversidad en cada proyecto.",
    },
    {
      id: 2,
      title: "Instalación de Riego Automatizado",
      description:
        "Implementamos sistemas de riego automatizado que reducen el consumo de agua y garantizan una hidratación eficiente. Adaptamos cada instalación según el tipo de suelo, vegetación y clima para optimizar su rendimiento y minimizar desperdicios",
    },
    {
      id: 3,
      title: "Mantención de Áreas Verdes",
      description:
        "Preservamos la salud y estética de jardines con podas, fertilización y control ecológico de plagas. Optimizamos su desarrollo con monitoreo continuo, ajustes en el riego y prácticas de conservación que prolongan su vida útil.",
    },
    {
      id: 4,
      title: "Diseño y Ejecución de Muros Verdes",
      description:
        "Transformamos muros en jardines verticales que mejoran la calidad del aire y la eficiencia térmica. Utilizamos especies resistentes, sistemas de riego automatizado y estructuras de bajo mantenimiento para maximizar su impacto.",
    },
    {
      id: 5,
      title: "Reactivación de Áreas Verdes",
      description:
        "Recuperamos espacios degradados con restauración del suelo, reforestación y especies nativas. Implementamos soluciones ecológicas para fomentar la biodiversidad y mejorar el equilibrio ambiental en cada intervención.",
    },
  ];

  const toggleService = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="services">
      <div className="services-container">
        <h2>Servicios</h2>
        <div className="services-list">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <button
                className="service-header"
                onClick={() => toggleService(service.id)}
                aria-expanded={expandedId === service.id}
              >
                <div className="service-title">
                  <Leaf className="service-icon leaf-icon" />
                  <span className="service-name">{service.title}</span>
                </div>
                {expandedId === service.id ? (
                  <ChevronUp className="service-icon" />
                ) : (
                  <ChevronDown className="service-icon" />
                )}
              </button>
              {expandedId === service.id && (
                <div className="service-content">
                  <p>{service.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
