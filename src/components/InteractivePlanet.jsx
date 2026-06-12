import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractivePlanet({ intensity = "gentle" }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 35;
      const y = (clientY - window.innerHeight / 2) / 35;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Compute gravity well grid coordinates (distorts based on cursor coordinates)
  const gridDistortX = 100 + mousePos.x * 1.8;
  const gridDistortY = 100 + mousePos.y * 1.8;

  const getIntensityStyles = () => {
    switch (intensity) {
      case "meteor":
        return {
          glowColor: "rgba(236, 72, 153, 0.75)", // pink flare
          gridColor: "rgba(236, 72, 153, 0.12)",
          planetGradId: "meteorGrad",
          planetStyle: "shadow-[0_0_60px_rgba(236,72,153,0.5)] border border-pink-500/20",
          scale: 1.08,
          warpMultiplier: 2.0,
          backdropOpacity: 0.65
        };
      case "black_hole":
        return {
          glowColor: "rgba(168, 85, 247, 0.95)", // deep purple aura
          gridColor: "rgba(168, 85, 247, 0.22)",
          planetGradId: "blackHoleGrad",
          planetStyle: "shadow-[0_0_80px_rgba(168,85,247,0.7),_inset_0_0_30px_rgba(6,182,212,0.3)] border border-purple-500/30",
          scale: 1.2,
          warpMultiplier: 3.5,
          backdropOpacity: 0.85
        };
      case "gentle":
      default:
        return {
          glowColor: "rgba(6, 182, 212, 0.55)", // cyan aqua glow
          gridColor: "rgba(6, 182, 212, 0.10)",
          planetGradId: "gentleGrad",
          planetStyle: "shadow-[0_0_50px_rgba(6,182,212,0.35)] border border-cyan-500/10",
          scale: 1.0,
          warpMultiplier: 1.0,
          backdropOpacity: 0.5
        };
    }
  };

  const { glowColor, gridColor, planetGradId, planetStyle, scale, warpMultiplier, backdropOpacity } = getIntensityStyles();

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
        // Split physics: use spring for cursor follow, and tween ease-out for scale shifts (no bounce)
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
            {/* Core Gradients */}
            <radialGradient id="gentleGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
              <stop offset="30%" stopColor="#06b6d4" />
              <stop offset="65%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            <radialGradient id="meteorGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff007f" /> {/* Hot Pink */}
              <stop offset="40%" stopColor="#c026d3" /> {/* Violet */}
              <stop offset="80%" stopColor="#4c0519" />
              <stop offset="100%" stopColor="#030014" />
            </radialGradient>

            {/* Black hole gradient: singularity core */}
            <radialGradient id="blackHoleGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="55%" stopColor="#02000c" />
              <stop offset="76%" stopColor="#581c87" /> {/* Purple ring edge */}
              <stop offset="88%" stopColor="#a855f7" />
              <stop offset="96%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>

            {/* Accretion disk glow */}
            <radialGradient id="accretionGrad" cx="50%" cy="50%" r="50%">
              <stop offset="25%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="90%" stopColor="#0c0a24" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030014" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* A. SPACETIME GRAVITY GRID: Physically warps Bezier curves toward the center mouse position */}
          <g stroke={gridColor} strokeWidth="0.65" fill="none" className="transition-all duration-300">
            {/* Outer containment border */}
            <rect x="5" y="5" width="190" height="190" rx="20" strokeWidth="0.4" strokeDasharray="3 3" />
            
            {/* Horizontal Warped Grid Lines */}
            <path d={`M 10 35 Q ${gridDistortX} ${35 + mousePos.y * warpMultiplier} 190 35`} />
            <path d={`M 10 65 Q ${gridDistortX} ${65 + mousePos.y * warpMultiplier * 0.5} 190 65`} />
            <path d={`M 10 100 Q ${gridDistortX} ${gridDistortY} 190 100`} />
            <path d={`M 10 135 Q ${gridDistortX} ${135 + mousePos.y * warpMultiplier * 0.5} 190 135`} />
            <path d={`M 10 165 Q ${gridDistortX} ${165 + mousePos.y * warpMultiplier} 190 165`} />

            {/* Vertical Warped Grid Lines */}
            <path d={`M 35 10 Q ${35 + mousePos.x * warpMultiplier} ${gridDistortY} 35 190`} />
            <path d={`M 65 10 Q ${65 + mousePos.x * warpMultiplier * 0.5} ${gridDistortY} 65 190`} />
            <path d={`M 100 10 Q ${gridDistortX} ${gridDistortY} 100 190`} />
            <path d={`M 135 10 Q ${135 + mousePos.x * warpMultiplier * 0.5} ${gridDistortY} 135 190`} />
            <path d={`M 165 10 Q ${165 + mousePos.x * warpMultiplier} ${gridDistortY} 165 190`} />
          </g>

          {/* B. CONCENTRIC GRAVITY RIPPLES (Expanding gravity wave pulses, colors transition smoothly) */}
          <g fill="none" strokeWidth="0.8">
            <motion.circle
              cx="100"
              cy="100"
              r="48"
              animate={{ 
                scale: [1, 1.8], 
                opacity: [0.6, 0],
                stroke: intensity === "black_hole" ? "rgba(168, 85, 247, 0.35)" : "rgba(6, 182, 212, 0.2)"
              }}
              transition={{ 
                scale: { duration: 3.5, repeat: Infinity, ease: "easeOut" },
                opacity: { duration: 3.5, repeat: Infinity, ease: "easeOut" },
                stroke: { duration: 0.5, ease: "easeOut" }
              }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="48"
              animate={{ 
                scale: [1, 1.8], 
                opacity: [0.6, 0],
                stroke: intensity === "meteor" ? "rgba(236, 72, 153, 0.3)" : "rgba(34, 211, 238, 0.15)"
              }}
              transition={{ 
                scale: { duration: 3.5, delay: 1.75, repeat: Infinity, ease: "easeOut" },
                opacity: { duration: 3.5, delay: 1.75, repeat: Infinity, ease: "easeOut" },
                stroke: { duration: 0.5, ease: "easeOut" }
              }}
            />
          </g>

          {/* C. ACCRETION DISK (Behind Planet for depth - CSS breathing, no Framer keyframe restart) */}
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
            {/* Rear ring path */}
            <path
              d="M 20 100 A 82 24 0 0 1 180 100"
              fill="none"
              stroke="rgba(6, 182, 212, 0.35)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10 100 A 92 28 0 0 1 190 100"
              fill="none"
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* E. CHROMATIC GRAVITATIONAL LENSING (Offset ghost spheres for high-gravity black hole) */}
          <motion.circle
            cx={100 - mousePos.x * 0.15}
            cy={100 - mousePos.y * 0.15}
            r="44"
            fill="none"
            stroke="rgba(34, 211, 238, 0.45)"
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
            stroke="rgba(236, 72, 153, 0.45)"
            strokeWidth="1"
            className="mix-blend-screen"
            animate={{ opacity: intensity === "black_hole" ? 0.45 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* F. MAIN PLANET/SINGULARITY SPHERE */}
          {/* Cyan/Gentle Planet Sphere */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#gentleGrad)"
            animate={{
              opacity: intensity === "gentle" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0,
              filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.35))"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* Pink/Meteor Planet Sphere */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#meteorGrad)"
            animate={{
              opacity: intensity === "meteor" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0,
              filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.55))"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* Purple/Black Hole Singularity Core */}
          <motion.circle
            cx="100"
            cy="100"
            r="46"
            fill="url(#blackHoleGrad)"
            animate={{
              opacity: intensity === "black_hole" ? 1 : 0,
              scale: intensity === "black_hole" ? 0.91 : intensity === "meteor" ? 1.02 : 1.0,
              filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.75))"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: "100px", originY: "100px" }}
          />

          {/* G. FOREGROUND PLANET RING (Wraps in front of planet for 3D depth) */}
          <motion.g 
            animate={{ opacity: intensity === "gentle" ? 0.95 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Front ring path */}
            <path
              d="M 180 100 A 82 24 0 0 1 20 100"
              fill="none"
              stroke="rgba(6, 182, 212, 0.85)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 190 100 A 92 28 0 0 1 10 100"
              fill="none"
              stroke="rgba(168, 85, 247, 0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="116" r="1.5" fill="#ffffff" className="animate-pulse" />
            <circle cx="168" cy="84" r="2" fill="#ffffff" className="animate-pulse" />
          </motion.g>

          {/* H. ORBITING METEORS (For Meteor Strike Mode) */}
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
            {/* Glowing meteor debris */}
            <circle cx="30" cy="100" r="5" fill="#ff007f" filter="drop-shadow(0 0 6px #ff007f)" />
            <path d="M 30 100 L 42 94" stroke="rgba(255, 0, 127, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
            
            <circle cx="170" cy="90" r="3.5" fill="#be185d" />
            <circle cx="115" cy="170" r="4" fill="#a855f7" filter="drop-shadow(0 0 4px #a855f7)" />
          </motion.g>

          {/* I. CHRONO WARP DISK (Overlays black hole core) */}
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
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              className="mix-blend-screen"
            />
            <circle cx="38" cy="100" r="2.5" fill="#22d3ee" filter="drop-shadow(0 0 4px #22d3ee)" />
            <circle cx="162" cy="100" r="3.5" fill="#a855f7" filter="drop-shadow(0 0 6px #a855f7)" />
          </motion.g>
        </svg>

        {/* Ambient surrounding dust overlay */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-purple-500/5 to-cyan-500/10 -z-20 pointer-events-none ${planetStyle}`} />
      </motion.div>
    </div>
  );
}
