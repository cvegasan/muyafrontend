import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Projects() {
  const projects = [
    {
      id: 1,
      title: "Propuesta de Diseño para la Casa Italia",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738535197/3.1_Propuesta_de_Disen%CC%83o_para_la_Casa_Italia_vwrf9p.jpg",
    },
    {
      id: 2,
      title: "Diseño y Ejecución en Tresmontes Lucchetti",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738535196/3.2_Disen%CC%83o_y_Ejecucio%CC%81n_en_Tresmontes_Lucchetti_lclexc.jpg",
    },
    {
      id: 3,
      title: "Paisajismo y Riego en Quinta Compton – PUCV",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738535196/3.3_Paisajismo_y_Riego_en_Quinta_Compton_PUCV_ihdji7.jpg",
    },
    {
      id: 4,
      title: "Casa Muya",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738533332/trabajdor3_ob5psz.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCards >= projects.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - visibleCards : prevIndex - 1
    );
  };

  return (
    <section className="projects">
      <div className="projects-container">
        <h2>Proyectos</h2>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            &#8249;
          </button>
          <div className="carousel-content">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}
            >
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="project-card"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="project-card-image">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                    />
                  </div>
                  <div className="project-card-content">
                    <h3>{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
