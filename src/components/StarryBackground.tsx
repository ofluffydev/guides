"use client";

import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  parallaxFactor: number;
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  // Generate stars based on screen size
  useEffect(() => {
    if (!width || !height) return;

    const starCount = Math.floor((width * height) / 3000); // Adjust density based on screen size
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // 1-3px
        opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0
        twinkleSpeed: Math.random() * 3 + 1, // 1-4s
        parallaxFactor: Math.random() * 0.05 + 0.02, // 0.02-0.07
      });
    }

    setStars(newStars);
  }, [width, height]);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black pointer-events-none overflow-hidden z-[-1]"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: `translateY(${scrollY * star.parallaxFactor}px)`,
            animation: `twinkle ${star.twinkleSpeed}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Add global animation for twinkling effect */}
      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
