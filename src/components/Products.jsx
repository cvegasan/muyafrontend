import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart} from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import FormatoMiles from './FormatoMiles';
import FavoriteButton from './FavoriteButton';  // Importa el nuevo componente
export function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set()); // Estado para favoritos
  const defaultImage = "/placeholder.jpg";


  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://muyabackend.onrender.com/productos");
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error en fetchProducts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Obtener favoritos del usuario
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`https://muyabackend.onrender.com/favoritos/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al obtener favoritos");
        const data = await response.json();
        setFavorites(new Set(data.map((fav) => fav.pro_id))); // Guardamos los productos favoritos en un Set
      } catch (err) {
        console.error("Error en fetchFavorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  // Agregar o quitar de favoritos
  const handleFavoriteToggle = async (productId) => {
    //La sentencia verifica si un producto (identificado por productId) está en el conjunto favorites
    //Si el producto está en el set, la variable isFavorite se establecerá como true, de lo contrario false
    //Si el producto no está en el set, isFavorite será false
    //esta sentencia se usa para determinar si el producto específico ya ha sido marcado como favorito 
    //(si su productId está en el set favorites).
    const isFavorite = favorites.has(productId);
    const userId = localStorage.getItem("userId"); // Asegúrate de tener el usuario almacenado
  
    // Determina si es un POST o DELETE
    const method = isFavorite ? "DELETE" : "POST";
  
    // URL condicional para POST y DELETE
    const url = isFavorite 
      ? `https://muyabackend.onrender.com/favoritos/${userId}/${productId}`  // DELETE
      : `https://muyabackend.onrender.com/favoritos/`;  // POST
  
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body: isFavorite ? null : JSON.stringify({ usu_id: userId, pro_id: productId }),
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error al ${isFavorite ? "eliminar" : "agregar"} favorito`);
      }
  
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (isFavorite) newFavorites.delete(productId);
        else newFavorites.add(productId);
        return newFavorites;
      });
  
      toast.success(`Producto ${isFavorite ? "eliminado de" : "agregado a"} favoritos`);
    } catch (err) {
      console.error("Error en handleFavoriteToggle:", err);
      toast.error("No se pudo actualizar favoritos");
    }
  };
  


  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Producto añadido al carrito");
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="products">
      <div className="products-container">
        <h2>Productos</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.pro_id} className="product-card">
              <div className="product-image">
                <img src={product.pro_imagen_url || defaultImage} alt={product.pro_descripcion} />
              </div>
              <div className="product-info">
                <h3>{product.pro_descripcion}</h3>
                <p className="product-description">{product.pro_caracteristica}</p>
                <p className="product-price">$<FormatoMiles numero = {product.pro_precio}  /></p>
              </div>
              <div className="product-actions">
                <Link to={`/productos/${product.pro_id}`} className="product-button view">
                  <Eye className="w-4 h-4" />
                  <span>Ver más</span>
                </Link>
                <button className="product-button buy" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Comprar</span>
                </button>
                <FavoriteButton
                  productId={product.pro_id}
                  favorites={favorites}
                  handleFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

