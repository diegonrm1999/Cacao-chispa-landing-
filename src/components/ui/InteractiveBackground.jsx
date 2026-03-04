import { useEffect, useState } from "react";
import styles from "./InteractiveBackground.module.css";

export default function InteractiveBackground({ contained = false }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrameId = null;

        const handleMouseMove = (e) => {
            // Disable on mobile to prevent scroll jitters or unnecessary re-renders
            if (window.innerWidth <= 768) return;

            // Calculate mouse position relative to center of screen (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            // Throttle with requestAnimationFrame for performance
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(() => {
                    setMousePos({ x, y });
                    animationFrameId = null;
                });
            }
        };

        // Only add listener on desktop
        if (window.innerWidth > 768) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Parallax offsets for different layers
    const slowOffset = {
        transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
    };

    const fastOffset = {
        transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`,
    };

    const mediumOffset = {
        transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
    };

    return (
        <div className={`${styles.interactiveBg} ${contained ? styles.contained : ""}`}>
            {/* Background base texture */}
            <div className={styles.grainTexture}></div>

            {/* Layer 1: Soft large abstract blobs (Slow) */}
            <div className={styles.layer} style={slowOffset}>
                <div className={`${styles.blob} ${styles.blob1}`}></div>
                <div className={`${styles.blob} ${styles.blob2}`}></div>
            </div>

            {/* Layer 2: Delicate cacao particles/sprinkles (Medium) */}
            <div className={styles.layer} style={mediumOffset}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className={styles.particles}>
                    <circle cx="10%" cy="20%" r="2" fill="#8C5E45" opacity="0.4" />
                    <circle cx="85%" cy="30%" r="3" fill="#6D4C41" opacity="0.3" />
                    <circle cx="20%" cy="80%" r="1.5" fill="#3E2723" opacity="0.5" />
                    <circle cx="75%" cy="85%" r="2.5" fill="#8C5E45" opacity="0.4" />
                    <circle cx="50%" cy="15%" r="1" fill="#3E2723" opacity="0.3" />

                    {/* Sprinkles (paths) */}
                    <path d="M 30% 40% L 31% 41%" stroke="#8C5E45" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M 80% 60% L 79% 62%" stroke="#6D4C41" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                    <path d="M 15% 60% L 16% 58%" stroke="#D4A5A5" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M 60% 80% L 62% 79%" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                    <path d="M 40% 90% L 39% 92%" stroke="#8C5E45" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
            </div>

            {/* Layer 3: Larger blurred floating particles (Fast) */}
            <div className={styles.layer} style={fastOffset}>
                <div className={`${styles.particle} ${styles.p1}`}></div>
                <div className={`${styles.particle} ${styles.p2}`}></div>
                <div className={`${styles.particle} ${styles.p3}`}></div>
            </div>
        </div>
    );
}
