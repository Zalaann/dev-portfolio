"use client";

import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Heart, ExternalLink, Code, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiSupabase, SiExpo, SiTailwindcss, SiPython, SiTensorflow, SiScikitlearn, SiJavascript } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const MatrixText = ({ text, scrambleSpeed = 50 }: { text: string; scrambleSpeed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationsRef = useRef(0);
  const maxIterations = 15; // How many times to scramble before settling
  const repeatDelay = 3000; // 3 seconds delay before repeating

  useEffect(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*<>[]{}';
    const textLength = text.length;

    const startScramble = () => {
      // Reset iteration counter
      iterationsRef.current = 0;
      
      const scramble = () => {
        if (iterationsRef.current >= maxIterations) {
          setDisplayText(text);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            
            // Schedule next scramble after delay
            setTimeout(startScramble, repeatDelay);
          }
          return;
        }

        const scrambled = Array.from({ length: textLength }, (_, i) => {
          if (Math.random() < iterationsRef.current / maxIterations) {
            return text[i];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join('');

        setDisplayText(scrambled);
        iterationsRef.current++;
      };

      // Start new scramble interval
      intervalRef.current = setInterval(scramble, scrambleSpeed);
    };

    // Initial start
    startScramble();

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, scrambleSpeed]); // Re-run effect when text or scrambleSpeed changes

  return <>{displayText}</>;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Reset scroll position to top when component mounts
    window.scrollTo(0, 0);

    // Remove loading screen after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling after loading
      document.body.style.overflow = 'auto';
    }, 3000); // 3 seconds total (2s delay + 1s fade out)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      
      {/* Hero Section */}
        <section 
          ref={containerRef}
          id="home" 
          className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16"
        >
          {/* Background Elements - Adjusted for mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/20 rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
            <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/20 rounded-full blur-3xl -bottom-20 -left-20 animate-pulse delay-1000"></div>
          </div>

          <motion.div
            style={{ y, opacity }}
            className="relative z-10 text-center w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 mt-8 sm:mt-0"
          >
            {/* Profile Image - Fine-tuned spacing */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-28 h-28 sm:w-40 md:w-48 sm:h-40 md:h-48 mx-auto mb-4 sm:mb-8 group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x"></div>
              <div className="absolute inset-[3px] rounded-2xl bg-background"></div>
              <div className="relative w-full h-full p-2 sm:p-3">
                <div className="w-full h-full rounded-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/profile.jpg"
                    alt="Muhammad Ibrahim Tariq"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </motion.div>

            {/* Main Content - Adjusted spacing for mobile */}
            <div className="space-y-3 sm:space-y-6">
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 px-2">
                  <span className="px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm text-xs sm:text-sm text-primary font-medium">
                    AI Developer
                  </span>
                  <span className="px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm text-xs sm:text-sm text-primary font-medium">
                    E-commerce Expert
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2 sm:px-4">
                  Hey, I'm{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
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
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block"
                  >
                    <Heart className="inline-block w-6 h-6 text-red-500" />
                  </motion.span>
                </p>
              </motion.div>

              {/* CTA Buttons - Made responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 w-full max-w-md mx-auto"
              >
                <a
                  href="#projects"
                  className="group relative px-6 py-3 rounded-full overflow-hidden bg-primary text-primary-foreground font-medium"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <Code className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </a>
                <a
                  href="#contact"
                  className="group relative px-6 py-3 rounded-full overflow-hidden border border-secondary/50 font-medium hover:text-secondary-foreground transition-colors"
                >
                  <span className="relative z-10 flex items-center">
                    Get in Touch
                    <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </motion.div>

              {/* Social Links - Adjusted spacing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center gap-3 sm:gap-6"
              >
                {[
                  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:mibrahimtariq@icloud.com", label: "Email" }
                ].map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full hover:text-primary transition-colors"
                  >
                    <span className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform"></span>
                    <social.icon className="w-5 h-5 relative z-10" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2"
            >
              <span className="text-sm text-muted-foreground">Scroll to explore</span>
              <div className="w-5 h-9 rounded-full border-2 border-primary/20 flex items-start justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-1 h-1.5 rounded-full bg-primary"
                />
        </div>
            </motion.div>
          </motion.div>
      </section>

      {/* About Section */}
        <section id="about" className="relative py-16 sm:py-24 md:py-32 bg-background overflow-hidden mt-8 sm:mt-0">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl top-20 -right-32"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -bottom-32 -left-32"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
              <div className="space-y-8">
              <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      About Me
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold tracking-tight"
                  >
                    Passionate about creating{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                      impactful solutions
                    </span>
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground text-lg leading-relaxed"
                >
                  Dedicated professional with 3 years of Artificial Intelligence studies and over 3 years
                  of experience in customer care and e-commerce management. Equipped with a strong
                  foundation in AI development, machine learning, and web development.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    { icon: MapPin, text: "London, United Kingdom", href: null },
                    { icon: Phone, text: "+44 7480 438571", href: "tel:+447480438571" },
                    { icon: Mail, text: "mibrahimtariq@icloud.com", href: "mailto:mibrahimtariq@icloud.com" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`group flex items-center space-x-3 ${item.href ? 'cursor-pointer' : ''}`}
                      onClick={() => item.href && window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank')}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        <item.icon className="h-5 w-5 relative z-10 group-hover:text-primary transition-colors duration-300" />
                </div>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {item.text}
                      </span>
                </div>
                  ))}
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-6"
                >
                  {/* Languages Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative p-6 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300">
                      <h3 className="font-semibold mb-4 text-lg">Languages</h3>
                      <ul className="space-y-3">
                        {["English", "Urdu"].map((lang, index) => (
                          <motion.li
                            key={lang}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                            <span className="text-muted-foreground">{lang}</span>
                          </motion.li>
                        ))}
                </ul>
              </div>
                  </div>

                  {/* Skills Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-lg opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative p-6 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300">
                      <h3 className="font-semibold mb-4 text-lg">Skills</h3>
                      <ul className="space-y-3">
                        {[
                          { name: "Artificial Intelligence", icon: BsRobot, color: "#00B4D8" },
                          { name: "Python", icon: SiPython, color: "#3776AB" },
                          { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
                          { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
                          { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                          { name: "Project Management", icon: AiOutlineProject, color: "#0073B1" }
                        ].map((skill, index) => (
                          <motion.li
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2"
                          >
                            <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
                            <span className="text-muted-foreground">{skill.name}</span>
                          </motion.li>
                        ))}
                </ul>
              </div>
                  </div>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
        <section id="projects" className="relative py-16 sm:py-24 md:py-32 bg-muted overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -top-96 -right-96"></div>
            <div className="absolute w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -bottom-32 -left-32"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Portfolio
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
              >
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                  Projects
                </span>
              </motion.h2>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Recello Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-background rounded-xl overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="aspect-video bg-muted-foreground/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full bg-muted"
                    />
                  </div>
                  <div className="p-4 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Recello</h3>
                      <div className="flex items-center space-x-2">
                        <a
                          href="#"
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Project"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                  A marketplace app similar to OLX, built with React Native and Supabase. Features include
                  multi-image uploads, location selection, and automated brand/model system.
                </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {[
                        { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
                        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
                        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                        { name: "Expo", icon: SiExpo, color: "#000020" }
                      ].map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1"
                        >
                          <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Preorder Store Dashboard Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-background rounded-xl overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="aspect-video bg-muted-foreground/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full bg-muted"
                    />
                  </div>
                  <div className="p-4 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Preorder Store Dashboard</h3>
                      <div className="flex items-center space-x-2">
                        <a
                          href="#"
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Project"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                  An admin panel for managing preorders with Supabase backend. Features include order tracking,
                  customer management, and Kanban-style task system.
                </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {[
                        { name: "React", icon: SiReact, color: "#61DAFB" },
                        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
                        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" }
                      ].map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1"
                        >
                          <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Timeline made responsive */}
        <section id="experience" className="relative py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl top-0 -right-64"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -bottom-32 -left-32"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Career
                </span>
            </motion.div>
              <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
              >
                Professional{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                  Experience
                </span>
              </motion.h2>
            </div>

            <div className="relative">
              {/* Timeline line adjusted for mobile */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50"></div>

              <div className="space-y-8 sm:space-y-12">
                {/* E-Commerce Store Owner */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center absolute left-4 sm:left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <div className="ml-12 sm:ml-auto sm:w-1/2 sm:pl-8">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="relative bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">E-Commerce Store Owner</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>February 2021 - Present</span>
                          </div>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>Founded and scaled a hybrid e-commerce business to 7-figure PKR revenue within 2 years</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>Led end-to-end operations, managing 1,000+ SKUs with 99% on-time delivery</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>Implemented automation strategies using bots, reducing order processing time by 40%</span>
                          </motion.li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Amazon Warehouse Operative */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  </div>
                  <div className="mr-auto w-1/2 pr-8">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="relative bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">Amazon Warehouse Operative</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>November 2024 - December 2024</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Gained valuable experience in warehouse operations and logistics management at one of the world's largest e-commerce companies.
                        </p>
                      </div>
                    </div>
                  </div>
            </motion.div>

                {/* Tesco Retail Merchandiser */}
            <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
              viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                  <div className="ml-auto w-1/2 pl-8">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                      <div className="relative bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">Tesco Retail Merchandiser</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>October 2024 - December 2024</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Developed expertise in retail merchandising and customer service while working at one of the UK's leading supermarket chains.
                        </p>
                      </div>
                    </div>
                  </div>
            </motion.div>
              </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
        <section id="education" className="relative py-16 sm:py-24 md:py-32 bg-muted overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -top-96 -left-96"></div>
            <div className="absolute w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -bottom-32 -right-32"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Education
                </span>
            </motion.div>
              <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
              >
                Academic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                  Journey
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* UEL */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative h-full bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold">Applied Computing</h3>
                        <p className="text-primary">BSc (Hons)</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>2024 - 2025</span>
                      </div>
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>University of East London, London</span>
                      </div>
                      
                      <ul className="space-y-2 text-muted-foreground">
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Specializing in modern software development and computing technologies</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Focus on practical application of computing principles</span>
                        </motion.li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAST */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative h-full bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold">Artificial Intelligence</h3>
                        <p className="text-primary">Bachelor's Degree</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>2020 - 2024</span>
                      </div>
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>National University of Computer and Emerging Sciences</span>
                      </div>
                      
                      <ul className="space-y-2 text-muted-foreground">
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Deep focus on AI algorithms, machine learning, and neural networks</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Extensive research and practical projects in AI applications</span>
                        </motion.li>
                      </ul>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
        <section id="contact" className="relative py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -top-96 -right-96 animate-pulse"></div>
            <div className="absolute w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -bottom-32 -left-32 animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Contact
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
              >
                Let's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
                  Connect
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
              >
                Feel free to reach out for collaborations or just a friendly chat
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
            >
              {/* Email Card */}
            <a
              href="mailto:mibrahimtariq@icloud.com"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative h-full bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground text-sm">mibrahimtariq@icloud.com</p>
                  </div>
                </div>
              </a>

              {/* Phone Card */}
            <a
              href="tel:+447480438571"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative h-full bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground text-sm">+44 7480 438571</p>
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative h-full bg-background rounded-xl p-8 border border-border/50 group-hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground text-sm">London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links - Adjusted spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-16"
            >
              {[
                { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b", label: "LinkedIn" },
                { icon: Mail, href: "mailto:mibrahimtariq@icloud.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4"
                >
                  <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <social.icon className="w-6 h-6 relative z-10 group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
