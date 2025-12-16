
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VariantNavigator from "./variant-navigator";

interface HeroAnimationProps {
  imageUrls: string[];
  name: string;
  subtitle: string;
  description: string;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalVariants: number;
  textAnimationState: "in" | "out";
}

const HeroAnimation: React.FC<HeroAnimationProps> = ({
  imageUrls,
  name,
  subtitle,
  description,
  onPrev,
  onNext,
  currentIndex,
  totalVariants,
  textAnimationState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current || imageUrls.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Images should be preloaded by useImagePreloader hook
    imagesRef.current = imageUrls.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const firstImage = imagesRef.current[0];

    const resizeCanvas = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (imagesRef.current[frameIndexRef.current]?.complete) {
            drawFrame(frameIndexRef.current);
        }
    };
    
    const drawFrame = (index: number) => {
      if (!context || !canvasRef.current) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    if (firstImage) {
        if (firstImage.complete) {
            resizeCanvas();
        } else {
            firstImage.onload = resizeCanvas;
        }
    }
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;

      // Handle text opacity
      const fadeOutDistance = 200; // pixels to scroll before text is fully transparent
      const newOpacity = Math.max(0, 1 - scrollTop / fadeOutDistance);
      setScrollOpacity(newOpacity);

      // Handle image sequence animation
      const scrollHeight = containerRef.current.clientHeight - window.innerHeight;
      const scrollFraction = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      
      const frameIndex = Math.min(
        imageUrls.length - 1,
        Math.floor(scrollFraction * imageUrls.length)
      );

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    // Initial draw
    drawFrame(0);


    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient, imageUrls]);

  return (
    <div ref={containerRef} style={{ height: '200vh' }} className="w-full relative">
      <div className="sticky top-0 h-screen w-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 h-full w-full container mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 text-center md:text-left">
            
            <div
              className={cn(
                "max-w-lg space-y-2 transition-all duration-500",
                textAnimationState === "in" ? "animate-fade-in" : "animate-fade-out"
              )}
              style={{ 
                opacity: scrollOpacity,
                textShadow: '0 2px 10px rgba(0,0,0,0.7)' 
              }}
            >
              <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter">
                {name}
              </h1>
              <p className="text-xl md:text-2xl font-light uppercase tracking-widest text-white/80 pt-2">
                {subtitle}
              </p>
              <p className="mt-4 max-w-md text-lg opacity-90 text-balance">
                {description}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                <Button variant="outline" className="rounded-full bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base">
                  Ajouter au Panier
                </Button>
                <Button className="rounded-full px-8 py-6 text-base bg-white text-black hover:bg-white/90">
                  Acheter
                </Button>
              </div>
            </div>

            <div className={cn(
                "transition-opacity duration-500",
                textAnimationState === "in" ? "opacity-100" : "opacity-0"
            )}>
              <VariantNavigator 
                onPrev={onPrev}
                onNext={onNext}
                currentIndex={currentIndex}
                totalVariants={totalVariants}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
