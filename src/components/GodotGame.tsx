"use client";

import { useEffect, useRef, useState } from "react";

interface GodotGameProps {
  gamePath: string;
  width?: number;
  height?: number;
  onReady?: () => void;
  onGameData?: (data: any) => void;
}

export default function GodotGame({ 
  gamePath, 
  width = 800, 
  height = 600,
  onReady,
  onGameData 
}: GodotGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<any>(null);

  useEffect(() => {
    let engine: any = null;

    const loadGodotGame = async () => {
      try {
        // Load Godot engine
        const script = document.createElement('script');
        script.src = `${gamePath}/dungeon-floor1.js`;
        script.onload = async () => {
          // Initialize Godot engine
          const Engine = (window as any).Engine;
          
          if (!Engine) {
            throw new Error('Godot Engine failed to load');
          }

          engine = new Engine({
            canvas: canvasRef.current,
            executable: `${gamePath}/dungeon-floor1.wasm`,
            mainPack: `${gamePath}/dungeon-floor1.pck`,
          });

          // Start the engine
          await engine.startGame();
          
          engineRef.current = engine;
          setIsLoading(false);
          onReady?.();

          // Setup communication between Godot and Next.js
          setupGodotCommunication(engine);
        };

        script.onerror = () => {
          setError('Failed to load Godot game files');
          setIsLoading(false);
        };

        document.head.appendChild(script);

        return () => {
          if (engine) {
            engine.requestQuit();
          }
          document.head.removeChild(script);
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    loadGodotGame();
  }, [gamePath, onReady]);

  const setupGodotCommunication = (engine: any) => {
    // Listen for messages from Godot
    (window as any).godotMessageHandler = (message: string) => {
      try {
        const data = JSON.parse(message);
        onGameData?.(data);
        
        // Handle specific game events
        switch (data.type) {
          case 'player_position':
            console.log('Player moved to:', data.position);
            break;
          case 'player_health':
            console.log('Player health:', data.health);
            break;
          case 'level_complete':
            console.log('Level completed!');
            break;
        }
      } catch (err) {
        console.error('Failed to parse Godot message:', err);
      }
    };
  };

  const sendToGodot = (message: any) => {
    if (engineRef.current) {
      const messageStr = JSON.stringify(message);
      // Call Godot function (you'll need to expose this in your Godot script)
      (window as any).godot_js_call?.('receive_message', messageStr);
    }
  };

  // Expose sendToGodot for parent components
  useEffect(() => {
    (window as any).sendToGodot = sendToGodot;
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-900/20 border border-red-600/30 rounded-lg">
        <div className="text-center">
          <h3 className="text-red-400 font-bold mb-2">Game Loading Error</h3>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-amber-200">Loading Dungeon...</p>
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block border border-amber-600/30 rounded-lg"
        style={{ 
          imageRendering: "pixelated",
          background: "#1a1a1a"
        }}
      />
    </div>
  );
}
