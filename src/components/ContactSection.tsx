"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Linkedin, Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setFormStatus("success");
      formRef.current?.reset();
      
      // Reset after showing success message
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus("error");
      
      // Reset after showing error message
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Main container with box styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Add outer box container with defined border and gradient styling */}
        <div className="relative rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-48 -right-48"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -bottom-48 -left-48"></div>
          </div>

          {/* Content */}
          <div className="backdrop-blur-md bg-background/30 p-8 sm:p-12">
            <div className="text-center space-y-4 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium">
                  Contact
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tight"
                style={{ willChange: 'transform, opacity' }}
              >
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Touch
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8 bg-background/40 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-lg"
                style={{ willChange: 'transform, opacity' }}
              >
                <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
                <p className="text-muted-foreground">
                  I&apos;m always open to new opportunities, collaborations, or just a friendly chat about technology and development.
                </p>

                <div className="space-y-6">
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    href="mailto:ibrahimtariq8193@gmail.com"
                    className="flex items-center space-x-4 group"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md transform transition-all duration-300 group-hover:blur-lg"></div>
                      <div className="bg-background/40 backdrop-blur-sm p-3 rounded-full border border-white/20 relative transition-transform duration-300 group-hover:scale-110">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">mibrahimtariq@icloud.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                    href="https://github.com/mibrahimtariq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 group"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md transform transition-all duration-300 group-hover:blur-lg"></div>
                      <div className="bg-background/40 backdrop-blur-sm p-3 rounded-full border border-white/20 relative transition-transform duration-300 group-hover:scale-110">
                        <Github className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <p className="text-sm text-muted-foreground">github.com/mibrahimtariq</p>
                    </div>
                  </motion.a>

                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    viewport={{ once: true }}
                    href="https://linkedin.com/in/muhammadibrahimtariq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 group"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md transform transition-all duration-300 group-hover:blur-lg"></div>
                      <div className="bg-background/40 backdrop-blur-sm p-3 rounded-full border border-white/20 relative transition-transform duration-300 group-hover:scale-110">
                        <Linkedin className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">linkedin.com/in/muhammadibrahimtariq</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-10 blur-lg"></div>
                <div className="bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg relative">
                  {/* Status Overlay */}
                  <AnimatePresence>
                    {(formStatus === "success" || formStatus === "error") && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 backdrop-blur-md bg-background/60 rounded-xl flex items-center justify-center"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="text-center p-4"
                          style={{ willChange: 'transform, opacity' }}
                        >
                          {formStatus === "success" ? (
                            <>
                              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                              <p className="text-lg font-medium text-green-500">Message sent successfully!</p>
                              <p className="text-sm text-muted-foreground mt-1">Thank you for reaching out!</p>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                              <p className="text-lg font-medium text-red-500">Failed to send message</p>
                              <p className="text-sm text-muted-foreground mt-1">Please try again later</p>
                            </>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <h3 className="text-xl font-bold mb-4">Send a Message</h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                        placeholder="Project Inquiry"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors resize-y"
                        placeholder="Hello, I'd like to discuss a potential project..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : formStatus === "success" ? (
                        "Message Sent!"
                      ) : formStatus === "error" ? (
                        "Error Sending"
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 