export function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Precisión y Seguridad en el Trabajo",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738534006/2.1_tvsa6e.jpg",
    },
    {
      id: 2,
      name: "Cuidado y Estilo en Muros Verdes",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738534006/2.2_ivu3ke.jpg",
    },
    {
      id: 3,
      name: "Nuestro equipo reunido en Casa Muya",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738534007/2.3_cu5hqp.jpg",
    },
    {
      id: 4,
      name: "Trabajo de Mantención",
      image:
        "https://res.cloudinary.com/dcv4katvi/image/upload/v1738534888/IMG_0809_gs9obx.jpg",
    },
  ];

  return (
    <section className="team">
      <div className="team-container">
        <div className="team-content">
          <h2>Nuestro equipo</h2>
          <p>
            En <b>Muya</b> , somos un equipo multidisciplinario comprometido con
            <b>la agricultura urbana, el paisajismo y la sostenibilidad</b>. Nos
            especializamos en el{" "}
            <b>diseño, ejecución y mantenimiento de espacios verdes</b> ,
            combinando creatividad, conocimiento técnico y responsabilidad
            ambiental. Trabajamos de manera colaborativa para ofrecer{" "}
            <b>soluciones innovadoras y adaptadas a cada entorno</b>, integrando
            <b> tecnología, eficiencia hídrica y criterios ecológicos</b>.
            Buscamos generar un impacto positivo en el medioambiente y fomentar
            una cultura de <b>reverdecimiento y conexión con la naturaleza</b>.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-image">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="team-card-name">{member.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
