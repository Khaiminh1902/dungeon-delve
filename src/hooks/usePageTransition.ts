"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function usePageTransition() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithTransition = (href: string, delay: number = 300) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push(href);
      setIsTransitioning(false);
    }, delay);
  };

  return {
    navigateWithTransition,
    isTransitioning,
  };
}
