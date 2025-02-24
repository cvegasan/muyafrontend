//Componente ReviewSecction se refiere a los comentarios por productos
//1. Review:
//Es un arreglo que contiene las reseñas del producto.
//Se usa para mapear y mostrar cada reseña dentro de la lista de reseñas.

//2. userId:
//Representa el ID del usuario que ha iniciado sesión.
//Se usa para verificar si el usuario está autenticado y permitirle agregar una reseña.

//3. newReview:
//Es un estado que almacena el texto de la nueva reseña que el usuario está escribiendo.
//Se usa como valor del <textarea> donde el usuario escribe su reseña.

//4. setNewReview:
//Es la función que actualiza el estado newReview.
//Se usa en el evento onChange del <textarea> para capturar el texto ingresado.

//5. newRating:
//Es un estado que almacena la calificación en estrellas que el usuario selecciona.
//Se usa para resaltar visualmente las estrellas seleccionadas en la interfaz.

//6. setNewRating:
//Es la función que actualiza el estado newRating.
//Se usa cuando el usuario hace clic en una estrella para cambiar la calificación.

//7. handleSubmitReview:
//Es una función que se ejecuta cuando el usuario hace clic en el botón "Enviar Reseña".
//Se encarga de enviar la reseña al backend y actualizar la lista de reseñas.

//8. renderStars:
//Es una función que se usa para mostrar visualmente la cantidad de estrellas de una reseña.
//Se usa en cada reseña existente para renderizar su calificación.


import PropTypes from "prop-types";
const ReviewSection = ({ reviews, userId, newReview, setNewReview, newRating, setNewRating, handleSubmitReview, renderStars }) => {
  return (
    <div className="product-reviews">
      <h2>Reseñas del Producto</h2>
      {reviews.length > 0 ? (
        <div className="review-list supr-style">
          {reviews.map((review) => (
            <div key={review.res_id} className="review-item">
              <strong>{review.usu_nombre}:</strong> {review.res_comentario} <br />
              <span className="review-stars">Evaluación: {renderStars(review.res_calificacion)}</span>
              <br />
              <small>Fecha: {review.res_fecha}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay reseñas disponibles para este producto.</p>
      )}

      {userId && (
        <div className="add-review review-container">
          <h3>Agregar una reseña</h3>
          <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Escribe tu reseña..." className="review-form-comments" />
          <div className="star-rating">
            <span>Evaluación:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => setNewRating(star)} className={`star ${star <= newRating ? "active" : ""}`}>
                    ★
                </span>
                ))}
          </div>
          <button onClick={handleSubmitReview} className="pay-all-button">Enviar Reseña</button>
        </div>
      )}
    </div>
  );
};

// Agregar validaciones de props
ReviewSection.propTypes = {
    reviews: PropTypes.array.isRequired,
    userId: PropTypes.string,
    newReview: PropTypes.string.isRequired,
    setNewReview: PropTypes.func.isRequired,
    newRating: PropTypes.number.isRequired,
    setNewRating: PropTypes.func.isRequired,
    handleSubmitReview: PropTypes.func.isRequired,
    renderStars: PropTypes.func.isRequired,
  };
export default ReviewSection;