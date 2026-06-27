import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw, Star, Activity } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "../services/audio";
import { ROASTER_PERSONAS } from "../services/roastEngine";

export default function RoastResults({ result, onReset, onStarRoast, starredList = [], onOpenEgoRepair }) {
  const { score, title, roasts, intensity, category, persona = "oracle", telemetry } = result;
  const [displayedScore, setDisplayedScore] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Fallback telemetry if not generated (e.g. from old localstorage items)
  const finalTelemetry = telemetry || {
    delusionIndex: Math.floor(score * 0.8),
    egoMass: (score * 0.05).toFixed(1) + " M☉",
    gravityPull: score >= 80 ? "Supermassive (Event Horizon)" : score >= 50 ? "High (Neutron Star)" : "Moderate (Earth-like)",
    charismaDeficit: score >= 80 ? "Ego Collapse Imminent (99.9%)" : score >= 50 ? "Highly Insufferable (82%)" : "Slightly awkward"
  };

  const pData = ROASTER_PERSONAS[persona] || ROASTER_PERSONAS.oracle;

  // Animate the score counting up
  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = score / (duration / 16); // ~60fps
    
    // Play success/explosion audio depending on gravity
    if (score >= 80) {
      soundManager.playExplosion();
    } else {
      soundManager.playSuccess();
    }

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        clearInterval(timer);
        setDisplayedScore(score);
        
        // Trigger confetti for high scores!
        if (score >= 80) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: pData.themeGradients
          });
        }
      } else {
        setDisplayedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score, persona, pData.themeGradients]);

  // Copy all roasts to clipboard
  const handleCopyAll = () => {
    soundManager.playClick();
    const fullText = `👑 Roast King ("AntiGravity") Result 👑\n\nPersona: ${pData.name}\nTitle: "${title}"\nScore: ${score}/100\n\nRoasts:\n${roasts.map((r, i) => `${i + 1}. ${r}`).join("\n")}\n\nRoast your own ego at Roast King! 🌌`;
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Copy single roast to clipboard
  const handleCopySingle = (text, idx) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Share roast on Twitter/X
  const handleShareTwitter = () => {
    soundManager.playClick();
    const text = `I just got roasted by ${pData.name} on Roast King!\n\nTitle: "${title}"\nScore: ${score}/100 💀\n\n"${roasts[0]}"\n\nRoast your own flex here:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  // Determine score color theme
  const getScoreColor = () => {
    if (score < 50) return "text-cyan-400 stroke-cyan-400 shadow-cyan-500/20";
    if (score < 80) return "text-orange-400 stroke-orange-400 shadow-orange-500/20";
    return "text-purple-400 stroke-purple-400 shadow-purple-500/30";
  };

  // Gauge circular math
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference;

  // Stagger configurations for items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto px-4 z-10 my-8"
    >
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow rings in background */}
        <div 
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-500" 
          style={{ backgroundColor: pData.glowColor }}
        />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Score Dial and Title Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 pb-6 border-b border-white/10 mb-6">
          
          {/* Custom Glowing Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="circle-bg"
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="8"
              />
              <circle
                className={`circle-progress ${getScoreColor()}`}
                cx="72"
                cy="72"
                r={radius}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4.5xl font-mono font-bold tracking-tight ${getScoreColor()}`}>
                {displayedScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">
                Ego Score
              </span>
            </div>
          </div>

          {/* Title and stats description */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/5 border border-white/10 text-slate-300">
                {pData.emoji} {pData.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {intensity === "gentle" ? "🌎 Gentle Orbit" : intensity === "meteor" ? "☄️ Meteor Strike" : "🌌 Black Hole Severity"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 mb-1.5 leading-tight">
              "{title}"
            </h2>
            <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              Category: <span className="text-slate-300 font-semibold capitalize">{category}</span>
            </p>
          </div>
        </div>

        {/* 1. New Advanced Telemetry Panel */}
        <div className="bg-black/30 rounded-2xl p-4 border border-white/5 mb-6 text-left relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            Ego Telemetry Diagnostics:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Delusion Index</span>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ 
                    width: `${finalTelemetry.delusionIndex}%`,
                    background: `linear-gradient(90deg, ${pData.themeGradients[0]}, ${pData.themeGradients[1] || pData.themeGradients[0]})`
                  }} 
                />
              </div>
              <span className="text-slate-200 font-mono text-[11px] mt-1 block">{finalTelemetry.delusionIndex}%</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Ego Mass</span>
              <span className="text-slate-200 font-mono text-sm font-bold block mt-0.5">{finalTelemetry.egoMass}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Gravity Pull</span>
              <span className="text-slate-200 text-xs font-semibold block mt-0.5 leading-tight">{finalTelemetry.gravityPull}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Charisma Deficit</span>
              <span className="text-slate-200 text-xs font-semibold block mt-0.5 leading-tight">{finalTelemetry.charismaDeficit}</span>
            </div>
          </div>
        </div>

        {/* The 5 Roast Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3 mb-6"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-left mb-2">
            Persona Roasting Analysis Report:
          </span>

          {roasts.map((roast, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex justify-between items-center gap-4 p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <span className="text-purple-400 font-mono font-bold text-base mt-0.5 select-none">
                  #{idx + 1}
                </span>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                  {roast}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onStarRoast(result.flexText, roast, result.title, result.score);
                  }}
                  className={`p-1.5 rounded-lg border transition-all duration-250 cursor-pointer ${
                    starredList.some(
                      (item) => item.flexText === result.flexText && item.roastText === roast
                    )
                      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                      : "border-white/5 bg-white/5 text-slate-400 hover:text-yellow-400 hover:border-yellow-500/30"
                  }`}
                  title="Star and save to history"
                >
                  <Star
                    className={`w-4 h-4 ${
                      starredList.some(
                        (item) => item.flexText === result.flexText && item.roastText === roast
                      )
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopySingle(roast, idx)}
                  className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/20 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer"
                  title="Copy roast"
                >
                  {copiedIdx === idx ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2. New Ego Repair Protocol Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenEgoRepair();
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-purple-500/40 bg-purple-950/20 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 text-sm font-bold shadow-lg shadow-purple-950/30 transition-all duration-300 cursor-pointer mb-5"
        >
          <span>🌌</span>
          Initiate Ego Repair Protocol (Deflate Ego)
        </button>

        {/* Actions panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                Copied Report!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy All
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShareTwitter}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-sky-500/20 bg-sky-950/20 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share Flex
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onReset();
            }}
            className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-600/20 transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            Roast Again
          </button>
        </div>
      </div>
    </motion.div>
  );
}
