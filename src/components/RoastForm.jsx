import { motion } from "framer-motion";
import { Sparkles, Flame, Orbit, Zap, Shuffle, Bot } from "lucide-react";
import { useState } from "react";
import { EXAMPLE_FLEXES, ROASTER_PERSONAS } from "../services/roastEngine";
import { soundManager } from "../services/audio";

export default function RoastForm({ onSubmit, loading, intensity, setIntensity, persona, setPersona }) {
  const [flexText, setFlexText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!flexText.trim() || loading) return;
    
    // Play sound effects
    soundManager.playClick();
    soundManager.playWarp();
    
    onSubmit(flexText);
  };

  const handleExampleClick = (text) => {
    soundManager.playClick();
    setFlexText(text);
  };

  const handleRandomFlex = () => {
    soundManager.playClick();
    const randomIndex = Math.floor(Math.random() * EXAMPLE_FLEXES.length);
    setFlexText(EXAMPLE_FLEXES[randomIndex].text);
  };

  const handleIntensityChange = (level) => {
    soundManager.playClick();
    setIntensity(level);
  };

  const handlePersonaSelect = (pId) => {
    const pData = ROASTER_PERSONAS[pId];
    if (pData && soundManager[pData.sound]) {
      soundManager[pData.sound]();
    } else {
      soundManager.playClick();
    }
    setPersona(pId);
  };

  const intensities = [
    { id: "gentle", label: "Gentle Orbit 🌎", color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40" },
    { id: "meteor", label: "Meteor Strike ☄️", color: "border-rose-500/30 text-rose-400 bg-rose-950/20 hover:bg-rose-950/40" },
    { id: "black_hole", label: "Black Hole 🌌", color: "border-purple-500/30 text-purple-400 bg-purple-950/20 hover:bg-purple-950/40" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto px-4 z-10"
    >
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl border border-white/10">
        {/* Subtle top light bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/40 to-cyan-500/20" />

        {/* 1. Roaster Persona Selection Panel */}
        <div className="mb-8 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-4 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            Choose Your Cosmic Roaster Persona:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.values(ROASTER_PERSONAS).map((p) => {
              const isSelected = persona === p.id;
              const pTheme = isSelected ? p.themeGradients[0] : "rgba(255, 255, 255, 0.08)";
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => handlePersonaSelect(p.id)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-300 cursor-pointer text-center h-[115px] ${
                    isSelected 
                      ? "bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      : "bg-black/30 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
                  }`}
                  style={{
                    borderColor: isSelected ? pTheme : "rgba(255, 255, 255, 0.08)",
                    boxShadow: isSelected ? `0 0 15px ${p.glowColor}` : ""
                  }}
                  title={p.description}
                  disabled={loading}
                >
                  <span className="text-3.5xl mb-1.5 block select-none">{p.emoji}</span>
                  <div className="flex-1 flex flex-col justify-end">
                    <span className={`text-[11px] font-mono tracking-tight ${isSelected ? "text-white font-bold" : "text-slate-400"}`}>
                      {p.name}
                    </span>
                    <span className="text-[8px] text-slate-500 block leading-tight mt-0.5 line-clamp-2 px-0.5">
                      {p.description.split(".")[0]}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 2. Flex Input Box */}
        <div className="flex justify-between items-center mb-5">
          <label className="text-lg md:text-xl font-display font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            What are you proud of?
          </label>

          <button
            type="button"
            onClick={handleRandomFlex}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-purple-500/30 text-purple-300 bg-purple-950/20 hover:bg-purple-500/20 transition-all duration-300 glass-panel-hover"
            title="Inject random brag"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Random Flex
          </button>
        </div>

        <div className="relative mb-6">
          <textarea
            value={flexText}
            onChange={(e) => setFlexText(e.target.value)}
            placeholder={`Type your brag... (e.g., 'I closed a $10,000 client', 'I code in 5 languages')`}
            className="w-full h-28 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 font-sans resize-none text-base"
            maxLength={180}
            required
            disabled={loading}
          />
          <div className="absolute bottom-3 right-4 text-xs text-slate-500">
            {flexText.length}/180
          </div>
        </div>

        {/* Examples section */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5 text-left">
            Or tap an example:
          </span>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_FLEXES.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(example.text)}
                className="px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 text-slate-300 text-xs transition-all duration-300 cursor-pointer"
                disabled={loading}
              >
                {example.text}
              </button>
            ))}
          </div>
        </div>

        {/* Roast Intensity Picker */}
        <div className="mb-8 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            Choose Roast Gravity level:
          </span>
          <div className="grid grid-cols-3 gap-3">
            {intensities.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleIntensityChange(item.id)}
                className={`py-3 px-2 md:px-4 rounded-xl border text-center transition-all duration-300 text-sm font-semibold cursor-pointer ${
                  intensity === item.id
                    ? "border-purple-500 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.25)] scale-[1.02]"
                    : item.color
                }`}
                disabled={loading}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Action Button */}
        <motion.button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-display font-bold text-base shadow-lg relative overflow-hidden transition-all duration-500 group focus:outline-none cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={loading || !flexText.trim()}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -inset-y-0 -inset-x-12 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-0 group-hover:translate-x-[600px] transition-transform duration-1000 ease-out" />
          
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Orbit className="w-5 h-5 animate-spin" />
                Pulling Flex to Earth...
              </>
            ) : (
              <>
                {intensity === "gentle" && <Orbit className="w-5 h-5 text-cyan-300" />}
                {intensity === "meteor" && <Flame className="w-5 h-5 text-rose-300 animate-bounce" />}
                {intensity === "black_hole" && <Zap className="w-5 h-5 text-yellow-300" />}
                Roast My Flex
              </>
            )}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}
