
"use client";

import { useState, useEffect } from "react";

// In-memory cache for loaded image URLs
const imageCache = new Set<string>();

export function useImagePreloader(imageUrls: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Filter out already cached images
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

    imagesToLoad.forEach((url) => {
      const img = new Image();
      img.onload = () => handleImageLoad(url);
      img.onerror = () => handleImageLoad(url); // Count errors as loaded to not block the UI
      img.src = url;
    });

  }, [imageUrls]);

  return { isLoading, progress };
}
