"use client";

import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Code, Sparkles, ExternalLink, Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { MatrixText } from "@/components/MatrixText";
import dynamic from 'next/dynamic';

// Import the ParticleBackground component with no SSR to avoid hydration issues
const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const profileControls = useAnimation();
  const buttonsControls = useAnimation();
  const socialControls = useAnimation();
  const backgroundControls = useAnimation();

  const profileAnimation = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1
      }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  useEffect(() => {
    const sequence = async () => {
      await backgroundControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1, ease: "easeOut" }
      });

      await titleControls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      });

      await subtitleControls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      });

      await profileControls.start(profileAnimation.visible);

      await buttonsControls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          staggerChildren: 0.1
        }
      });

      await socialControls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          staggerChildren: 0.1
        }
      });

      setIsLoaded(true);
    };

    sequence();
  }, [titleControls, subtitleControls, profileControls, buttonsControls, socialControls, backgroundControls]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Zalaann", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b", label: "LinkedIn" },
    { icon: Mail, href: "mailto:mibrahimtariq@icloud.com", label: "Email" }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="home"
      className="relative min-h-[100vh] flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-24 pb-16"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      <ParticleBackground 
        density={70}
        interactive={true}
      />

      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={backgroundControls}
      >
        <motion.div
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-3xl -top-20 -right-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/5 rounded-full blur-3xl -bottom-20 -left-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center w-full max-w-4xl mx-auto space-y-3 sm:space-y-8 mt-4 sm:mt-8"
      >
        <motion.div
          className="relative w-28 h-28 sm:w-40 md:w-48 sm:h-40 md:h-48 mx-auto mb-2 sm:mb-4 group"
          variants={profileAnimation}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="absolute inset-[3px] rounded-2xl bg-background" />
          <div className="relative w-full h-full p-2 sm:p-3">
            <motion.div
              className="w-full h-full rounded-xl overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/profile.jpg"
                alt="Muhammad Ibrahim Tariq"
                width={192}
                height={192}
                className="object-cover w-full h-full"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-3 sm:space-y-6">
          <motion.div className="space-y-3 sm:space-y-4" variants={itemAnimation}>
            <div className="flex flex-wrap items-center justify-center gap-2 px-2">
              <motion.span
                className="px-3 py-1 rounded-full border border-primary/20 text-xs sm:text-sm text-primary font-medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(67, 56, 202, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                variants={itemAnimation}
              >
                Full Stack Developer
              </motion.span>
              <motion.span
                className="px-3 py-1 rounded-full border border-primary/20 text-xs sm:text-sm text-primary font-medium"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(67, 56, 202, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                variants={itemAnimation}
              >
                E-commerce Expert
              </motion.span>
            </div>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={titleControls}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2 sm:px-4"
            >
              Hey, I'm{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Muhammad Ibrahim
                </span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-2 sm:h-3 bg-primary/10 -rotate-1"
                  animate={{
                    rotate: [-1, 1, -1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={subtitleControls}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4"
            >
              Crafting digital experiences with{" "}
              <motion.span
                className="inline-flex items-center font-mono text-[#00ff00]"
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Sparkles className="w-6 h-6 text-[#00ff00] mr-1" />
                <MatrixText text="passion" scrambleSpeed={50} />
              </motion.span>
              {" "}and{" "}
              <motion.span
                className="inline-flex items-center text-red-500"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Heart className="w-6 h-6 text-red-500" />
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 w-full max-w-[280px] sm:max-w-md mx-auto"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socialControls}
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

      <motion.div
        className="absolute bottom-10 left-0 right-0 mx-auto w-max text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, -10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <motion.div
            className="w-5 h-9 rounded-full border-2 border-primary/20 flex items-start justify-center p-1.5 mx-auto"
            animate={{
              borderColor: ["rgba(67, 56, 202, 0.2)", "rgba(67, 56, 202, 0.6)", "rgba(67, 56, 202, 0.2)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-primary"
              animate={{
                y: [0, 15, 0],
                backgroundColor: ["rgb(67, 56, 202)", "rgb(99, 102, 241)", "rgb(67, 56, 202)"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
} 