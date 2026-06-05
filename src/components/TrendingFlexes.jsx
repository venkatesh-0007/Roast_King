import { motion } from "framer-motion";
import { TrendingUp, Flame, ThumbsUp, ArrowRight } from "lucide-react";
import { soundManager } from "../services/audio";

const TRENDING_LIST = [
  {
    text: "I built a SaaS app in 24 hours with AI",
    category: "coding",
    score: 87,
    votes: "4.2k",
    title: "AI Prompt Monkey"
  },
  {
    text: "I wake up at 4:30 AM to read self-help books",
    category: "fitness",
    score: 92,
    votes: "3.8k",
    title: "Sleep Deprivation Guru"
  },
  {
    text: "I have a 9.9 CGPA and study in my dreams",
    category: "academics",
    score: 95,
    votes: "2.9k",
    title: "Sentient Syllabus"
  },
  {
    text: "I spend $500/month on organic cold-pressed juices",
    category: "finance",
    score: 78,
    votes: "1.7k",
    title: "Liquid Asset Liquidation"
  }
];

export default function TrendingFlexes({ onSelectFlex }) {
  const handleTrendingClick = (text) => {
    soundManager.playClick();
    onSelectFlex(text);
    // Smooth scroll to top form
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const getScoreBadgeColor = (score) => {
    if (score < 50) return "text-cyan-400 border-cyan-500/20 bg-cyan-500/5";
    if (score < 80) return "text-orange-400 border-orange-500/20 bg-orange-500/5";
    return "text-purple-400 border-purple-500/20 bg-purple-500/5";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto px-4 mt-12 mb-16"
    >
      <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-display font-bold text-white tracking-wide">
          Trending Cosmic Flexes
        </h3>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase tracking-widest animate-pulse ml-2">
          Live Waves
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRENDING_LIST.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleTrendingClick(item.text)}
            className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group hover:bg-[#100a30]/60 hover:-translate-y-0.5 relative overflow-hidden"
          >
            {/* Subtle glow edge hover */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/40 transition-all duration-500" />

            <div className="flex justify-between items-start gap-4 mb-3">
              <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md capitalize font-medium">
                {item.category}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getScoreBadgeColor(item.score)}`}>
                  Burn: {item.score}%
                </span>
              </div>
            </div>

            <p className="text-slate-100 font-sans font-medium text-base mb-4 group-hover:text-purple-200 transition-colors">
              "{item.text}"
            </p>

            <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
                {item.votes} upvotes
              </span>
              <span className="text-purple-300 font-bold flex items-center gap-1 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                Try this brag
                <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
