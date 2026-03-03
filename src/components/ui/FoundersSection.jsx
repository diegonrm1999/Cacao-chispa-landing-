import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FOUNDERS } from "../../data/company";
import styles from "./FoundersSection.module.css";

export default function FoundersSection({ onProductsClick }) {
  const revealRef = useScrollReveal();

  return (
    <section ref={revealRef} className={`${styles.section} reveal-up`}>
      <div className={`${styles.inner} container`}>
        {/* Founder photos */}
        <div className={styles.photos}>
          {FOUNDERS.map((founder) => (
            <div
              key={founder.id}
              className={styles.frame}
              style={{ background: founder.bgColor, transition: "transform 0.4s ease-out, box-shadow 0.4s ease" }}
            >
              <div className={styles.emoji}>{founder.emoji}</div>
              <div className={styles.nameTag} style={{ fontFamily: "var(--font-body)", fontWeight: "500" }}>{founder.name}</div>
            </div>
          ))}
        </div>

        {/* Text content */}
        <div className={styles.text}>
          <h2 className={styles.title} style={{ fontFamily: "var(--font-display)", fontWeight: "500", letterSpacing: "-0.01em" }}>
            Creamos chocotejas que despiertan recuerdos.
          </h2>
          <p className={styles.desc}>
            Somos dos apasionados del chocolate peruano que decidimos transformar
            una receta familiar en un emprendimiento lleno de sabor. Cada chocoteja
            que hacemos lleva nuestra dedicación, ingredientes de primera y el
            cariño de siempre.
          </p>
          <div className={styles.btns}>
            <button className="btn btn-outline" onClick={onProductsClick}>
              Ver productos &gt;
            </button>
            <button className="btn btn-filled">
              📍 Encuéntranos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
