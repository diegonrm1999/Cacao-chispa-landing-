import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import InteractiveBackground from "../ui/InteractiveBackground";
import logoImg from "../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active state for links based on actual URL
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/products") return location.pathname.startsWith("/product");
    return false;
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-bg-layer">
        <InteractiveBackground />
      </div>

      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <div className="container nav-container">
        <button className="navbar-logo" onClick={() => handleNavigate("/")}>
          <img src={logoImg} alt="Cacao & Chispa" className="navbar-logo-img" width={120} height={40} />
        </button>

        <ul className={`navbar-links ${isMenuOpen ? "menu-open" : ""}`}>
          <li>
            <button
              className={isActive("/") ? "active" : ""}
              onClick={() => handleNavigate("/")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={isActive("/products") ? "active" : ""}
              onClick={() => handleNavigate("/products")}
            >
              Productos
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="secondary-actions">
            <button className="cart-btn" onClick={() => handleNavigate("/cart")}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cart-icon"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
