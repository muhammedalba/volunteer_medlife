import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 group transition-all duration-300 ease-in-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <div className="relative">
        {/* Background circle with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-bgColor to-red-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Main button */}
        <div className="relative bg-gradient-to-r from-bgColor to-red-700 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Icon
            icon="mdi:chevron-up"
            width="32"
            height="32"
            className="transition-transform duration-300 group-hover:translate-y-[-2px]"
          />
        </div>

        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-white/80 animate-pulse"></div>
      </div>
    </button>
  );
};

export default ScrollToTop;
