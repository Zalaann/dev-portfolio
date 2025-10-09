"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiPython, SiTensorflow, SiScikitlearn, SiJavascript } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";

export default function AboutSection() {
  const contactInfo = [
    { icon: MapPin, text: "Manchester, UK", href: null },
    { icon: Mail, text: "mibrahimtariq@icloud.com", href: "mailto:mibrahimtariq@icloud.com" },
  ];

  return (
    <section id="about" className="relative py-8 sm:py-16 md:py-20 bg-transparent overflow-hidden mt-0">
      {/* Background Elements - more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl top-20 -right-32"></div>
        <div className="absolute w-[500px] h-[500px] bg-secondary/2 rounded-full blur-3xl -bottom-32 -left-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* About Me Content - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                  About Me
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
                style={{ willChange: 'transform, opacity' }}
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
              Full-stack developer and e-commerce entrepreneur with expertise in web and mobile applications,
               crafting innovative solutions to enhance user experience and drive business growth,
                with a strong focus on AI and machine learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((item, index) => (
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

          {/* Languages and Skills - Takes up 1 column on large screens */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Languages Card */}
              <div className="group relative z-10">
                <div className="relative p-6 rounded-lg">
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
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span className="text-muted-foreground">{lang}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Card */}
              <div className="group relative z-10">
                <div className="relative p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg">Skills</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {[
                      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                      { name: "React Native", icon: SiJavascript, color: "#61DAFB" },
                      { name: "Next.js", icon: SiJavascript, color: "#000000" },
                      { name: "Python", icon: SiPython, color: "#3776AB" },
                      { name: "TypeScript", icon: SiJavascript, color: "#3178C6" },
                      { name: "AI/ML", icon: BsRobot, color: "#00B4D8" },
                      { name: "OpenAI Whisper", icon: BsRobot, color: "#412991" },
                      { name: "DeepSeek", icon: BsRobot, color: "#FF6B35" },
                      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
                      { name: "PostgreSQL", icon: SiJavascript, color: "#336791" },
                      { name: "Supabase", icon: SiJavascript, color: "#3ECF8E" },
                      { name: "Firebase", icon: SiJavascript, color: "#FFCA28" },
                      { name: "AWS", icon: SiJavascript, color: "#FF9900" },
                      { name: "Vercel", icon: SiJavascript, color: "#000000" }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <skill.icon className="w-4 h-4 flex-shrink-0" style={{ color: skill.color }} />
                        <span className="text-muted-foreground text-sm">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 