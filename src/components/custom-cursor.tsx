
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer' ||
        target.closest('a, button, [role="button"], .cursor-pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2',
        'rounded-full bg-primary mix-blend-difference',
        'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isPointer ? 'w-6 h-6' : 'w-3 h-3'
      )}
    />
  );
};

export default CustomCursor;
