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
            <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium">
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
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20"></div>

          <div className="space-y-8 sm:space-y-12">
            {/* E-Commerce Store Owner - Simplified */}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">E-Commerce Store Owner</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>February 2021 - Present</span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Founded and scaled a hybrid e-commerce business to 7-figure PKR revenue within 2 years</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Led end-to-end operations, managing 1,000+ SKUs with 99% on-time delivery</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>Implemented automation strategies using bots, reducing order processing time by 40%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Amazon Warehouse Operative - Simplified */}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Amazon Warehouse Operative</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>November 2023 - December 2023</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Gained valuable experience in warehouse operations and logistics management at one of the world's largest e-commerce companies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tesco Retail Merchandiser - Simplified */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center justify-center absolute left-4 sm:left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              </div>
              <div className="ml-12 sm:ml-auto sm:w-1/2 sm:pl-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Tesco Retail Merchandiser</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>October 2023 - December 2023</span>
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
  );
} 