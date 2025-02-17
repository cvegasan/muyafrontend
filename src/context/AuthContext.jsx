import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    if (token && userEmail && userId) {
      setUser({
        email: userEmail,
        id: userId,
        token,
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://muyabackend.onrender.com/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en el inicio de sesión");
      }

      const data = await response.json();

      // Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userId", data.id);

      setUser({
        email: data.email,
        id: data.id,
        token: data.token,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (nombre, email, password, password2, rol_id) => {
    try {
      const response = await fetch(
        "https://muyabackend.onrender.com/usuarios/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email,
            password,
            password2,
            rol_id, // Añadimos rol_id al objeto JSON
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user?.token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
