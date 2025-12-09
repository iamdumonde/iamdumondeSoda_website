
"use client";

import { useState, useEffect } from "react";

export function useImagePreloader(imageUrls: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setIsLoading(false);
      return;
    }

    const imageCache: { [key: string]: HTMLImageElement } = {};

    const handleImageLoad = () => {
      loadedCount++;
      const newProgress = (loadedCount / totalImages) * 100;
      setProgress(newProgress);
      if (loadedCount === totalImages) {
        // A small delay to allow the progress bar to reach 100% visually
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    imageUrls.forEach((url) => {
      // Check if image is already cached by browser
      const img = new Image();
      if (img.complete) {
          handleImageLoad();
      } else {
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad; // Count errors as loaded to not block the UI
        img.src = url;
        imageCache[url] = img;
      }
    });

    return () => {
      // Cleanup function, though images are now in browser cache
      Object.values(imageCache).forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return { isLoading, progress };
}

    