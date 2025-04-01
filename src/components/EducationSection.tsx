"use client";

import { motion } from "framer-motion";
import { Calendar, Lightbulb } from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="relative py-12 sm:py-24 md:py-32 bg-background overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-secondary/5 rounded-full blur-xl top-0 -left-64"></div>
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-xl -bottom-64 -right-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              Learning Journey
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Education
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Computer Science Degree */}
          <div className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-background rounded-xl p-8 border border-border/50 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Bachelor of Computer Science</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>2020 - 2023</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <span>FAST National University, Pakistan</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Graduated with CGPA 3.95/4.00 from Pakistan's top CS institution
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Specialized in database systems and application development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Software Development Graduate Program */}
          <div className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-background rounded-xl p-8 border border-border/50 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Software Development Graduate Program</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>2023 - 2024</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <span>The University of Manchester, UK</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Advanced training in modern software development methodologies
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Specialized in React, Node.js, and cloud infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Online Certifications */}
          <div className="relative md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-secondary/70 to-primary/70 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-background rounded-xl p-8 border border-border/50 transition-colors duration-300">
                <h3 className="text-xl font-bold mb-6">Online Certifications & Continuous Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col space-y-2">
                    <div className="text-lg font-medium">Web Development</div>
                    <ul className="text-muted-foreground space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>Advanced React & NextJS - Udemy</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>Full Stack Development - Coursera</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="text-lg font-medium">Design & UX</div>
                    <ul className="text-muted-foreground space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                        <span>UI/UX Design Fundamentals - Figma</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                        <span>Design Systems - DesignLab</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="text-lg font-medium">DevOps & Cloud</div>
                    <ul className="text-muted-foreground space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>AWS Solutions Architect - Amazon</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                        <span>CI/CD Pipelines - GitHub Learning Lab</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 