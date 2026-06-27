import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PERSONA_THEMES = {
  oracle: {
    primaryGrad: ["#22d3ee", "#06b6d4", "#0891b2", "#0f172a"],
    meteorGrad: ["#ff007f", "#c026d3", "#4c0519", "#030014"],
    singularityGrad: ["#000000", "#02000c", "#581c87", "#a855f7", "#22d3ee"],
    glowColor: "rgba(6, 182, 212, 0.55)",
    glowMeteor: "rgba(236, 72, 153, 0.75)",
    glowBlackHole: "rgba(168, 85, 247, 0.95)",
    gridColor: "rgba(6, 182, 212, 0.10)",
    gridMeteor: "rgba(236, 72, 153, 0.12)",
    gridBlackHole: "rgba(168, 85, 247, 0.22)",
    accretionGrad: ["#a855f7", "#22d3ee"],
    ringColors: ["rgba(6, 182, 212, 0.85)", "rgba(168, 85, 247, 0.45)"]
  },
  brainrot: {
    primaryGrad: ["#a3e635", "#84cc16", "#65a30d", "#064e3b"],
    meteorGrad: ["#10b981", "#047857", "#064e3b", "#022c22"],
    singularityGrad: ["#000000", "#022c22", "#065f46", "#10b981", "#a3e635"],
    glowColor: "rgba(132, 204, 22, 0.55)",
    glowMeteor: "rgba(16, 185, 129, 0.75)",
    glowBlackHole: "rgba(52, 211, 153, 0.95)",
    gridColor: "rgba(132, 204, 22, 0.10)",
    gridMeteor: "rgba(16, 185, 129, 0.12)",
    gridBlackHole: "rgba(52, 211, 153, 0.22)",
    accretionGrad: ["#10b981", "#a3e635"],
    ringColors: ["rgba(132, 204, 22, 0.85)", "rgba(16, 185, 129, 0.45)"]
  },
  gordon: {
    primaryGrad: ["#fca5a5", "#ef4444", "#dc2626", "#450a0a"],
    meteorGrad: ["#f97316", "#ea580c", "#7c2d12", "#0f0502"],
    singularityGrad: ["#000000", "#1c0303", "#7f1d1d", "#ef4444", "#ea580c"],
    glowColor: "rgba(239, 68, 68, 0.55)",
    glowMeteor: "rgba(249, 115, 22, 0.75)",
    glowBlackHole: "rgba(220, 38, 38, 0.95)",
    gridColor: "rgba(239, 68, 68, 0.10)",
    gridMeteor: "rgba(249, 115, 22, 0.12)",
    gridBlackHole: "rgba(220, 38, 38, 0.22)",
    accretionGrad: ["#ef4444", "#f97316"],
    ringColors: ["rgba(239, 68, 68, 0.85)", "rgba(249, 115, 22, 0.45)"]
  },
  zorg: {
    primaryGrad: ["#fde047", "#f59e0b", "#d97706", "#451a03"],
    meteorGrad: ["#ec4899", "#db2777", "#831843", "#1f030f"],
    singularityGrad: ["#000000", "#1c0f02", "#b45309", "#ec4899", "#fde047"],
    glowColor: "rgba(245, 158, 11, 0.55)",
    glowMeteor: "rgba(236, 72, 153, 0.75)",
    glowBlackHole: "rgba(217, 70, 239, 0.95)",
    gridColor: "rgba(245, 158, 11, 0.10)",
    gridMeteor: "rgba(236, 72, 153, 0.12)",
    gridBlackHole: "rgba(217, 70, 239, 0.22)",
    accretionGrad: ["#ec4899", "#f59e0b"],
    ringColors: ["rgba(245, 158, 11, 0.85)", "rgba(236, 72, 153, 0.45)"]
  },
  void: {
    primaryGrad: ["#cbd5e1", "#94a3b8", "#64748b", "#1e293b"],
    meteorGrad: ["#475569", "#334155", "#1e293b", "#020617"],
    singularityGrad: ["#000000", "#090d16", "#1e293b", "#64748b", "#cbd5e1"],
    glowColor: "rgba(100, 116, 139, 0.35)",
    glowMeteor: "rgba(71, 85, 105, 0.55)",
    glowBlackHole: "rgba(51, 65, 85, 0.75)",
    gridColor: "rgba(100, 116, 139, 0.08)",
    gridMeteor: "rgba(71, 85, 105, 0.10)",
    gridBlackHole: "rgba(51, 65, 85, 0.18)",
    accretionGrad: ["#475569", "#1e293b"],
    ringColors: ["rgba(148, 163, 184, 0.65)", "rgba(71, 85, 105, 0.35)"]
  },
  parent: {
    primaryGrad: ["#d97706", "#b45309", "#78350f", "#451a03"],
    meteorGrad: ["#ea580c", "#c2410c", "#7c2d12", "#431407"],
    singularityGrad: ["#000000", "#1c0c02", "#78350f", "#d97706", "#f59e0b"],
    glowColor: "rgba(180, 83, 9, 0.55)",
    glowMeteor: "rgba(217, 119, 6, 0.75)",
    glowBlackHole: "rgba(245, 158, 11, 0.95)",
    gridColor: "rgba(180, 83, 9, 0.10)",
    gridMeteor: "rgba(217, 119, 6, 0.12)",
    gridBlackHole: "rgba(245, 158, 11, 0.22)",
    accretionGrad: ["#b45309", "#f59e0b"],
    ringColors: ["rgba(180, 83, 9, 0.85)", "rgba(217, 119, 6, 0.45)"]
  }
};

export default function InteractivePlanet({ intensity = "gentle", persona = "oracle" }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 35;
      const y = (clientY - window.innerHeight / 2) / 35;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const theme = PERSONA_THEMES[persona] || PERSONA_THEMES.oracle;

  // Compute gravity well grid coordinates (distorts based on cursor coordinates)
  const gridDistortX = 100 + mousePos.x * 1.8;
  const gridDistortY = 100 + mousePos.y * 1.8;

  const getIntensityStyles = () => {
    switch (intensity) {
      case "meteor":
        return {
          glowColor: theme.glowMeteor,
          gridColor: theme.gridMeteor,
          planetStyle: `shadow-[0_0_60px_${theme.glowMeteor}] border border-white/10`,
          scale: 1.08,
          warpMultiplier: 2.0,
          backdropOpacity: 0.65
        };
      case "black_hole":
        return {
          glowColor: theme.glowBlackHole,
          gridColor: theme.gridBlackHole,
          planetStyle: `shadow-[0_0_80px_${theme.glowBlackHole},_inset_0_0_30px_rgba(255,255,255,0.1)] border border-white/20`,
          scale: 1.2,
          warpMultiplier: 3.5,
          backdropOpacity: 0.85
        };
      case "gentle":
      default:
        return {
          glowColor: theme.glowColor,
          gridColor: theme.gridColor,
          planetStyle: `shadow-[0_0_50px_${theme.glowColor}] border border-white/5`,
          scale: 1.0,
          warpMultiplier: 1.0,
          backdropOpacity: 0.5
        };
    }
  };

  const { glowColor, gridColor, planetStyle, scale, warpMultiplier, backdropOpacity } = getIntensityStyles();

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto flex items-center justify-center pointer-events-none select-none my-2">
      {/* 1. Backdrop Glow (CSS animation for breathing to avoid Framer keyframe restarts) */}
      <motion.div
        className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full blur-[90px] -z-10 animate-[breathe_5s_ease-in-out_infinite]"
        style={{ backgroundColor: glowColor }}
        animate={{
          opacity: backdropOpacity
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" }
        }}
      />

      {/* 2. Interactive Planet Wrapper */}
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: scale,
          rotateY: mousePos.x * 0.8,
          rotateX: -mousePos.y * 0.8
        }}
        transition={{
          x: { type: "spring", damping: 20, stiffness: 85 },
          y: { type: "spring", damping: 20, stiffness: 85 },
          scale: { type: "tween", ease: "easeOut", duration: 0.5 },
          rotateY: { type: "spring", damping: 20, stiffness: 85 },
          rotateX: { type: "spring", damping: 20, stiffness: 85 }
        }}
        style={{ perspective: 1000 }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            {/* Core Gradients dynamically built based on persona theme */}
            <radialGradient id="gentleGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={theme.primaryGrad[0]} />
              <stop offset="30%" stopColor={theme.primaryGrad[1]} />
              <stop offset="65%" stopColor={theme.primaryGrad[2]} />
              <stop offset="100%" stopColor={theme.primaryGrad[3]} />
            </radialGradient>

            <radialGradient id="meteorGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={theme.meteorGrad[0]} />
              <stop offset="40%" stopColor={theme.meteorGrad[1]} />
              <stop offset="80%" stopColor={theme.meteorGrad[2]} />
              <stop offset="100%" stopColor={theme.meteorGrad[3]} />
            </radialGradient>

            <radialGradient id="blackHoleGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.singularityGrad[0]} />
              <stop offset="55%" stopColor={theme.singularityGrad[1]} />
              <stop offset="76%" stopColor={theme.singularityGrad[2]} />
              <stop offset="88%" stopColor={theme.singularityGrad[3]} />
              <stop offset="100%" stopColor={theme.singularityGrad[4]} stopOpacity="0" />
            </radialGradient>

            <radialGradient id="accretionGrad" cx="50%" cy="50%" r="50%">
              <stop offset="25%" stopColor={theme.accretionGrad[0]} stopOpacity="0.85" />
              <stop offset="65%" stopColor={theme.accretionGrad[1]} stopOpacity="0.45" />
              <stop offset="90%" stopColor="#0c0a24" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030014" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* A. SPACETIME GRAVITY GRID */}
          <g stroke={gridColor} strokeWidth="0.65" fill="none" className="transition-all duration-300">
            <rect x="5" y="5" width="190" height="190" rx="20" strokeWidth="0.4" strokeDasharray="3 3" />
            
            <path d={`M 10 35 Q ${gridDistortX} ${35 + mousePos.y * warpMultiplier} 190 35`} />
            <path d={`M 10 65 Q ${gridDistortX} ${65 + mousePos.y * warpMultiplier * 0.5} 190 65`} />
            <path d={`M 10 100 Q ${gridDistortX} ${gridDistortY} 190 100`} />
            <path d={`M 10 135 Q ${gridDistortX} ${135 + mousePos.y * warpMultiplier * 0.5} 190 135`} />
            <path d={`M 10 165 Q ${gridDistortX} ${165 + mousePos.y * warpMultiplier} 190 165`} />

            <path d={`M 35 10 Q ${35 + mousePos.x * warpMultiplier} ${gridDistortY} 35 190`} />
            <path d={`M 65 10 Q ${65 + mousePos.x * warpMultiplier * 0.5} ${gridDistortY} 65 190`} />
            <path d={`M 100 10 Q ${gridDistortX} ${gridDistortY} 100 190`} />
            <path d={`M 135 10 Q ${135 + mousePos.x * warpMultiplier * 0.5} ${gridDistortY} 135 190`} />
            <path d={`M 165 10 Q ${165 + mousePos.x * warpMultiplier} ${gridDistortY} 165 190`} />
          </g>

          {/* B. CONCENTRIC GRAVITY RIPPLES */}
          <g fill="none" strokeWidth="0.8">
            <motion.circle
              cx="100"
              cy="100"
              r="48"
              animate={{ 
                scale: [1, 1.8], 
                opacity: [0.6, 0],
                stroke: intensity === "black_hole" ? theme.ringColors[1] : theme.ringColors[0]
              }}
              transition={{ 
                scale: { duration: 3.5, repeat: Infinity, ease: "easeOut" },
                opacity: { duration: 3.5, repeat: Infinity, ease: "easeOut" }
              }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="48"
              animate={{ 
                scale: [1, 1.8], 
                opacity: [0.6, 0],
                stroke: theme.ringColors[0]
              }}
              transition={{ 
                scale: { duration: 3.5, delay: 1.75, repeat: Infinity, ease: "easeOut" },
                opacity: { duration: 3.5, delay: 1.75, repeat: Infinity, ease: "easeOut" }
              }}
            />
          </g>

          {/* C. ACCRETION DISK (Behind Planet) */}
          <motion.ellipse
            cx="100"
            cy="100"
            rx="96"
            ry="26"
            fill="url(#accretionGrad)"
            className={`mix-blend-screen ${intensity === "black_hole" ? "animate-[diskBreathe_3.5s_ease-in-out_infinite]" : ""}`}
            animate={{
              opacity: intensity === "black_hole" ? 1 : 0,
              scale: intensity === "black_hole" ? 1 : 0.8,
              rotate: 360
            }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.6, ease: "easeOut" },
              rotate: { duration: 4.5, repeat: Infinity, ease: "linear" }
            }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* D. BACKGROUND PLANET RING (Gentle Orbit Mode) */}
          <motion.g 
            animate={{ opacity: intensity === "gentle" ? 0.8 : 0 }} 
            transition={{ duration: 0.5 }}
          >
            <path
              d="M 20 100 A 82 24 0 0 1 180 100"
              fill="none"
              stroke={theme.ringColors[0]}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M 10 100 A 92 28 0 0 1 190 100"
              fill="none"
              stroke={theme.ringColors[1]}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.3"
            />
          </motion.g>

          {/* E. CHROMATIC GRAVITATIONAL LENSING */}
          <motion.circle
            cx={100 - mousePos.x * 0.15}
            cy={100 - mousePos.y * 0.15}
            r="44"
            fill="none"
            stroke={theme.ringColors[0]}
            strokeWidth="1"
            className="mix-blend-screen"
            animate={{ opacity: intensity === "black_hole" ? 0.45 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx={100 + mousePos.x * 0.15}
            cy={100 + mousePos.y * 0.15}
            r="44"
            fill="none"
            stroke={theme.ringColors[1]}
            strokeWidth="1"
            className="mix-blend-screen"
            animate={{ opacity: intensity === "black_hole" ? 0.45 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* F. MAIN PLANET/SINGULARITY SPHERE */}
          {/* Gentle Planet Sphere */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#gentleGrad)"
            animate={{
              opacity: intensity === "gentle" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* Meteor Planet Sphere */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#meteorGrad)"
            animate={{
              opacity: intensity === "meteor" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* Black Hole Singularity Core */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#blackHoleGrad)"
            animate={{
              opacity: intensity === "black_hole" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* G. FOREGROUND PLANET RING */}
          <motion.g 
            animate={{ opacity: intensity === "gentle" ? 0.95 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <path
              d="M 180 100 A 82 24 0 0 1 20 100"
              fill="none"
              stroke={theme.ringColors[0]}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 190 100 A 92 28 0 0 1 10 100"
              fill="none"
              stroke={theme.ringColors[1]}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="116" r="1.5" fill="#ffffff" className="animate-pulse" />
            <circle cx="168" cy="84" r="2" fill="#ffffff" className="animate-pulse" />
          </motion.g>

          {/* H. ORBITING METEORS */}
          <motion.g
            animate={{ 
              opacity: intensity === "meteor" ? 1 : 0,
              rotate: -360 
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              rotate: { duration: 6, repeat: Infinity, ease: "linear" }
            }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <circle cx="30" cy="100" r="5" fill={theme.primaryGrad[0]} filter={`drop-shadow(0 0 6px ${theme.primaryGrad[0]})`} />
            <path d="M 30 100 L 42 94" stroke={theme.ringColors[1]} strokeWidth="2.5" strokeLinecap="round" />
            
            <circle cx="170" cy="90" r="3.5" fill={theme.meteorGrad[1]} />
            <circle cx="115" cy="170" r="4" fill={theme.primaryGrad[1]} filter={`drop-shadow(0 0 4px ${theme.primaryGrad[1]})`} />
          </motion.g>

          {/* I. CHRONO WARP DISK */}
          <motion.g
            animate={{ 
              opacity: intensity === "black_hole" ? 1 : 0,
              rotate: 360 
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              rotate: { duration: 2.0, repeat: Infinity, ease: "linear" }
            }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <ellipse
              cx="100"
              cy="100"
              rx="62"
              ry="5"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              className="mix-blend-screen"
            />
            <circle cx="38" cy="100" r="2.5" fill={theme.primaryGrad[0]} filter={`drop-shadow(0 0 4px ${theme.primaryGrad[0]})`} />
            <circle cx="162" cy="100" r="3.5" fill={theme.primaryGrad[1]} filter={`drop-shadow(0 0 6px ${theme.primaryGrad[1]})`} />
          </motion.g>
        </svg>

        {/* Ambient surrounding dust overlay */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 -z-20 pointer-events-none ${planetStyle}`} />
      </motion.div>
    </div>
  );
}
