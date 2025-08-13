"use client";
import gsap from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";

interface ParallaxContainerProps {
  children: React.ReactNode;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ children }) => {
  const [showParallax, setShowParallax] = useState(true); 
  const parallaxRef = useRef<HTMLHeadingElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const runAnimation = () => {
      if (parallaxRef.current && targetRef.current) {
        gsap.killTweensOf(parallaxRef.current);
        setShowParallax(true);

        const X_NUDGE_PERCENT = 0.15;
        const Y_NUDGE_PERCENT = 0.04;
        const Y_DOT_POSITION_MULTIPLIER = 0.15;

        const containerRect = parallaxRef.current.getBoundingClientRect();
        const targetRect = targetRef.current.getBoundingClientRect();

        const xNudgeInPixels = targetRect.width * X_NUDGE_PERCENT;
        const yNudgeInPixels = targetRect.height * Y_NUDGE_PERCENT;

        const originX =
          targetRect.left - containerRect.left + (targetRect.width / 2) + xNudgeInPixels;

        const originY =
          targetRect.top - containerRect.top + (targetRect.height * Y_DOT_POSITION_MULTIPLIER) + yNudgeInPixels;

        // The animation is now active with the correct origin point
        gsap.to(parallaxRef.current, {
          transformOrigin: `${originX}px ${originY}px`,
          scale: 200,
          ease: "expo.in",
          duration: 4,
          onComplete: () => setShowParallax(false),
        });
      }
    };

    runAnimation();
    window.addEventListener("resize", runAnimation);

    return () => {
      window.removeEventListener("resize", runAnimation);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative z-10">{children}</div>
      {showParallax && (
        <h2
          ref={parallaxRef}
          className="absolute inset-0 z-20 flex select-none items-center justify-center bg-white font-Gloock text-6xl font-extrabold tracking-tighter text-black mix-blend-screen sm:text-8xl md:text-9xl"
          style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.38)" }}
          aria-hidden="true"
        >
          <span>I</span><span>&nbsp;</span><span>n</span><span>&nbsp;</span><span>t</span><span>&nbsp;</span><span ref={targetRef}>i</span><span>&nbsp;</span><span>c</span><span>&nbsp;</span><span>e</span><span>&nbsp;</span><span>d</span><span>&nbsp;</span><span>e</span>
        </h2>
      )}
    </div>
  );
};

export default ParallaxContainer;