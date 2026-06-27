import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, History, Orbit } from "lucide-react";
import CosmicBackground from "./components/CosmicBackground";
import InteractivePlanet from "./components/InteractivePlanet";
import RoastForm from "./components/RoastForm";
import RoastResults from "./components/RoastResults";
import HistoryDrawer from "./components/HistoryDrawer";
import EgoRepairModal from "./components/EgoRepairModal";
import { generateRoast, ROASTER_PERSONAS } from "./services/roastEngine";
import { soundManager } from "./services/audio";

const LOADING_MESSAGES = [
  "Calculating gravitational pull around your ego...",
  "Warping spacetime coordinates...",
  "Charging meteor fire containment...",
  "Measuring atmospheric density of your accomplishment...",
  "Consulting the galactic high council of burns...",
  "Initiating anti-gravity stabilizers..."
];

export default function App() {
  const [intensity, setIntensity] = useState("gentle");
  const [persona, setPersona] = useState("oracle");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("roast_history");
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    return [];
  });
  const [historyOpen, setHistoryOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem("roast_muted");
    if (savedMuted === "true") {
      // Avoid toggling again if already muted
      if (!soundManager.getIsMuted()) {
        soundManager.toggleMute();
      }
      return true;
    }
    return false;
  });
  const [warpFlash, setWarpFlash] = useState(false);
  const [egoRepairOpen, setEgoRepairOpen] = useState(false);
  
  const formRef = useRef(null);
  const isFirstRender = useRef(true);

  // Update loading message loop
  useEffect(() => {
    let interval;
    if (loading) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[idx]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Trigger hyperspace warp animation & sound effects on mode switch
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    setWarpFlash(true);
    const timer = setTimeout(() => setWarpFlash(false), 700);

    // Play intensity-specific synthesizer hums if persona sound didn't override it
    if (intensity === "gentle") {
      soundManager.playClick();
    } else if (intensity === "meteor") {
      soundManager.playSuccess();
    } else if (intensity === "black_hole") {
      soundManager.playWarp();
    }

    return () => clearTimeout(timer);
  }, [intensity]);

  const handleMuteToggle = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    localStorage.setItem("roast_muted", nextMuted.toString());
  };

  const handleRoastSubmit = (flexText) => {
    setLoading(true);
    
    // Simulate API call and gravity warp delay
    setTimeout(() => {
      const roastData = generateRoast(flexText, intensity, persona);
      const newRecord = {
        ...roastData,
        flexText,
        timestamp: Date.now()
      };
      
      setResult(newRecord);
      setLoading(false);

      // Scroll smoothly to results
      setTimeout(() => {
        window.scrollTo({ top: 380, behavior: "smooth" });
      }, 100);
    }, 2500);
  };

  const handleStarRoast = (flexText, roastText, title, score) => {
    // Check if we already have this roast starred in history to prevent duplicates
    const isAlreadyStarred = history.some(
      (item) => item.flexText === flexText && item.roastText === roastText
    );
    if (isAlreadyStarred) return;

    const newStarredRecord = {
      flexText,
      roastText,
      title,
      score,
      persona,
      timestamp: Date.now()
    };

    const updatedHistory = [newStarredRecord, ...history].slice(0, 50); // Cap history at 50 starred items
    setHistory(updatedHistory);
    localStorage.setItem("roast_history", JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("roast_history");
    setHistoryOpen(false);
  };

  const activePersonaObj = ROASTER_PERSONAS[persona] || ROASTER_PERSONAS.oracle;

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-100 select-none pb-12">
      {/* Background stars canvas */}
      <CosmicBackground intensity={loading ? "black_hole" : intensity} />

      {/* Hyperspace Warp Shockwave Overlay */}
      <AnimatePresence>
        {warpFlash && (
          <motion.div
            key={intensity}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${activePersonaObj.glowColor} 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Header */}
      <div className="sticky top-4 w-full max-w-5xl mx-auto px-4 z-40">
        <header className="px-6 py-4 flex items-center justify-between liquid-glass-nav rounded-2xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setResult(null)}>
            <Orbit className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <span className="text-lg font-display font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200">
              ROAST KING
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio toggle button */}
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
              title={isMuted ? "Unmute cosmic vibes" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            </button>

            {/* History button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setHistoryOpen(true);
              }}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer relative"
              title="Brag log history"
            >
              <History className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#08051a]">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Hero Landing Section */}
      <main className="flex-1 flex flex-col justify-start items-center relative z-25">
        <section className="text-center pt-10 md:pt-14 pb-6 px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-cyan-500/15 text-purple-300 border border-purple-500/20 mb-5 inline-block">
              🚀 Version 1.1 Live
            </span>
            <h1 className="text-4.5xl md:text-6.5xl font-display font-black tracking-tight leading-none mb-4">
              <span className="text-white">Roast </span>
              <span className="text-gradient-cosmic">King</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 font-medium max-w-xl mx-auto mb-6">
              Got a big ego? We'll bring it back to Earth. Because in the grand scheme of the universe, you're still a nobody.
            </p>
          </motion.div>

          {/* Large Floating Interactive Planet Illustration */}
          <div className="my-2 md:my-4 animate-float">
            <InteractivePlanet intensity={loading ? "black_hole" : intensity} persona={persona} />
          </div>

          {/* Quick jump anchor if results aren't open */}
          {!result && !loading && (
            <motion.button
              onClick={() => {
                soundManager.playClick();
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 mx-auto bg-cyan-950/20 hover:bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/15 cursor-pointer mt-4"
            >
              Roast My Flex
              <span className="text-sm font-sans">👇</span>
            </motion.button>
          )}
        </section>

        {/* Anchor point for form / results scroll */}
        <div ref={formRef} className="w-full relative min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {loading ? (
              // Cosmic spacetime loading state
              <motion.div
                key="loading-tunnel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center max-w-md p-8 text-center glass-panel rounded-3xl border border-white/5 my-8 mx-4 w-full"
              >
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                  <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin" />
                  <div className="w-8 h-8 bg-[#030014] rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-ping" />
                </div>
                <h4 className="text-lg font-display font-bold text-white mb-2">Analyzing Gravity Wave</h4>
                <p className="text-sm text-slate-400 italic transition-all duration-500">
                  "{loadingMsg}"
                </p>
              </motion.div>
            ) : result ? (
              // Display roast metrics results dashboard
              <RoastResults
                key="results-panel"
                result={result}
                onReset={() => setResult(null)}
                onStarRoast={handleStarRoast}
                starredList={history}
                onOpenEgoRepair={() => setEgoRepairOpen(true)}
              />
            ) : (
              // Form to type brag inputs
              <RoastForm
                key="form-panel"
                onSubmit={handleRoastSubmit}
                loading={loading}
                intensity={intensity}
                setIntensity={setIntensity}
                persona={persona}
                setPersona={setPersona}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Slideout history log */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClear={handleClearHistory}
      />

      {/* Ego Repair Protocol Modal */}
      <AnimatePresence>
        {egoRepairOpen && (
          <EgoRepairModal
            isOpen={egoRepairOpen}
            onClose={() => setEgoRepairOpen(false)}
            originalScore={result?.score || 0}
            originalDelusion={result?.telemetry?.delusionIndex || 0}
          />
        )}
      </AnimatePresence>

      {/* Footer credits */}
      <footer className="w-full text-center text-xs text-slate-600 mt-16 px-4 relative z-30 font-sans">
        <p className="flex items-center justify-center gap-1.5">
          <span>🌌</span>
          Built with React 19 + Framer Motion + Tailwind CSS. No cookies or gravity fields were harmed in the making.
        </p>
      </footer>
    </div>
  );
}
