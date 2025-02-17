import { Trash2, CreditCard, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, checkout } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.pro_precio * item.quantity;
    }, 0);
  };

  const handlePayment = async () => {
    // Verificar autenticación
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para realizar un pedido");
      navigate("/login");
      return;
    }

    try {
      // Usar el método checkout del CartContext, pasando token
      const result = await checkout(user.id, user.token, 1); // 1 es el esp_id, ajusta según tu lógica

      alert("Pedido realizado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error en el pedido:", error);
      alert(error.message || "Hubo un problema al procesar el pedido");
    }
  };
  const handleQuantityChange = (pro_id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(pro_id);
    } else {
      updateQuantity(pro_id, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p>No hay artículos en el carrito</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Carrito de Compra</h1>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.pro_id} className="cart-item">
              <div className="cart-item-image">
                <img
                  src={item.pro_imagen_url || "/placeholder.svg"}
                  alt={item.pro_descripcion}
                />
              </div>
              <div className="cart-item-info">
                <h3>{item.pro_descripcion}</h3>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(item.pro_id, item.quantity - 1)
                    }
                  >
                    <Minus className="button-icon" />
                  </button>
                  <span className="quantity-display">x {item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(item.pro_id, item.quantity + 1)
                    }
                  >
                    <Plus className="button-icon" />
                  </button>
                </div>
                <p className="item-price">
                  ${Number(item.pro_precio * item.quantity).toLocaleString()}
                </p>
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => removeFromCart(item.pro_id)}
                  className="cart-action-button delete"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="button-icon" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="total-section">
            <h2>Total a Pagar:</h2>
            <span className="total-amount">
              ${Number(calculateTotal()).toLocaleString()}
            </span>
          </div>
          <button
            onClick={handlePayment}
            className="pay-all-button"
            aria-label="Pagar todo"
          >
            <CreditCard className="button-icon" />
            <span>Pagar Todo</span>
          </button>
        </div>
      </div>
      <div className="cart-decoration">
        <img
          src="https://res.cloudinary.com/dcv4katvi/image/upload/v1738533331/PlantaCarrito_qofcce.jpg"
          alt="Cart Plant"
          className="decoration-image"
        />
      </div>
    </div>
  );
}
