import { useState } from "react";
import { COMPANY } from "../../data/company";
import styles from "./Footer.module.css";

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`¡Gracias! Te avisaremos a ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>{COMPANY.name}</div>
          <p className={styles.tagline}>{COMPANY.tagline}</p>
          <p className={styles.copy}>{COMPANY.copyright}</p>
        </div>

        {/* Ubicación */}
        <div className={styles.col}>
          <h4>Ubicación</h4>
          <ul>
            <li>📍 {COMPANY.location}</li>
            <li>{COMPANY.email}</li>
            <li>{COMPANY.phone}</li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.col}>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
          </ul>
        </div>

        {/* Links */}
        <div className={styles.col}>
          <h4>Links</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>Nosotros</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("catalog"); }}>Productos</a></li>
            <li><a href={COMPANY.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div className={styles.col}>
          <h4>Productos</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate("catalog"); }}>Caja de 3 Chocotejas</a></li>
            <li><span className={styles.soon}>Caja Especial</span></li>
            <li><span className={styles.soon}>Chocotejas Mixtas</span></li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className={styles.newsletter}>
        <h4>✉️ Suscríbete a nuestras novedades</h4>
        <div className={styles.newsletterForm}>
          <input
            className={styles.input}
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.subscribeBtn} onClick={handleSubscribe}>
            Suscribirse &gt;
          </button>
        </div>
      </div>
    </footer>
  );
}
