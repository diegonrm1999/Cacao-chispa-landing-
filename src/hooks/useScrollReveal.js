import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
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
        if (entry.isIntersecting) {
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
