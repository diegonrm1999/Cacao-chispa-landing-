import { useScrollReveal } from "../hooks/useScrollReveal";
import HeroSection from "../components/ui/HeroSection";
import FoundersSection from "../components/ui/FoundersSection";
import ProductCard from "../components/ui/ProductCard";
import { PRODUCTS } from "../data/products";
import styles from "./HomePage.module.css";

export default function HomePage({ onNavigate }) {
  const productsRevealRef = useScrollReveal();

  const handleProductClick = (product) => {
    onNavigate("product", { productId: product.id });
  };

  return (
    <main>
      {/* S1 — Hero */}
      <HeroSection onShopClick={() => onNavigate("products")} />

      {/* S2 — Products preview */}
      <section ref={productsRevealRef} className={`${styles.productsSection} reveal-up`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.titleWrap}>
              <span className={styles.icon}></span>
              <h2 className={styles.title} style={{ fontFamily: "var(--font-display)" }}>Nuestras Chocotejas</h2>
              <span className={styles.dash}> –</span>
            </div>
            <button className="btn btn-outline" onClick={() => onNavigate("products")}>
              Ver todos &gt;
            </button>
          </div>

          <div className={styles.scroll}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* S3 — Founders */}
      <FoundersSection onProductsClick={() => onNavigate("products")} />
    </main>
  );
}
