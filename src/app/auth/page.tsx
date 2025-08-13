"use client";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { classIconPath, raceIconPath } from "@/lib/pixelPaths";

const RACES = ["Human", "Elf", "Goblin", "Dwarf", "Orc"];
const CLASSES = ["Knight", "Mage", "Archer", "Rogue"] as const;

type FormState = {
  username: string;
  password: string;
  race: string;
  charClass: (typeof CLASSES)[number];
};

export default function AuthPage() {
  const signup = useAction(api.users.signupAction);
  const login = useAction(api.users.loginAction);
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    race: RACES[0],
    charClass: CLASSES[0],
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
        res = await signup({
          username: form.username,
          password: form.password,
          race: form.race,
          charClass: form.charClass,
        }) as { userId: string; token: string };
      } else {
        res = await login({ username: form.username, password: form.password }) as { userId: string; token: string };
      }
      localStorage.setItem(
        "dd_session",
        JSON.stringify({ userId: res.userId, token: res.token })
      );
      router.push("/play");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((err as any).message as string);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-12">
      {/* Decorative header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-500 to-amber-600"></div>
          <span className="text-3xl">🏰</span>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-transparent"></div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
          {mode === "signup" ? "Character Creation" : "Return to Adventure"}
        </h1>
      </div>
      
      <div className="w-full bg-gradient-to-b from-amber-900/20 to-orange-900/10 backdrop-blur-md border border-amber-600/30 rounded-3xl p-8 shadow-2xl shadow-black/50">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-amber-100">
            {mode === "signup" ? "Forge Your Legend" : "Welcome Back, Hero"}
          </h2>
          <button
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          >
            {mode === "signup" ? "Already have a hero? Sign in" : "New to the realm? Create character"}
          </button>
        </div>
        {error && (
          <div className="mb-6 rounded-xl bg-red-900/30 border border-red-600/50 p-4 text-red-200 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-amber-200">Hero Name</label>
              <input
                className="w-full rounded-xl border border-amber-600/30 bg-black/30 backdrop-blur-sm p-4 text-amber-100 placeholder-amber-400/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                placeholder="Enter your hero's name..."
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
                minLength={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-amber-200">Secret Passphrase</label>
              <input
                type="password"
                className="w-full rounded-xl border border-amber-600/30 bg-black/30 backdrop-blur-sm p-4 text-amber-100 placeholder-amber-400/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                placeholder="Enter your passphrase..."
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
              />
            </div>
          </div>
          {mode === "signup" && (
            <div className="bg-gradient-to-r from-amber-900/10 to-orange-900/10 rounded-2xl p-6 border border-amber-600/20">
              <h3 className="text-xl font-bold text-amber-200 mb-6 text-center">Choose Your Origin</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-amber-200">Race</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                        <div className="relative rounded-2xl border border-amber-600/40 bg-black/40 backdrop-blur-sm p-4">
                          <Image
                            src={raceIconPath(form.race)}
                            alt={form.race}
                            width={80}
                            height={80}
                            style={{ imageRendering: "pixelated" }}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <select
                      className="w-full rounded-xl border border-amber-600/30 bg-black/30 backdrop-blur-sm p-4 text-amber-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                      value={form.race}
                      onChange={(e) => setForm((f) => ({ ...f, race: e.target.value }))}
                    >
                      {RACES.map((r) => (
                        <option key={r} value={r} className="bg-slate-800 text-amber-100">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="mb-3 block text-sm font-semibold text-amber-200">Class</label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                        <div className="relative rounded-2xl border border-amber-600/40 bg-black/40 backdrop-blur-sm p-4">
                          <Image
                            src={classIconPath(form.charClass)}
                            alt={form.charClass}
                            width={80}
                            height={80}
                            style={{ imageRendering: "pixelated" }}
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <select
                      className="w-full rounded-xl border border-amber-600/30 bg-black/30 backdrop-blur-sm p-4 text-amber-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                      value={form.charClass}
                      onChange={(e) => setForm((f) => ({ ...f, charClass: e.target.value as (typeof CLASSES)[number] }))}
                    >
                      {CLASSES.map((c) => (
                        <option key={c} value={c} className="bg-slate-800 text-amber-100">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-orange-900/50 transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-orange-800/60 disabled:scale-100 disabled:hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Forging your legend...</span>
                </>
              ) : (
                <>
                  <span>{mode === "signup" ? "Create Hero" : "Enter Dungeon"}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                    {mode === "signup" ? "⚔️" : "🏰"}
                  </span>
                </>
              )}
            </span>
            
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
