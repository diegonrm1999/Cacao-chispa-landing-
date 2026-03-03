import { useCartContext } from "../../context/CartContext";
import InteractiveBackground from "../ui/InteractiveBackground";
import "./Navbar.css";

export default function Navbar({ currentPage, onNavigate }) {
  const { totalItems } = useCartContext();

  // Determine active state for links
  const isActive = (page) => {
    if (page === "home") return currentPage === "home";
    if (page === "products") return currentPage === "products" || currentPage === "product";
    return false;
  };

  return (
    <nav className="navbar">
      <InteractiveBackground />
      <div className="container nav-container">
        <button className="navbar-logo" onClick={() => onNavigate("home")}>
          Cacao Chispa
        </button>

        <ul className="navbar-links">
          <li>
            <button
              className={isActive("home") ? "active" : ""}
              onClick={() => onNavigate("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={isActive("products") ? "active" : ""}
              onClick={() => onNavigate("products")}
            >
              Productos
            </button>
          </li>
        </ul>

        <button className="cart-btn" onClick={() => onNavigate("cart")}>
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
      </div>
    </nav>
  );
}
