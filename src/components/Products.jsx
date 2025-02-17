import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImage = "/placeholder.jpg"; // Imagen por defecto

  // Obtener producto desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://muyabackend.onrender.com/productos"
        );
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        console.log("Datos completos recibidos:", data);
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
                <img
                  src={product.pro_imagen_url || defaultImage}
                  alt={product.pro_descripcion}
                />
              </div>
              <div className="product-info">
                <h3>{product.pro_descripcion}</h3>
                <p className="product-description">
                  {product.pro_caracteristica}
                </p>
                <p className="product-price">
                  ${Number(product.pro_precio).toLocaleString()}
                </p>
              </div>
              <div className="product-actions">
                <Link
                  to={`/productos/${product.pro_id}`}
                  className="product-button view"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver más</span>
                </Link>
                <button
                  className="product-button buy"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Comprar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
