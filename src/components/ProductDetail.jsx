import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import FormatoMiles from './FormatoMiles';
import ReviewSection from "./ReviewSection";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(1); //Maneja el inicio de la evaluación
  const { addToCart } = useCart();
  const userId = localStorage.getItem("userId"); //usuario almacenado en localStorage
  // Obtener producto desde el backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://muyabackend.onrender.com/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://muyabackend.onrender.com/resenas/producto/${id}`);
        if (!response.ok) throw new Error("Error al obtener las reseñas");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Error obteniendo reseñas:", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      pro_id: product.pro_id,
      pro_descripcion: product.pro_descripcion,
      pro_imagen_url: product.pro_imagen_url,
      pro_precio: product.pro_precio,
    };
    addToCart(productToAdd, quantity);
    toast.success("Producto añadido al carrito");
  };

  const handleSubmitReview = async () => {
    if (!userId) {
      toast.error("Debes estar logueado para dejar una reseña");
      return;
    }

    try {
      const response = await fetch("https://muyabackend.onrender.com/resenas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usu_id: userId,
          pro_id: id,
          res_comentario: newReview,
          res_calificacion: newRating,
        }),
      });

      if (!response.ok) throw new Error("Error al enviar la reseña");

      const newResena = await response.json();
      setReviews([...reviews, newResena]);
      setNewReview("");
      setNewRating(1);
      toast.success("Reseña añadida con éxito");
    } catch (err) {
      console.error("Error enviando la reseña:", err);
      toast.error("Hubo un problema al enviar tu reseña");
    }
  };

  const renderStars = (rating) => {
    return (
            <span className="star-default">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
    );
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-content">
          <h1>{product.pro_descripcion}</h1>
          <div className="product-detail-description">
            <p>{product.pro_caracteristica || "No hay descripción disponible."}</p>
          </div>
          <div className="product-detail-price">
            <p>
              <strong>Precio:</strong> $<FormatoMiles numero = {product.pro_precio}  />
            </p>
          </div>
          <div className="product-detail-form">
            <div className="quantity-input">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Cantidad"
              />
            </div>
            <button onClick={handleAddToCart} className="buy-button">
              <ShoppingCart className="button-icon" />
              <span>Comprar</span>
              <ArrowRight className="button-icon" />
            </button>
          </div>
        </div>
        <div className="product-detail-image">
          <img src={product.pro_imagen_url} alt={product.pro_descripcion} />
        </div>
      
      {/* Sección de Reseñas */}
        <ReviewSection 
          reviews={reviews} 
          userId={userId} 
          newReview={newReview} 
          setNewReview={setNewReview} 
          newRating={newRating} 
          setNewRating={setNewRating} 
          handleSubmitReview={handleSubmitReview} 
          renderStars={renderStars} 
        />
      </div> {/*container*/}
    </div>
  );
}
