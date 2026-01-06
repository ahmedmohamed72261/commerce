"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or lucide-react
import { cn } from "@/lib/utils";

export function BannerSlider({
  images,
  interval = 5000,
  children,
  className,
  heightClass = "aspect-[16/9] md:aspect-[21/9]", // More cinematic aspect ratio
}: {
  images: string[];
  interval?: number;
  children?: React.ReactNode;
  className?: string;
  heightClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, paused, images.length, interval]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className={cn(
        "relative overflow-hidden group rounded-xl bg-black", // Added rounded corners
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides Container */}
      <div className={cn("relative w-full overflow-hidden", heightClass)}>
        {images.map((src, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out will-change-transform",
              i === index 
                ? "opacity-100 scale-100 z-10 visible" 
                : "opacity-0 scale-105 z-0 invisible"
            )}
          >
            {/* The Image with Ken Burns Effect */}
            <img
              src={src}
              alt={`slide-${i}`}
              className={cn(
                "h-full w-full object-cover transition-transform duration-[10000ms] ease-linear",
                i === index ? "scale-110" : "scale-100"
              )}
            />
            
            {/* Multi-layer Gradient for Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
          </div>
        ))}

        {/* Content Overlay - Added a simple entry animation for children */}
        <div 
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          key={`content-${index}`} // Forces re-render for internal animations
        >
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            {children}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 pointer-events-none">
        <NavButton onClick={prev} direction="left" />
        <NavButton onClick={next} direction="right" />
      </div>

      {/* Modern Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30 items-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative h-4 w-12 flex items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === index ? "w-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "w-6 bg-white/30 group-hover:bg-white/60"
            )} />
            
            {/* Animated filling effect for active slide */}
            {i === index && !paused && (
              <div 
                className="absolute inset-x-0 h-1 bg-white/40 rounded-full origin-left animate-progress-fill"
                style={{ animationDuration: `${interval}ms` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Add this to your globals.css for the progress effect */}
      <style jsx>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-progress-fill {
          animation-name: progress-fill;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}

function NavButton({ onClick, direction }: { onClick: () => void, direction: 'left' | 'right' }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "pointer-events-auto h-14 w-14 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white transition-all duration-300",
        "hover:bg-red-600 hover:border-red-500 hover:scale-110 active:scale-95",
        "opacity-0 group-hover:opacity-100",
        direction === "left" ? "-translate-x-6 group-hover:translate-x-0" : "translate-x-6 group-hover:translate-x-0"
      )}
    >
      {direction === "left" ? <ChevronLeft className="h-8 w-8" /> : <ChevronRight className="h-8 w-8" />}
    </Button>
  );
}