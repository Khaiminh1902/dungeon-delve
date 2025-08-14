"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Coins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PlayerState {
  x: number;
  y: number;
  health: number;
  gold: number;
}

const GAME_BOUNDS = {
  minX: 120,
  maxX: 650,
  minY: 170,
  maxY: 400,
};

const PLAYER_SIZE = 48;
const MOVE_SPEED = 8;

export default function Floor1() {
  const router = useRouter();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [player, setPlayer] = useState<PlayerState>({
    x: 400,
    y: 300,
    health: 100,
    gold: 0,
  });

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (["w", "a", "s", "d"].includes(key)) {
      e.preventDefault();
      setKeys((prev) => new Set(prev).add(key));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setKeys((prev) => {
      const newKeys = new Set(prev);
      newKeys.delete(key);
      return newKeys;
    });
  }, []);

  // Game loop for player movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (keys.size > 0) {
        setPlayer((prev) => {
          let newX = prev.x;
          let newY = prev.y;

          if (keys.has("w")) newY -= MOVE_SPEED;
          if (keys.has("s")) newY += MOVE_SPEED;
          if (keys.has("a")) newX -= MOVE_SPEED;
          if (keys.has("d")) newX += MOVE_SPEED;

          // Keep player within bounds
          newX = Math.max(GAME_BOUNDS.minX, Math.min(GAME_BOUNDS.maxX, newX));
          newY = Math.max(GAME_BOUNDS.minY, Math.min(GAME_BOUNDS.maxY, newY));

          return { ...prev, x: newX, y: newY };
        });
      }
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [keys]);

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Check authentication
  useEffect(() => {
    const raw = localStorage.getItem("dd_session");
    if (!raw) {
      router.push("/auth");
      return;
    }

    try {
      const session = JSON.parse(raw);
      if (!session.userId || !session.token) {
        localStorage.removeItem("dd_session");
        router.push("/auth");
      }
    } catch {
      localStorage.removeItem("dd_session");
      router.push("/auth");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link
            href="/play"
            className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lobby</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg border border-red-600/30">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-red-200 font-bold">{player.health}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg border border-yellow-600/30">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-200 font-bold">{player.gold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="relative w-full h-screen"
        style={{
          backgroundImage: "url(/bg/floor1.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      >
        {/* Player Sprite */}
        <div
          className="absolute transition-none select-none pointer-events-none"
          style={{
            left: `${player.x}px`,
            top: `${player.y}px`,
            width: `${PLAYER_SIZE}px`,
            height: `${PLAYER_SIZE}px`,
            zIndex: 10,
          }}
        >
          <Image
            src="/pixel/races/axion.svg"
            alt="Player"
            className="w-full h-full"
            width={PLAYER_SIZE}
            height={PLAYER_SIZE}
            style={{
              imageRendering: "pixelated",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      </div>

      {/* Floor Title */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-transparent via-black/60 to-transparent px-8 py-2">
          <h1 className="text-2xl font-bold text-amber-200 text-center tracking-wide">
            DUNGEON FLOOR 1
          </h1>
        </div>
      </div>
    </main>
  );
}
