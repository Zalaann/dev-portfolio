"use client";

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

type ParticleBackgroundProps = {
  className?: string;
  id?: string;
  density?: number;
  interactive?: boolean;
  staticParticles?: boolean;
};

export default function ParticleBackground({
  className = "",
  id = "tsparticles",
  density = 80,
  interactive = true,
  staticParticles = false,
}: ParticleBackgroundProps) {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Define theme-based colors
  const primaryColor = theme === "dark" ? "#8b5cf6" : "#4f46e5"; // Violet in dark, indigo in light
  const backgroundColor = "transparent";

  return (
    <motion.div 
      className={`w-full h-full absolute top-0 left-0 z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Particles
        id={id}
        className="w-full h-full"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: backgroundColor,
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: interactive,
                mode: "push",
              },
              onHover: {
                enable: interactive,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                distance: 150,
                line_linked: {
                  opacity: 0.5,
                },
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: primaryColor,
            },
            links: {
              color: theme === "dark" ? "#8b5cf680" : "#4f46e580",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              enable: !staticParticles,
              outMode: "bounce",
              random: false,
              speed: staticParticles ? 0 : 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: density,
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: !staticParticles,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: !staticParticles,
                speed: 2,
                size_min: 0.5,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
} 