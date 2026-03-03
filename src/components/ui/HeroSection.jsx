import { useEffect, useState, useRef } from "react";
import styles from "./HeroSection.module.css";
import chocotejaImg from "../../assets/images/chocoteja.png";

export default function HeroSection({ onShopClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Subtle Mouse Parallax Effect for depth
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate values from -1 to 1 based on mouse position
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // Update CSS variables for scoped transform calculations
    heroRef.current.style.setProperty('--mouse-x', xPos);
    heroRef.current.style.setProperty('--mouse-y', yPos);
  };

  return (
    <div className={styles.heroWrapper}>
      <section
        className={styles.hero}
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{ '--mouse-x': 0, '--mouse-y': 0 }} // Default values
      >
        {/* ── Layer 1: Base Background Layer (Cream) ── */}
        <div className={styles.baseBg}></div>

        {/* ── Layer 2: Massive Diagonal Chocolate Sweep ── */}
        <div className={styles.diagonalSweep}>
          <svg preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
            {/* Smooth, elegant bezier curve sweeping across */}
            <path d="M0,0 L1440,0 L1440,300 C900,800 400,200 0,600 Z" fill="var(--choco)" />
          </svg>
        </div>

        <div className={styles.content}>
          {/* Left: Text Content */}
          <div className={`${styles.text} ${isLoaded ? styles.animateIn : ""}`}>
            <h1 className={styles.title} style={{ transitionDelay: "100ms" }}>
              Una{" "}
              <span className={styles.pill}>Chocoteja</span>
              <br />
              que enamora{" "}
              <span className={`${styles.pill} ${styles.pillRose}`}>corazones</span>
            </h1>
            <p className={styles.subtitle} style={{ transitionDelay: "250ms" }}>
              Envuelve tus momentos especiales con el sabor artesanal de nuestras
              chocotejas dulces, únicas y hechas con amor.
            </p>
            <div className={styles.ctaWrapper} style={{ transitionDelay: "400ms" }}>
              <button className={`btn btn-filled ${styles.cta}`} onClick={onShopClick}>
                Ver productos →
              </button>
            </div>
          </div>

          {/* Right: Staged Product Showcase */}
          <div className={`${styles.showcase} ${isLoaded ? styles.animateShowcaseIn : ""}`}>
            <div className={styles.stageBackdrop}></div>
            <div className={styles.focalLight}></div>
            <div className={styles.productStage}>
              <img
                src={chocotejaImg}
                alt="Chocoteja Premium"
                className={styles.productImg}
              />
              {/* Subtle floating abstract elements staging the product */}
              <div className={`${styles.sprinkle} ${styles.sp1}`}>✦</div>
              <div className={`${styles.sprinkle} ${styles.sp2}`}>✦</div>
              <div className={`${styles.sprinkle} ${styles.sp3}`}>●</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
