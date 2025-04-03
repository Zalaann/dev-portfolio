"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, BookOpen } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
}

export default function EducationSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      title: "EF SET English Certificate",
      issuer: "EF Standard English Test",
      date: "January 2024",
      file: "/certificates/efset.pdf",
    },
    {
      title: "JavaScript Essentials 1",
      issuer: "Cisco Networking Academy",
      date: "December 2023",
      file: "/certificates/js-essentials-1.pdf",
    },
    {
      title: "JavaScript Essentials 2",
      issuer: "Cisco Networking Academy",
      date: "December 2023",
      file: "/certificates/js-essentials-2.pdf",
    },
    {
      title: "IELTS Academic (7 bands)",
      issuer: "British Council",
      date: "July 2022",
      file: "/certificates/ielts.pdf",
    },
  ];

  return (
    <section id="education" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Main container with box styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Add outer box container with defined border and gradient styling */}
        <div className="relative rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
          
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -top-64 -left-32"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl bottom-0 right-0"></div>
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
              >
                <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium">
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
                My Academic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Journey
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* University Education */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300 h-full">
                    <div className="absolute -top-3 left-6 px-4 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium">
                      2022 - 2025
                    </div>
                    <div className="pt-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">BSc (Hons) Computing</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Manchester Metropolitan University, UK
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>First-year GPA: 74% (Distinction)</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Expected graduation: July 2025</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>Focus areas: Full-stack development, cloud computing, data analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Graduate Program */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg transition-colors duration-300 h-full">
                    <div className="absolute -top-3 left-6 px-4 py-1 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary text-sm font-medium">
                      2020 - 2022
                    </div>
                    <div className="pt-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-secondary" />
                        <h3 className="text-xl font-bold">Intermediate in Computer Science</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Punjab Group of Colleges, Pakistan
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                          <span>Grade: A+ (93%)</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                          <span>Subjects: Programming, Database, Computer Networks, Mathematics</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                          <span>Graduated with distinction and excellence awards</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Certificates Section */}
            <div className="space-y-8">
              <div className="text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-10"
                >
                  Professional Certifications
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCertificate(cert)}
                    className="relative cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-xl opacity-20 blur-md transform transition-all duration-300 group-hover:opacity-30 group-hover:blur-lg"></div>
                    <div className="relative bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                          <CalendarDays className="w-5 h-5 text-primary" />
                          <span className="text-xs text-muted-foreground">{cert.date}</span>
                        </div>
                        <h3 className="font-bold mb-1 text-lg">{cert.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{cert.issuer}</p>
                        <div className="mt-auto">
                          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                            Click to view
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Dialog */}
      <Dialog.Root
        open={!!selectedCertificate}
        onOpenChange={(open) => {
          if (!open) setSelectedCertificate(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-4xl max-h-[90vh] translate-x-[-50%] translate-y-[-50%] bg-background/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <Dialog.Title className="text-xl font-semibold mb-2">
              {selectedCertificate?.title}
            </Dialog.Title>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedCertificate?.issuer} • {selectedCertificate?.date}
            </p>
            <div className="relative h-[70vh] bg-muted rounded-lg overflow-hidden">
              <iframe
                src={selectedCertificate?.file}
                className="w-full h-full border-0"
                title={selectedCertificate?.title}
              >
                <p>
                  Your browser doesn't support iframes. 
                  <a href={selectedCertificate?.file} target="_blank" rel="noopener noreferrer">
                    View the certificate
                  </a>
                </p>
              </iframe>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-white/20 hover:bg-muted focus:outline-none"
                aria-label="Close"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
} 