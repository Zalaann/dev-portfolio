"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Code, Sparkles, ExternalLink, Heart } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { MatrixText } from "./MatrixText";
import dynamic from 'next/dynamic';

// Import the ParticleBackground component with no SSR to avoid hydration issues
const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Zalaann", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b", label: "LinkedIn" },
    { icon: Mail, href: "mailto:mibrahimtariq@icloud.com", label: "Email" }
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-8 pb-16 md:py-0"
    >
      {/* Particle Background */}
      <ParticleBackground 
        particleColor="#4338ca"
        linkColor="#4338ca"
        backgroundColor="transparent"
      />

      {/* Background Elements - Simplified and optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-3xl -top-20 -right-20"></div>
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/10 rounded-full blur-3xl -bottom-20 -left-20"></div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center w-full max-w-4xl mx-auto space-y-4 sm:space-y-8 mt-4 sm:mt-0"
      >
        {/* Profile Image - Optimized animations */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-28 h-28 sm:w-40 md:w-48 sm:h-40 md:h-48 mx-auto mb-4 sm:mb-8 group will-change-transform"
        >
          {/* Simplified border animation */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary"></div>
          <div className="absolute inset-[3px] rounded-2xl bg-background"></div>
          <div className="relative w-full h-full p-2 sm:p-3">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <Image
                src="/profile.jpg"
                alt="Muhammad Ibrahim Tariq"
                width={192}
                height={192}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Reduced animations */}
        <div className="space-y-3 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 px-2">
              <motion.span 
                className="px-3 py-1 rounded-full border border-primary/20 text-xs sm:text-sm text-primary font-medium"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(67, 56, 202, 0.1)",
                  transition: { duration: 0.2 } 
                }}
              >
                AI Developer
              </motion.span>
              <motion.span 
                className="px-3 py-1 rounded-full border border-primary/20 text-xs sm:text-sm text-primary font-medium"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(67, 56, 202, 0.1)",
                  transition: { duration: 0.2 } 
                }}
              >
                E-commerce Expert
              </motion.span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2 sm:px-4">
              Hey, I'm{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Muhammad Ibrahim
                </span>
                <span className="absolute inset-x-0 bottom-0 h-2 sm:h-3 bg-primary/10 -rotate-1"></span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
              Crafting digital experiences with{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center font-mono text-[#00ff00]"
              >
                <Sparkles className="w-6 h-6 text-[#00ff00] mr-1" />
                <MatrixText text="passion" scrambleSpeed={50} />
              </motion.span>
              {" "}and{" "}
              <span className="inline-flex items-center text-red-500">
                <Heart className="w-6 h-6 text-red-500" />
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 w-full max-w-md mx-auto"
          >
            <motion.a
              href="#projects"
              className="group relative px-6 py-3 rounded-full overflow-hidden bg-primary text-primary-foreground font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <Code className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="group relative px-6 py-3 rounded-full overflow-hidden border border-secondary/50 font-medium hover:text-secondary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                Get in Touch
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
          </motion.div>

          {/* Social Links - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-3 sm:gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full hover:text-primary transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: "rgba(67, 56, 202, 0.1)",
                  transition: { duration: 0.2 } 
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Enhanced */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 mx-auto w-max text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-primary/20 flex items-start justify-center p-1.5 mx-auto">
            <motion.div 
              className="w-1 h-1.5 rounded-full bg-primary"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 