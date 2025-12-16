
"use client";

import { useState, useEffect } from "react";

// In-memory cache for loaded image URLs
const imageCache = new Set<string>();

export function useImagePreloader(imageUrls: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // A fresh key on HeroAnimation will re-mount it, so we can re-evaluate the images to load.
    const imagesToLoad = imageUrls.filter(url => !imageCache.has(url));
    const totalImages = imagesToLoad.length;
    
    if (totalImages === 0) {
      setProgress(100);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setProgress(0);
    let loadedCount = 0;

    const handleImageLoad = (url: string) => {
      loadedCount++;
      imageCache.add(url); // Add to cache on successful load
      const newProgress = (loadedCount / totalImages) * 100;
      setProgress(newProgress);
      if (loadedCount === totalImages) {
        // A small delay to allow the progress bar to reach 100% visually
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    const imageLoaders = imagesToLoad.map(url => {
        const img = new Image();
        img.onload = () => handleImageLoad(url);
        img.onerror = () => handleImageLoad(url); // Count errors as loaded to not block the UI
        img.src = url;
        return img;
    });

    return () => {
        imageLoaders.forEach(img => {
            img.onload = null;
            img.onerror = null;
        });
    };

  }, [imageUrls]);

  return { isLoading, progress };
}
