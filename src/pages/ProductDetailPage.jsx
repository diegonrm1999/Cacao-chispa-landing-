import { useState } from "react";
import { PRODUCTS, WHATSAPP_NUMBER } from "../data/products";
import { useCartContext } from "../context/CartContext";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage({ productId, onNavigate }) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <section className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <button className="btn btn-filled" onClick={() => onNavigate("products")}>
          ← Volver a productos
        </button>
      </section>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Hola! Quiero ordenar ${quantity} ${quantity > 1 ? "cajas" : "caja"} de ${product.name}. Total: S/ ${(product.price * quantity).toFixed(2)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className={styles.detailSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.imageArea}>
          <button className={styles.backBtn} onClick={() => onNavigate("products")}>
            ← Volver a productos
          </button>
          <div className={styles.imageWrapper}>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImg}
              />
            ) : (
              <div className={styles.imgPlaceholder} />
            )}
          </div>
        </div>

        <div className={styles.infoArea}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.shortDesc}>{product.shortDesc}</p>

          <div className={styles.price}>S/ {product.price.toFixed(2)}</div>

          <p className={styles.description}>{product.description}</p>

          {product.details && product.details.length > 0 && (
            <ul className={styles.details}>
              {product.details.map((detail, index) => (
                <li key={index}>
                  <span className={styles.check}>✓</span> {detail}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className={`btn btn-filled ${styles.addBtn}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? "✓ Agregado" : "Agregar al carrito"}
            </button>
          </div>

          <div className={styles.total}>
            <span>Total:</span>
            <span className={styles.totalPrice}>
              S/ {(product.price * quantity).toFixed(2)}
            </span>
          </div>

          <button className={styles.whatsappBtn} onClick={handleWhatsApp}>
            <span>💬</span> Ordenar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
