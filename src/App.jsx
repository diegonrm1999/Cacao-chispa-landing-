import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import InteractiveBackground from "./components/ui/InteractiveBackground";
import "./styles/global.css";

export default function App() {
  const [route, setRoute] = useState({ page: "home", params: {} });

  const navigate = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return <HomePage onNavigate={navigate} />;

      case "products":
        return <ProductsPage onNavigate={navigate} />;

      case "product":
        return <ProductDetailPage productId={route.params.productId} onNavigate={navigate} />;

      case "cart":
        return <CartPage onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <InteractiveBackground />
      <Navbar onNavigate={navigate} currentPage={route.page} />
      {renderPage()}
      <Footer onNavigate={navigate} />
    </CartProvider>
  );
}
