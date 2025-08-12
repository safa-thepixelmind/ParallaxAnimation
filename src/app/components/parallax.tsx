"use client";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

interface ParallaxContainerProps {
  children: React.ReactNode;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ children }) => {
  const [showParallax, setShowParallax] = useState(true);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Your original GSAP animation is preserved.
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        transformOrigin: "46.9% 46%", // "X% Y%" coordinate of the 'i' dot
        scale: 1000,
        ease: "expo.in",
        duration: 4,
        // When the animation is complete, we remove the mask from the DOM.
        onComplete: () => setShowParallax(false),
      });
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Layer 1: Your page content, always present underneath. */}
      <div className="relative z-10">{children}</div>

      {/* Layer 2: The Masking System */}
      {showParallax && (
        // The h2 IS the mask. It's a full-screen white layer with black text.
        // The "mix-blend-screen" makes the white parts opaque white,
        // and the black parts (the text) transparent.
        <h2
          ref={parallaxRef}
          className="absolute inset-0 z-20 flex select-none items-center justify-center bg-white font-Gloock text-6xl font-extrabold tracking-tighter text-black mix-blend-screen sm:text-8xl md:text-9xl"
          style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.38)" }}
        >
          I n t i c e d e
        </h2>
      )}
    </div>
  );
};

export default ParallaxContainer;