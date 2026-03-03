import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { WHATSAPP_NUMBER } from "../data/products";
import styles from "./CartPage.module.css";

export default function CartPage({ onNavigate }) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartContext();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

  const handleWhatsApp = () => {
    if (items.length === 0) return;

    let message = "Hola! Quiero ordenar los siguientes productos:%0A%0A";
    items.forEach((item) => {
      message += `- ${item.name}: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}%0A`;
    });
    message += `%0ATotal: ${formatPrice(totalPrice)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className={styles.emptyCart}>
        <div className={styles.emptyIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>Tu carrito está vacío</h2>
        <p className={styles.emptyText}>
          Agrega algunas chocotejas para comenzar tu orden
        </p>
        <button className="btn btn-filled" onClick={() => onNavigate("products")}>
          Ver productos
        </button>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className={styles.orderSuccess}>
        <div className={styles.successIcon}>✅</div>
        <h2 className={styles.successTitle}>¡Orden enviada!</h2>
        <p className={styles.successText}>
          Gracias por tu orden. Nos pondremos en contacto contigo pronto por WhatsApp.
        </p>
        <button className="btn btn-filled" onClick={() => {
          setOrderPlaced(false);
          onNavigate("products");
        }}>
          Seguir comprando
        </button>
      </section>
    );
  }

  return (
    <section className={styles.cartSection}>
      <h1 className={styles.title}>
        <div className={styles.titleIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        Tu Carrito
      </h1>

      <div className={`${styles.container} container`}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemImage}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className={styles.productImg} />
                ) : (
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                )}
              </div>

              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
              </div>

              <div className={styles.itemQuantity}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className={styles.qtyValue}>{item.quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className={styles.itemTotal}>
                {formatPrice(item.price * item.quantity)}
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Envío</span>
            <span>Por confirmar</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button className={styles.whatsappBtn} onClick={handleWhatsApp}>
            <span>💬</span> Completar orden por WhatsApp
          </button>

          <button className={styles.continueBtn} onClick={() => onNavigate("products")}>
            Continuar comprando
          </button>
        </div>
      </div>
    </section>
  );
}
