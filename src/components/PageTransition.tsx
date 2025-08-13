"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [sealOpened, setSealOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    setShowContent(false);
    setSealOpened(false);

    const openSealTimer = setTimeout(() => {
      setSealOpened(true);
    }, 600);

    const showContentTimer = setTimeout(() => {
      setShowContent(true);
    }, 900);

    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
      setSealOpened(false);
    }, 1500);

    return () => {
      clearTimeout(openSealTimer);
      clearTimeout(showContentTimer);
      clearTimeout(endTimer);
    };
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-all duration-300 ease-out ${
          isTransitioning
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="relative w-full h-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 transform transition-all duration-800 ${
              isTransitioning && !sealOpened
                ? "translate-x-0 ease-out"
                : "-translate-x-full ease-in-out"
            }`}
            style={{
              transitionTimingFunction: isTransitioning && !sealOpened 
                ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent"></div>
          </div>

          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-900 via-gray-800 to-gray-900 transform transition-all duration-800 ${
              isTransitioning && !sealOpened
                ? "translate-x-0 ease-out"
                : "translate-x-full ease-in-out"
            }`}
            style={{
              transitionTimingFunction: isTransitioning && !sealOpened 
                ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-black/60 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative transform ease-out ${
                isTransitioning
                  ? "scale-100 opacity-100 rotate-0"
                  : "scale-50 opacity-0 rotate-180"
              }`}
              style={{
                transition: 'all 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <div className="absolute inset-0 bg-amber-500/40 rounded-full blur-3xl animate-pulse" style={{ width: '200px', height: '200px', top: '-50px', left: '-50px' }}></div>
              
              <div 
                className={`relative w-24 h-24 transform ${
                  sealOpened ? "scale-150 opacity-70" : "scale-100 opacity-100"
                }`}
                style={{
                  transition: 'all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
              >
                
                <div 
                  className={`absolute inset-0 border-4 border-amber-400 rounded-full transform ${
                    sealOpened ? "scale-110 opacity-50 rotate-90" : "scale-100 opacity-100 rotate-0"
                  }`}
                  style={{
                    transition: 'all 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  <div className="absolute -top-2 left-1/2 w-2 h-2 bg-amber-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-amber-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 -left-2 w-2 h-2 bg-amber-400 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-amber-400 rounded-full transform -translate-y-1/2"></div>
                </div>
                
                <div 
                  className={`absolute inset-2 border-2 border-amber-300 rounded-full transform ${
                    sealOpened ? "scale-90 opacity-30 -rotate-45" : "scale-100 opacity-80 rotate-0"
                  }`}
                  style={{
                    transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                ></div>
                
                <div 
                  className={`absolute inset-0 flex items-center justify-center transform ${
                    sealOpened ? "scale-75 opacity-0 rotate-180" : "scale-100 opacity-100 rotate-0"
                  }`}
                  style={{
                    transition: 'all 700ms cubic-bezier(0.55, 0.055, 0.675, 0.19)'
                  }}
                >
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-amber-300 transform -translate-y-1/2"></div>
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-amber-300 transform -translate-x-1/2"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-300"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-300"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-300"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-300"></div>
                  </div>
                </div>
                
                <div 
                  className={`absolute -inset-4 transform ${
                    sealOpened ? "rotate-180 scale-150 opacity-0" : "rotate-0 scale-100 opacity-60"
                  }`}
                  style={{
                    transition: 'all 1000ms cubic-bezier(0.645, 0.045, 0.355, 1)'
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-amber-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-amber-400 rounded-full animate-ping ${
                    sealOpened ? "opacity-100" : "opacity-60"
                  }`}
                  style={{
                    top: `${30 + i * 10}%`,
                    left: `${20 + i * 12}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          showContent
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
        style={{
          visibility: showContent ? 'visible' : 'hidden',
          transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {children}
      </div>
    </>
  );
}
