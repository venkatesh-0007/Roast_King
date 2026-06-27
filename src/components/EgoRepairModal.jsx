import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, Target, RefreshCw, Award, Volume2 } from "lucide-react";
import { soundManager } from "../services/audio";

const ZOOM_STEPS = [
  { val: 0, label: "Your House 🏠", desc: "Your brag feels massive. You are the king of this room.", scoreMult: 1.0 },
  { val: 20, label: "Your City 🏙️", desc: "A few million people here. Honestly, they have other things to worry about.", scoreMult: 0.7 },
  { val: 40, label: "Planet Earth 🌎", desc: "8 billion humans. You are 1 of them. In 100 years, none of you will be here.", scoreMult: 0.4 },
  { val: 60, label: "Solar System ☀️", desc: "Earth is a pale blue dot. The Sun doesn't care about your streak.", scoreMult: 0.15 },
  { val: 80, label: "Milky Way Galaxy 🌌", desc: "100 billion stars. Your flex is just a fraction of a light-second.", scoreMult: 0.02 },
  { val: 100, label: "Observable Universe ♾️", desc: "93 billion light-years of void. Your existence is rounded to zero.", scoreMult: 0.000000001 }
];

export default function EgoRepairModal({ isOpen, onClose, originalScore, originalDelusion }) {
  const [activeTab, setActiveTab] = useState("zoom");
  const [zoomVal, setZoomVal] = useState(0);

  // Popper mini-game states
  const [bubbles, setBubbles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [humbledScore, setHumbledScore] = useState(originalScore);
  const containerRef = useRef(null);
  const requestRef = useRef(null);

  // Initialize bubbles
  const bubbleLabels = ["My GPA", "My Likes", "My Code", "My Pride", "My Gym Streak", "My Bank Account"];
  
  const initBubbles = () => {
    const newBubbles = bubbleLabels.map((lbl, idx) => ({
      id: idx,
      label: lbl,
      x: 10 + Math.random() * 80, // % width
      y: 10 + Math.random() * 80, // % height
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 40 + Math.random() * 20, // px
      popped: false
    }));
    setBubbles(newBubbles);
    setPoppedCount(0);
    setHumbledScore(originalScore);
  };

  // Simple bounding box physics for bubbles
  useEffect(() => {
    if (activeTab !== "popper" || bubbles.length === 0) return;

    const updatePhysics = () => {
      setBubbles((prevBubbles) => {
        return prevBubbles.map((b) => {
          if (b.popped) return b;
          
          let newX = b.x + b.vx;
          let newY = b.y + b.vy;
          let newVx = b.vx;
          let newVy = b.vy;

          // Bounce off virtual 100% boundaries
          if (newX <= 5 || newX >= 95) {
            newVx = -b.vx;
            newX = newX <= 5 ? 5 : 95;
          }
          if (newY <= 5 || newY >= 95) {
            newVy = -b.vy;
            newY = newY <= 5 ? 5 : 95;
          }

          return { ...b, x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });
      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, [activeTab, bubbles.length]);

  const handlePop = (id) => {
    soundManager.playPopSound();
    
    setBubbles((prev) => 
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setPoppedCount((prev) => {
      const next = prev + 1;
      // Drop the score as bubbles are popped
      const remainingPct = (bubbleLabels.length - next) / bubbleLabels.length;
      setHumbledScore(Math.max(1, Math.floor(originalScore * remainingPct)));
      return next;
    });
  };

  // Find active zoom step
  const activeZoom = ZOOM_STEPS.reduce((prev, curr) => {
    return Math.abs(curr.val - zoomVal) < Math.abs(prev.val - zoomVal) ? curr : prev;
  });

  const currentZoomScore = Math.max(
    0.000000001,
    (originalScore * activeZoom.scoreMult)
  );

  const formatScore = (val) => {
    if (val < 0.001) return val.toFixed(9);
    return val.toFixed(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#030014]/85 backdrop-blur-md pointer-events-auto"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 text-left"
      >
        {/* Glowing border top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/20 via-cyan-500/40 to-purple-500/20" />

        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌌</span>
            <h3 className="text-lg font-display font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300">
              Ego Repair Protocol
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 bg-black/20">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab("zoom");
            }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === "zoom"
                ? "border-cyan-400 text-cyan-300 bg-white/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <ZoomIn className="w-4 h-4" />
            Cosmic Zoom Scale
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab("popper");
              initBubbles();
            }}
            className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === "popper"
                ? "border-purple-400 text-purple-300 bg-white/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Target className="w-4 h-4" />
            Pride bubble popper
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 min-h-[300px] flex flex-col justify-between">
          
          {activeTab === "zoom" && (
            <div className="flex flex-col gap-6">
              <div className="text-center bg-black/40 rounded-2xl p-4 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-1">
                  Adjust Space Scale:
                </span>
                <span className="text-xl font-display font-black text-cyan-300">
                  {activeZoom.label}
                </span>
                <p className="text-xs text-slate-400 mt-2 min-h-[32px]">
                  {activeZoom.desc}
                </p>
              </div>

              {/* Slider */}
              <div className="relative mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="20"
                  value={zoomVal}
                  onChange={(e) => {
                    soundManager.playClick();
                    setZoomVal(parseInt(e.target.value));
                  }}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-2 px-1">
                  <span>House</span>
                  <span>City</span>
                  <span>Earth</span>
                  <span>Sun</span>
                  <span>Milky Way</span>
                  <span>Universe</span>
                </div>
              </div>

              {/* Dynamic Score feedback */}
              <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-cyan-950/10 via-purple-950/20 to-cyan-950/10 p-5 rounded-2xl border border-white/5 text-center">
                <div className="flex-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                    Cosmic Perceived Ego
                  </div>
                  <div className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    {formatScore(currentZoomScore)}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                    Original Score: {originalScore} / 100
                  </div>
                </div>

                <div className="h-10 w-[1px] bg-white/10" />

                <div className="flex-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                    Delusion Level
                  </div>
                  <div className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    {(originalDelusion * activeZoom.scoreMult).toFixed(1)}%
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                    Original: {originalDelusion}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "popper" && (
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-slate-400 flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/5">
                <span>Bubbles Popped: <strong className="text-purple-300">{poppedCount} / {bubbleLabels.length}</strong></span>
                <span>Perceived Ego: <strong className="text-purple-300 font-mono">{humbledScore}</strong></span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    initBubbles();
                  }}
                  className="p-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Respawn pride"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Popper Box */}
              <div
                ref={containerRef}
                className="w-full h-52 bg-black/40 rounded-2xl relative border border-white/10 overflow-hidden select-none pointer-events-auto"
              >
                <AnimatePresence>
                  {bubbles.map((b) => {
                    if (b.popped) return null;
                    return (
                      <motion.button
                        key={b.id}
                        type="button"
                        onClick={() => handlePop(b.id)}
                        className="absolute cursor-pointer flex items-center justify-center rounded-full border border-purple-500/35 bg-purple-500/10 hover:bg-purple-400/20 text-purple-200 text-[10px] font-bold p-1 shadow-[0_0_10px_rgba(168,85,247,0.15)] leading-tight active:scale-95"
                        style={{
                          left: `${b.x}%`,
                          top: `${b.y}%`,
                          width: `${b.radius}px`,
                          height: `${b.radius}px`,
                          transform: "translate(-50%, -50%)"
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ 
                          scale: 1.6, 
                          opacity: 0,
                          transition: { duration: 0.15 }
                        }}
                      >
                        <span className="pointer-events-none select-none text-center px-1 truncate w-full">
                          {b.label.split(" ")[1] || b.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>

                {poppedCount === bubbleLabels.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4"
                  >
                    <Award className="w-8 h-8 text-yellow-400 fill-yellow-400 mb-2 animate-bounce" />
                    <h5 className="text-sm font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                      Pride Completely Deflated!
                    </h5>
                    <p className="text-[10px] text-slate-400 max-w-[280px] mt-1.5">
                      You popped your pride, GPA, code, and cash. You have achieved a healthy baseline state of insignificance.
                    </p>
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        initBubbles();
                      }}
                      className="mt-3.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-300 border border-purple-500/30 bg-purple-950/20 px-3 py-1.5 rounded-full hover:bg-purple-500/20 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reflate Ego
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="mt-6 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-cyan-500" />
              Interactive audio synthesizers enabled
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/10 cursor-pointer border border-purple-500/20"
            >
              Back to Roast
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
