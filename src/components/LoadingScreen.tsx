"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const AURORA_COLORS = [
  ["#a5b4fc", "#818cf8", "#6366f1"],
  ["#f472b6", "#a5b4fc", "#818cf8"],
  ["#34d399", "#818cf8", "#6366f1"],
  ["#fbbf24", "#a5b4fc", "#6366f1"],
];

export default function LoadingScreen({ progress }: { progress: number }) {
  const [colorIdx, setColorIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((idx) => (idx + 1) % AURORA_COLORS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Morphing ring path (simple organic morph)
  const morphs = [
    "M130,40 Q170,60 190,130 Q170,200 130,220 Q90,200 70,130 Q90,60 130,40 Z",
    "M130,35 Q180,70 200,130 Q180,210 130,225 Q80,210 60,130 Q80,70 130,35 Z",
    "M130,45 Q175,80 185,130 Q175,195 130,215 Q85,195 75,130 Q85,80 130,45 Z",
    "M130,40 Q170,60 190,130 Q170,200 130,220 Q90,200 70,130 Q90,60 130,40 Z",
  ];
  const [morphIdx, setMorphIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMorphIdx((idx) => (idx + 1) % morphs.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Aurora color stops
  const [c1, c2, c3] = AURORA_COLORS[colorIdx];

  // Aurora fill intensity based on progress
  const fillOpacity = 0.3 + 0.5 * (progress / 100);
  const ringScale = 0.85 + 0.25 * (progress / 100);

  // Drifting light particles
  const particles = Array.from({ length: 5 }, (_, i) => ({
    delay: i * 0.7,
    size: 18 + Math.random() * 16,
    x: 80 + Math.random() * 100,
    y: 80 + Math.random() * 100,
    duration: 5 + Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background to-primary/40"
      style={{ overflow: "hidden" }}
    >
      {/* Aurora Morphing Ring */}
      <motion.svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 2 }}
      >
        <defs>
          <radialGradient id="aurora-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.7" />
            <stop offset="60%" stopColor={c2} stopOpacity="0.5" />
            <stop offset="100%" stopColor={c3} stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <motion.path
          d={morphs[morphIdx]}
          fill="url(#aurora-glow)"
          style={{ filter: "blur(2.5px)" }}
          animate={{
            d: morphs[(morphIdx + 1) % morphs.length],
            scale: ringScale,
            opacity: fillOpacity,
          }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      {/* Center Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 110,
          height: 110,
          background:
            "radial-gradient(circle, #a5b4fc 0%, #6366f1 60%, transparent 100%)",
          filter: `blur(${12 - 8 * (progress / 100)}px)`,
          opacity: 0.7 + 0.3 * (progress / 100),
          zIndex: 1,
        }}
        animate={{ scale: 0.9 + 0.2 * (progress / 100) }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
      />
      {/* Drifting Light Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background:
              "radial-gradient(circle, #fff 0%, #a5b4fc 60%, transparent 100%)",
            filter: "blur(6px)",
            opacity: 0.18 + 0.12 * (progress / 100),
            zIndex: 3,
          }}
          animate={{
            y: [p.y, p.y - 30, p.y],
            x: [p.x, p.x + 20 * (i % 2 ? 1 : -1), p.x],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Loading Text */}
      <div className="absolute left-1/2 top-2/3 -translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-lg font-medium text-primary drop-shadow animate-float"
        >
          Preparing Experience…
        </motion.div>
        <motion.div
          className="mt-2 text-xs text-muted-foreground tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </motion.div>
  );
} 