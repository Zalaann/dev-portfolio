"use client";

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

type ParticleBackgroundProps = {
  className?: string;
  id?: string;
  particleColor?: string;
  linkColor?: string;
  backgroundColor?: string;
  interactive?: boolean;
};

export default function ParticleBackground({
  className = "",
  id = "tsparticles",
  particleColor = "#4338ca",
  linkColor = "#4338ca",
  backgroundColor = "transparent",
  interactive = true,
}: ParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id={id}
      className={`w-full h-full absolute top-0 left-0 z-0 ${className}`}
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
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
} 