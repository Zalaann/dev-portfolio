"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SiReact, SiTypescript, SiSupabase, SiExpo, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-12 sm:py-24 md:py-32 bg-background/30 backdrop-blur-sm overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-primary/1 rounded-full blur-3xl -top-96 -right-96"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary/1 rounded-full blur-3xl -bottom-32 -left-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-sm text-primary text-sm font-medium">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Projects
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Recello Project - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-10 blur-lg"></div>
            <div className="relative bg-background/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-colors duration-300">
              <div className="aspect-video bg-muted-foreground/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-full h-full bg-muted/20"></div>
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
                      className="px-3 py-1 text-sm rounded-full bg-primary/5 backdrop-blur-sm text-primary flex items-center gap-1"
                    >
                      <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preorder Store Dashboard Project - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-10 blur-lg"></div>
            <div className="relative bg-background/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-colors duration-300">
              <div className="aspect-video bg-muted-foreground/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-full h-full bg-muted/20"></div>
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
                      className="px-3 py-1 text-sm rounded-full bg-primary/5 backdrop-blur-sm text-primary flex items-center gap-1"
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
  );
} 