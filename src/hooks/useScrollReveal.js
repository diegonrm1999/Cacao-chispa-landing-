import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const defaultOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px", // trigger 40px before bottom edge
      threshold: 0.05,                  // fire when just 5% is visible
      ...options,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optional: stop observing once it has revealed once
          // observer.unobserve(entry.target); 
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
  }, [options]);

  return ref;
}
