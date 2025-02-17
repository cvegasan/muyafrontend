import { Link } from "react-router-dom";

export function About() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://res.cloudinary.com/dcv4katvi/image/upload/v1738533329/planta_nosotros1_znlllz.jpg"
            alt="Planta nosotros"
            className="about-image"
          />
        </div>
        <div className="about-content">
          <h2>Nosotros</h2>
          <p>
            Muya nació hace más de siete años con el propósito de transformar
            espacios urbanos en áreas verdes vibrantes, sostenibles y
            funcionales. Inspirados por la creciente necesidad de reconectar a
            las personas con la naturaleza, hemos trabajado con instituciones,
            comunidades y empresas para promover la agricultura urbana como una
            herramienta clave para el cambio social y ambiental. Nuestra visión
            es “ser el actor principal de un cambio cultural trascendental”,
            liderando una transformación que enriquezca la vida de las personas
            y fomente un entorno más verde y armonioso.
          </p>
          <Link to="/equipo" className="about-button">
            Conócenos más <span>{">"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
