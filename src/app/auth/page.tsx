"use client";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { characterIconPath } from "@/lib/pixelPaths";
import { Castle, Sword, Gamepad2, AlertTriangle } from "lucide-react";

const CHARACTERS = [
  {
    id: "char-1",
    name: "Zephyr",
    description: "Other-worldly warrior wielding a powerful axe",
  },
  {
    id: "char-2",
    name: "Korrath",
    description: "Battle-hardened champion from distant realms",
  },
  {
    id: "char-3",
    name: "Vex",
    description: "Ancient guardian with mystical combat prowess",
  },
  {
    id: "char-4",
    name: "Thane",
    description: "Legendary hero forged in cosmic fire",
  },
];

type FormState = {
  username: string;
  password: string;
  character: string;
  characterId: string;
};

export default function AuthPage() {
  const signup = useAction(api.users.signupAction);
  const login = useAction(api.users.loginAction);
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    character: CHARACTERS[0].name,
    characterId: CHARACTERS[0].id,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      let res: { userId: string; token: string };
      if (mode === "signup") {
        res = (await signup({
          username: form.username,
          password: form.password,
          character: form.character,
        })) as { userId: string; token: string };
      } else {
        res = (await login({
          username: form.username,
          password: form.password,
        })) as { userId: string; token: string };
      }
      localStorage.setItem(
        "dd_session",
        JSON.stringify({ userId: res.userId, token: res.token })
      );
      router.push("/play");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String((err as { message: unknown }).message));
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2"
      style={{
        backgroundImage: "url(/bg/dungeon2.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        imageRendering: "pixelated",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full mb-2 shadow-lg shadow-orange-900/50">
            <Castle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent mb-1">
            {mode === "signup" ? "Create Hero" : "Welcome Back"}
          </h1>
          <p className="text-amber-400/90 text-xs">
            {mode === "signup"
              ? "Begin your dungeon adventure"
              : "Continue your quest"}
          </p>
        </div>

        <div className="bg-gradient-to-b from-amber-900/20 to-orange-900/10 backdrop-blur-xl border border-amber-600/30 rounded-2xl p-4 shadow-2xl shadow-black/50">
          <div className="flex bg-black/20 rounded-lg p-1 mb-4">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                mode === "signup"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                  : "text-amber-400 hover:text-amber-300"
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                mode === "login"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                  : "text-amber-400 hover:text-amber-300"
              }`}
            >
              Sign In
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-300 mb-2">
                Hero Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/20 border border-amber-600/30 rounded-lg text-amber-50 placeholder-amber-400/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-200"
                placeholder="Enter your hero name"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-black/20 border border-amber-600/30 rounded-lg text-amber-50 placeholder-amber-400/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-200"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
                minLength={6}
              />
            </div>

            {mode === "signup" && (
              <div className="border-t border-amber-600/30 pt-4">
                <label className="block text-sm font-medium text-amber-300 mb-4">
                  Choose Your Character
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {CHARACTERS.map((character) => {
                    const isSelected = form.characterId === character.id;
                    return (
                      <button
                        key={character.id}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            character: character.name,
                            characterId: character.id,
                          }))
                        }
                        className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-amber-500 bg-gradient-to-br from-amber-600/20 to-orange-600/10 shadow-lg shadow-amber-500/20"
                            : "border-amber-600/30 bg-black/10 hover:border-amber-500/60 hover:bg-amber-600/5"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-lg blur-sm ${
                                isSelected
                                  ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30"
                                  : "bg-amber-500/10"
                              }`}
                            ></div>
                            <div className="relative p-2 bg-black/20 rounded-lg border border-amber-600/20">
                              <Image
                                src={characterIconPath(character.name)}
                                alt={character.name}
                                width={32}
                                height={32}
                                style={{ imageRendering: "pixelated" }}
                                className="mx-auto"
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className={`font-medium text-sm ${
                                isSelected ? "text-amber-200" : "text-amber-300"
                              }`}
                            >
                              {character.name}
                            </div>
                            <div
                              className={`text-xs leading-tight mt-1 ${
                                isSelected
                                  ? "text-amber-300/80"
                                  : "text-amber-400/60"
                              }`}
                            >
                              {character.description}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <div className="w-3 h-3 bg-amber-500 rounded-full border border-amber-400 shadow-sm"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-amber-800 disabled:to-orange-800 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-orange-900/50 hover:shadow-xl hover:shadow-orange-800/60 transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Hero...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === "signup" ? "Create Hero" : "Enter Game"}
                    </span>
                    {mode === "signup" ? (
                      <Sword className="w-4 h-4" />
                    ) : (
                      <Gamepad2 className="w-4 h-4" />
                    )}
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
