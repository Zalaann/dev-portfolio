"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-12 sm:py-24 md:py-32 overflow-hidden">
      {/* Main container without box styling and without background blurs */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Experience
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line adjusted for mobile - lighter version */}
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary/10 via-secondary/10 to-primary/10"></div>

          <div className="space-y-8 sm:space-y-12">
            {/* Kaye Mackenzie Tech Intern */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center absolute left-4 sm:left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              </div>
              <div className="ml-12 sm:ml-auto sm:w-1/2 sm:pl-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-10 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Tech Intern, Kaye Mackenzie</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>July 2024 – Aug 2024</span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Contributed to full-stack development across both the mobile app (Expo/React Native) and the company website.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Implemented responsive frontend components and optimized API integration for real-time user interactions.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Implemented backend features that improved performance, scalability, and data handling using modern frameworks.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Deployed production-ready updates that enhanced reliability and user satisfaction across web and mobile platforms.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Freelance Writing Guild */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center justify-center absolute left-4 sm:left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-secondary"></div>
              </div>
              <div className="ml-12 sm:ml-0 sm:mr-auto sm:w-1/2 sm:pr-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-10 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Founder, Freelance Writing Guild</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Jun 2016 – Sep 2016</span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Built and managed a tech-driven writing startup serving 7+ recurring clients across multiple industries.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Designed and implemented a workflow automation system to manage assignments, track progress, and generate client reports.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Recruited, trained, and managed a distributed team of writers while maintaining client relationships and ensuring consistent quality standards.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CDRS Community Disaster Response & Volunteering */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center absolute left-4 sm:left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              </div>
              <div className="ml-12 sm:ml-auto sm:w-1/2 sm:pl-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-10 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Social Media Manager (Instagram), CDRS Community Disaster Response & Volunteering</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Jan 2020 – Sep 2020</span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Managed and maintained social media channels to share disaster response updates and engage with affected communities.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Created and scheduled posts, graphics, and alerts to inform volunteers and the public of ongoing aid activities.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Coordinated with response teams to accurately communicate urgent needs, resource availability, and volunteer opportunities.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 