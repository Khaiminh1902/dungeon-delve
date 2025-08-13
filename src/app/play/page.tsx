"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { classIconPath } from "@/lib/pixelPaths";

export default function PlayPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("dd_session");
    if (raw) setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-2xl font-semibold">You must sign in</h1>
        <Link href="/auth" className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Go to Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-8 h-20 bg-amber-700 rounded-sm opacity-70"></div>
      <div className="absolute top-4 left-10 w-12 h-12 bg-orange-500 rounded-full blur-md animate-pulse" style={{ animationDuration: '2.5s' }}></div>
      <div className="absolute top-8 right-8 w-8 h-20 bg-amber-700 rounded-sm opacity-70"></div>
      <div className="absolute top-4 right-10 w-12 h-12 bg-orange-500 rounded-full blur-md animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Hero status banner */}
      <div className="mb-8 w-full max-w-4xl bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-amber-900/30 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center gap-6">
          <div className="text-2xl">🏰</div>
          <div>
            <h2 className="text-xl font-bold text-amber-200">Hero Ready for Adventure</h2>
            <p className="text-sm text-amber-400/80">Your legend awaits in the depths below</p>
          </div>
          <div className="text-2xl">⚔️</div>
        </div>
      </div>
      
      {/* Main play area */}
      <div className="bg-gradient-to-b from-amber-900/20 to-orange-900/10 backdrop-blur-md border border-amber-600/30 rounded-3xl p-12 shadow-2xl shadow-black/50 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
          The Dungeon Awaits
        </h1>
        
        <div className="mb-8 flex justify-center items-center gap-6">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-amber-600"></div>
          <div className="text-3xl animate-pulse" style={{ animationDuration: '2s' }}>🗺️</div>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent"></div>
        </div>
        
        {/* Weapon showcase */}
        <div className="mb-8 p-6 bg-gradient-to-r from-black/20 to-black/10 rounded-2xl border border-amber-600/20">
          <p className="text-amber-200 mb-4 font-semibold">Choose Your Path:</p>
          <div className="flex items-center justify-center gap-8">
            {["Knight", "Mage", "Archer", "Rogue"].map((cls) => (
              <div key={cls} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-black/30 border border-amber-600/30 rounded-xl p-3 group-hover:border-amber-400/50 transition-all duration-200">
                  <Image 
                    src={classIconPath(cls)} 
                    alt={cls} 
                    width={48} 
                    height={48} 
                    style={{ imageRendering: "pixelated" }} 
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="mb-10 text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
          Descend into ancient chambers filled with forgotten treasures, lurking monsters, and untold mysteries. 
          Your adventure begins now, brave hero.
        </p>
        
        <button className="group relative bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 px-12 py-6 rounded-2xl font-bold text-2xl text-white shadow-lg shadow-green-900/50 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-green-800/70">
          <span className="relative z-10 flex items-center justify-center gap-4">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">⚖️</span>
            <span>ENTER THE DUNGEON</span>
            <span className="text-3xl group-hover:-rotate-12 transition-transform duration-300">🛡️</span>
          </span>
          
          {/* Epic glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 to-green-400/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          
          {/* Pulsing ring */}
          <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-2xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        </button>
        
        {/* Stats/info bar */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-amber-400">LEVEL</div>
            <div className="text-amber-200 font-bold">1</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <div className="text-2xl mb-1">❤️</div>
            <div className="text-xs text-amber-400">HEALTH</div>
            <div className="text-amber-200 font-bold">100</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-amber-400">GOLD</div>
            <div className="text-amber-200 font-bold">0</div>
          </div>
        </div>
      </div>
      
      {/* Sign out */}
      <div className="mt-8 text-center">
        <p className="text-amber-300/70">
          Not your hero?{" "}
          <button
            className="text-amber-400 hover:text-amber-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
            onClick={() => {
              localStorage.removeItem("dd_session");
              window.location.href = "/auth";
            }}
          >
            Return to character selection
          </button>
        </p>
      </div>
      
      {/* Bottom decorative */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 opacity-40">
        <div className="text-2xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>⚡</div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <div className="text-amber-400 text-xs tracking-widest font-bold">LEGEND BEGINS</div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <div className="text-2xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>🔥</div>
      </div>
    </main>
  );
}
