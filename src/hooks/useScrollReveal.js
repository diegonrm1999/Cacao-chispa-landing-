import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    // Skip scroll reveal on mobile to prevent layout shifts and re-render flashes
    // Mobile browsers have viewport calculation issues during scroll that cause
    // elements to flicker between visible/hidden states
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, immediately show the element without animation
      if (ref.current) {
        ref.current.classList.add("is-visible");
      }
      return;
    }

    // To prevent infinite rerenders if options ref changes, we check its values
    const optionsObj = options || {};
    const defaultOptions = {
      root: null,
      rootMargin: "0px", // trigger exactly when it enters the viewport to avoid late pop-ins
      threshold: 0.05,                  // fire when just 5% is visible
      ...optionsObj,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        // Only trigger once per element to prevent re-animation on scroll up/down
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          entry.target.classList.add("is-visible");
          // Stop observing once it has revealed once to prevent scroll flashes
          obs.unobserve(entry.target); 
        }
      });
    }, defaultOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [JSON.stringify(options)]); // Stringify options to avoid unnecessary observer re-creations

  return ref;
}
