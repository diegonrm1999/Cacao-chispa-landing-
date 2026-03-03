import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import styles from "./ProductsPage.module.css";

export default function ProductsPage({ onNavigate }) {
  const availableProducts = PRODUCTS.filter((p) => p.available);

  const handleProductClick = (product) => {
    onNavigate("product", { productId: product.id });
  };

  return (
    <section className={styles.productsSection}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.icon}>🍫</span>
            Nuestros Productos
          </h1>
          <p className={styles.subtitle}>
            Descubre nuestras chocotejas artesanales, elaboradas con amor y los mejores ingredientes peruanos.
          </p>
        </div>

        <div className={styles.grid}>
          {availableProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>

        {PRODUCTS.filter((p) => !p.available).length > 0 && (
          <div className={styles.comingSoon}>
            <h2 className={styles.comingSoonTitle}>Próximamente</h2>
            <div className={styles.grid}>
              {PRODUCTS.filter((p) => !p.available).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => { }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
