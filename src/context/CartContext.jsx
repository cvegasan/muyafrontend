import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Verifica si el producto ya existe usando el ID correcto
      const existingItem = prevItems.find(
        (item) => item.pro_id === product.pro_id
      );

      if (existingItem) {
        // Si existe, actualiza la cantidad
        return prevItems.map((item) =>
          item.pro_id === product.pro_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si no existe, añade el nuevo producto con todos sus datos
      return [
        ...prevItems,
        {
          pro_id: product.pro_id,
          pro_descripcion: product.pro_descripcion,
          pro_imagen_url: product.pro_imagen_url,
          pro_precio: product.pro_precio,
          quantity: quantity,
        },
      ];
    });
  };

  const updateQuantity = (pro_id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.pro_id === pro_id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (pro_id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.pro_id !== pro_id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  //  Función para enviar el pedido al backend
  const checkout = async (usu_id, token, esp_id) => {
    const ped_total = cartItems.reduce(
      (total, item) => total + item.pro_precio * item.quantity,
      0
    );

    const detalles = cartItems.map((item) => ({
      pro_id: item.pro_id,
      det_cantidad: item.quantity,
      det_precio_unitario: item.pro_precio,
    }));

    const pedidoData = { usu_id, ped_total, esp_id, detalles };

    try {
      const response = await fetch("https://muyabackend.onrender.com/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Añadir token de autorización
        },
        body: JSON.stringify(pedidoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al completar el pedido");
      }

      const result = await response.json();
      console.log("Pedido realizado con éxito:", result);
      clearCart(); // Vaciar el carrito después de comprar
      return result;
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      throw error; // Relanzar el error para manejarlo en el componente
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
