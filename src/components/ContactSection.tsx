"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Send, Linkedin } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsLoading(false);
      formRef.current?.reset();
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-12 sm:py-24 md:py-32 bg-background overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-xl top-0 -left-32"></div>
        <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-xl -bottom-64 right-0"></div>
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
              Get In Touch
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <TypeAnimation
                sequence={[
                  'Connect', 1000,
                  'Collaborate', 1000,
                  'Create', 1000,
                  'Innovate', 1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-8">
                <TypeAnimation 
                  sequence={[
                    'Feel free to reach out for collaborations, opportunities, or just to say hello!', 
                    3000,
                    'Looking forward to hearing about your exciting projects and ideas!',
                    3000,
                    'Let\'s turn great ideas into extraordinary digital experiences.',
                    3000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ display: 'inline-block' }}
                />
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:mibrahimtariq@outlook.com" 
                  className="flex items-center space-x-3 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    mibrahimtariq@outlook.com
                  </div>
                </a>

                <a 
                  href="https://github.com/ibrahim-tariq" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    github.com/ibrahim-tariq
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/ibrahim-tariq" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    linkedin.com/in/ibrahim-tariq
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-30 blur-xl"></div>
              <div className="relative bg-background border border-border/50 rounded-xl p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input 
                        id="name" 
                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                        placeholder="Your name" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input 
                        id="email" 
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                      placeholder="How can I help you?" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                      placeholder="Your message..." 
                      rows={4} 
                      required 
                    ></textarea>
                  </div>
                  <motion.button 
                    type="submit" 
                    className="px-6 py-3 rounded-full overflow-hidden bg-primary text-primary-foreground font-medium disabled:opacity-70 flex items-center justify-center space-x-2"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  
                  {submitStatus === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 px-4 py-3 rounded-lg bg-green-500/10 text-green-500 text-center"
                    >
                      Your message has been sent successfully!
                    </motion.div>
                  )}
                  
                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-500 text-center"
                    >
                      An error occurred. Please try again later.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 