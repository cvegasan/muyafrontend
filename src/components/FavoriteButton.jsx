import { Heart, HeartOff } from "lucide-react";
import PropTypes from "prop-types";  // Importa PropTypes

function FavoriteButton({ productId, favorites, handleFavoriteToggle }) {
  return (
    <button className="favorite-button favorite" onClick={() => handleFavoriteToggle(productId)}>
      {/* Verifica si el producto está en favoritos */}
      {favorites.has(productId) ? (
        // Corazón rojo si el producto está en favoritos
        <Heart className="w-4 h-4 icon-heart-red" />
      ) : (
        // Corazón gris/blanco si el producto no está en favoritos
        <HeartOff className="w-4 h-4 icon-heart-gray" />
      )}
    </button>
  );
}

// Agrega validación de las props
FavoriteButton.propTypes = {
  productId: PropTypes.number.isRequired,  // productId debe ser un número
  favorites: PropTypes.instanceOf(Set).isRequired,  // favorites debe ser una instancia de Set
  handleFavoriteToggle: PropTypes.func.isRequired,  // handleFavoriteToggle debe ser una función
};
export default FavoriteButton;