"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Castle,
  Shield,
  Scale,
  Trophy,
  Heart,
  Coins,
  Zap,
  Flame,
} from "lucide-react";

export default function PlayPage() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem("dd_session");
    if (raw) {
      try {
        const session = JSON.parse(raw);
        if (session.userId && session.token) {
          setAuthed(true);
        } else {
          localStorage.removeItem("dd_session");
          router.push("/auth");
        }
      } catch {
        localStorage.removeItem("dd_session");
        router.push("/auth");
      }
    } else {
      router.push("/auth");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("dd_session");
    router.push("/auth");
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8 relative"
      style={{
        backgroundImage: "url(/bg/dungeon3.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        imageRendering: "pixelated",
      }}
    >
      <div className="bg-gradient-to-b from-amber-900/20 to-orange-900/10 backdrop-blur-md border border-amber-600/30 rounded-3xl p-12 shadow-2xl shadow-black/50 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
          The Dungeon Awaits
        </h1>

        <div className="mb-8 flex justify-center items-center gap-6">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-amber-600"></div>
          <Castle
            className="w-8 h-8 text-amber-400 animate-pulse"
            style={{ animationDuration: "2s" }}
          />
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent"></div>
        </div>

        <p className="mb-10 text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
          Descend into ancient chambers filled with forgotten treasures, lurking
          monsters, and untold mysteries. Your adventure begins now, brave hero.
        </p>

        <button className="group relative bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 px-12 py-6 rounded-2xl font-bold text-2xl text-white shadow-lg shadow-green-900/50 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-green-800/70 cursor-pointer">
          <span className="relative z-10 flex items-center justify-center gap-4">
            <Scale className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
            <span>ENTER THE DUNGEON</span>
            <Shield className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300" />
          </span>

          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 to-green-400/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>

          <div
            className="absolute inset-0 border-2 border-emerald-400/50 rounded-2xl animate-pulse"
            style={{ animationDuration: "3s" }}
          ></div>
        </button>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <div className="text-xs text-amber-400">LEVEL</div>
            <div className="text-amber-200 font-bold">1</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <Heart className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <div className="text-xs text-amber-400">HEALTH</div>
            <div className="text-amber-200 font-bold">100</div>
          </div>
          <div className="bg-black/20 rounded-xl p-3 border border-amber-600/20">
            <Coins className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <div className="text-xs text-amber-400">GOLD</div>
            <div className="text-amber-200 font-bold">0</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-amber-300/70">
          Not your hero?{" "}
          <button
            className="text-amber-400 hover:text-amber-300 transition-colors duration-200 underline decoration-dotted underline-offset-4 cursor-pointer"
            onClick={handleLogout}
          >
            Return to character selection
          </button>
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 opacity-40">
        <Zap
          className="w-6 h-6 text-amber-400 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "0s" }}
        />
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <div className="text-amber-400 text-xs tracking-widest font-bold">
          LEGEND BEGINS
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        <Flame
          className="w-6 h-6 text-amber-400 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "1.5s" }}
        />
      </div>
    </main>
  );
}
