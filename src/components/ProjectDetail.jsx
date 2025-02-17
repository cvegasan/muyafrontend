import { useParams } from "react-router-dom";
import projects from "../data/projects";

export function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No se encontró el proyecto</p>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <h1>{project.name}</h1>
        <div className="project-detail-content">
          <p className="project-description">{project.description}</p>
          <div className="project-images">
            <div className="project-main-image">
              <img src={project.mainImage.src} alt={project.mainImage.title} />
              <div className="image-overlay">
                <span className="image-title">{project.mainImage.title}</span>
              </div>
            </div>
            <div className="project-images-grid">
              {project.images.map((image) => (
                <div key={image.id} className="project-image-card">
                  <img src={image.src} alt={image.title} />
                  <div className="image-overlay">
                    <span className="image-title">{image.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
