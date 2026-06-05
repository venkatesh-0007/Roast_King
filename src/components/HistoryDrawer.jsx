import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Calendar, Clipboard, Check, Star } from "lucide-react";
import { useState } from "react";
import { soundManager } from "../services/audio";

export default function HistoryDrawer({ isOpen, onClose, history, onClear }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopyHistoryItem = (item, idx) => {
    soundManager.playClick();
    const text = `👑 Roast King Starred Record 👑\nFlex: "${item.flexText}"\nResult: "${item.title}" (Score: ${item.score}/100)\n\nStarred Roast:\n"${item.roastText}"\n\nRoast your own ego at Roast King! 🌌`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getScoreBadgeColor = (score) => {
    if (score < 50) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    if (score < 80) return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  };

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          {/* Slide-out Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-drawer z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  Starred Burns
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Saved locally in your stellar cache
                </p>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans">
              {history.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                  <span className="text-4xl mb-3">🛸</span>
                  <p className="text-slate-400 font-medium">No starred roasts yet</p>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                    Submit your flex and click the Star icon on any roast card in the results panel to save it here!
                  </p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Corner gradient light */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none" />

                    <div className="flex justify-between items-start mb-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getScoreBadgeColor(item.score)}`}>
                        Score: {item.score}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-sans">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                        Your Flex:
                      </span>
                      <p className="text-sm font-semibold text-slate-100 italic">
                        "{item.flexText}"
                      </p>
                    </div>

                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-0.5">
                        Burn Title:
                      </span>
                      <p className="text-xs text-purple-300 font-display font-medium">
                        "{item.title}"
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-white/5 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
                        Starred Roast:
                      </span>
                      <p className="text-xs md:text-sm text-slate-200 italic leading-relaxed bg-black/40 p-2.5 rounded-lg border border-white/5">
                        "{item.roastText}"
                      </p>
                      
                      <div className="flex justify-end mt-1">
                        <button
                          onClick={() => handleCopyHistoryItem(item, idx)}
                          className="p-1 rounded bg-white/5 hover:bg-purple-500/10 border border-white/5 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
                          title="Copy record"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Clipboard className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Clear All Footer */}
            {history.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    if (confirm("Are you sure you want to clear all history records from this universe?")) {
                      onClear();
                    }
                  }}
                  className="w-full py-3 rounded-xl border border-rose-500/20 hover:border-rose-500 bg-rose-950/20 hover:bg-rose-600 hover:text-white text-rose-400 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Space Records
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
