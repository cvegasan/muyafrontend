# Hito 2 - Desarrollo Frontend 💻 🌻 🌴

El segundo hito consiste en el desarrollo de la aplicación cliente con React.
Se crea proyecto _"Muya, Agricultura Urbana"_ en base a las definiciones del
"Hito 1 - Diseño y Prototipo".

## Integrantes

- Ángela Águila
- Bárbara Estrada
- Cristián Vega

## Repositorio

https://github.com/bestrada05/Muya

## Requerimientos

### 1. Crear un nuevo proyecto usando npm e instalar las dependencias.

Las dependencias utilizadas son:

- react: crear interfaces de usuario.
- react vite: compilar, estructura del proyecto.
- react-dom: renderizar los componentes.
- react-router-dom: enrutamiento dinámico.
- lucide-react: íconos
- sonner: notificaciones

### 2. Utilizar React Router para la navegación entre rutas.

Se utiliza react-router-dom para la navegación entre rutas.

### 3. Reutilizar componentes haciendo uso del paso de props y renderización dinámica.

Se reutiliza los componentes mediante el uso de props y la renderización dinámica (react-dom).

### 4. Hacer uso de los hooks para un desarrollo ágil y reactivo.

Los hooks aplicados son: useContext, useState, useEffect.

### 5. Utilizar Context para el manejo del estado global.

UseContext usado en el carro de compras

---

## Manejo de Autenticacion - Login

1. AuthContext (context/AuthContext.jsx)

- Maneja el estado de autenticación global
- Almacena datos del usuario (id, email, token)
- Proporciona funciones principales:
  login: Autenticación con el backend
  logout: Cierre de sesión
  checkAuth: Verifica validez del token
  isAuthenticated: Estado de autenticación

2. Login Component (components/Login.jsx)

- Formulario de inicio de sesión
- Utiliza el AuthContext para manejar la autenticación
- Maneja errores y estados de carga
- Redirecciona tras login exitoso

3. Integración con Backend

- Conecta con tus endpoints:
  POST /usuarios/login para autenticación
  GET /usuarios/verify para verificación de token

- Maneja el token JWT que expira en 1 hora
- Almacena en localStorage:
  token
  userId
  userEmail

4. Seguridad

- Validación de token
- Manejo de expiración de sesión
- Almacenamiento seguro de credenciales
- Protección de rutas
