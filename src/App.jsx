import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { NavBar } from "./components/NavBar";
import { Features } from "./components/Features";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { Services } from "./components/Services";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProductDetail } from "./components/ProductDetail";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NotFound } from "./components/NotFound";
import { Toaster } from "./components/ui/Toaster";
import { AuthProvider } from "./context/AuthContext";

function HomePage() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>MUYA</h1>
          <p>Agricultura Urbana</p>
        </div>
      </div>
      <Features />
      <About />
      <Projects />
      <Services />
      <Products />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <NavBar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/equipo" element={<Team />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/productos/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
