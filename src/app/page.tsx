import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative">
      {/* Decorative torches */}
      <div className="absolute top-16 left-8 w-6 h-16 bg-amber-600 rounded-sm opacity-80"></div>
      <div className="absolute top-12 left-10 w-8 h-8 bg-orange-500 rounded-full blur-sm animate-pulse" style={{ animationDuration: '2s' }}></div>
      <div className="absolute top-16 right-8 w-6 h-16 bg-amber-600 rounded-sm opacity-80"></div>
      <div className="absolute top-12 right-10 w-8 h-8 bg-orange-500 rounded-full blur-sm animate-pulse" style={{ animationDuration: '2.5s' }}></div>
      
      {/* Main content */}
      <div className="bg-gradient-to-b from-amber-900/30 to-orange-900/20 backdrop-blur-sm border border-amber-600/30 rounded-2xl p-12 shadow-2xl shadow-black/50 max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-b from-amber-200 to-orange-300 bg-clip-text text-transparent">
          Dungeon Delve
        </h1>
        
        <div className="mb-8 flex justify-center items-center gap-6">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          <div className="text-2xl">⚔️</div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
        
        <p className="mb-12 text-lg text-amber-100/90 max-w-xl mx-auto leading-relaxed">
          Forge your hero and descend into the depths. Create a character or sign in to continue your legendary adventure through ancient dungeons filled with treasure and peril.
        </p>
        
        <Link 
          href="/auth" 
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-orange-900/50 transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-orange-800/60"
        >
          <span className="relative z-10">Begin Your Quest</span>
          <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">⚡</span>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </Link>
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 opacity-60">
        <div className="w-8 h-8 border-2 border-amber-600 rounded rotate-45"></div>
        <div className="text-amber-400 text-sm tracking-widest">ADVENTURE AWAITS</div>
        <div className="w-8 h-8 border-2 border-amber-600 rounded rotate-45"></div>
      </div>
    </main>
  );
}
