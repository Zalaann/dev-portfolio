"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiPython, SiTensorflow, SiScikitlearn, SiJavascript } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";
import dynamic from 'next/dynamic';

// Import the 3D scene dynamically to avoid server-side rendering issues
const Scene3D = dynamic(() => import('./3DScene'), { ssr: false });

export default function AboutSection() {
  return (
    <section id="about" className="relative py-12 sm:py-24 md:py-32 bg-background overflow-hidden mt-0">
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
        
        {/* 3D Tech Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 rounded-xl overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 p-1"
        >
          <div className="rounded-lg bg-background/60 backdrop-blur-sm overflow-hidden">
            <h2 className="text-2xl font-bold text-center pt-8 pb-2">My Tech Stack</h2>
            <p className="text-center text-muted-foreground pb-4 px-4">
              Interactive visualization of technologies I work with
            </p>
            <Scene3D />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 