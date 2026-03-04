import { useRef } from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onClick }) {
  const { name, priceLabel, image, available } = product;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || !available) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -14;
    const tiltY = (x - 0.5) * 14;

    card.style.setProperty("--tilt-x", `${tiltX}deg`);
    card.style.setProperty("--tilt-y", `${tiltY}deg`);
    card.style.setProperty("--spot-x", `${x * 100}%`);
    card.style.setProperty("--spot-y", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${!available ? styles.comingSoon : ""}`}
      onClick={() => available && onClick(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
        "--spot-x": "50%",
        "--spot-y": "50%",
      }}
    >
      {/* Spotlight glow layer removed to fix brown flash */}

      <div className={styles.imgArea}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.productImg}
            width={280}
            height={220}
          />
        ) : (
          <div className={styles.noImagePlaceholder} />
        )}
        {!available && (
          <div className={styles.overlay}>
            <span className={styles.comingSoonLabel}>Próximamente</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {available && <div className={styles.price}>{priceLabel}</div>}
      </div>
    </div>
  );
}
