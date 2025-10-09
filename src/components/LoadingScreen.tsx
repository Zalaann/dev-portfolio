"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_LINES = [
  "const portfolio = await buildPortfolio();",
  "async function loadExperience() {",
  "  const skills = await fetchSkills();",
  "  return skills.map(skill => skill.mastery);",
  "}",
  "const projects = await loadProjects();",
  "portfolio.render();"
];

const TECH_STACK = [
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "Python", color: "#3776AB" },
  { name: "Node.js", color: "#339933" }
];

export default function LoadingScreen({ progress }: { progress: number }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for code
  useEffect(() => {
    const currentCode = CODE_LINES[currentLine];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typingText === currentCode) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setCurrentLine((prev) => (prev + 1) % CODE_LINES.length);
    } else {
      timeout = setTimeout(() => {
        setTypingText(
          isDeleting
            ? currentCode.substring(0, typingText.length - 1)
            : currentCode.substring(0, typingText.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentLine]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ overflow: "hidden" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Terminal Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-700/50 p-6 min-w-[400px] max-w-[500px]"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-slate-400 font-mono">portfolio-terminal</span>
          </div>
        </div>

        {/* Code Display */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="text-blue-400">mibrahimtariq@portfolio</span>
            <span className="text-slate-600">:</span>
            <span className="text-green-400">~</span>
            <span className="text-slate-600">$</span>
            <motion.span
              className="text-slate-300 font-mono text-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {typingText}
              <span className="text-blue-400">|</span>
            </motion.span>
          </div>
        </div>

        {/* Tech Stack Animation */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-2 p-2 rounded bg-slate-700/30 border border-slate-600/30"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-xs text-slate-300 font-mono">{tech.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Initializing Portfolio...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Loading Messages */}
        <motion.div
          className="mt-4 text-xs text-slate-400 font-mono space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            ✓ Loading components...
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ✓ Compiling TypeScript...
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ✓ Optimizing performance...
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { symbol: "{", x: 200, y: 150, delay: 0, duration: 4.5 },
          { symbol: "}", x: 800, y: 300, delay: 0.5, duration: 5.2 },
          { symbol: "(", x: 150, y: 500, delay: 1, duration: 4.8 },
          { symbol: ")", x: 900, y: 200, delay: 1.5, duration: 5.5 },
          { symbol: "[", x: 300, y: 600, delay: 2, duration: 4.3 },
          { symbol: "]", x: 750, y: 450, delay: 2.5, duration: 5.8 },
          { symbol: ";", x: 500, y: 100, delay: 3, duration: 4.7 },
          { symbol: "=>", x: 600, y: 550, delay: 3.5, duration: 5.1 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-slate-600/20 font-mono text-xs"
            initial={{
              x: item.x,
              y: item.y,
              opacity: 0,
            }}
            animate={{
              y: [item.y, item.y - 100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 