"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import the ResumeWorld component dynamically to avoid SSR issues
const ResumeWorld = dynamic(() => import('./3D/ResumeWorld'), { 
  ssr: false,
  loading: () => (
    <div className="h-[80vh] w-full rounded-xl overflow-hidden border border-border/20 flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-medium">Loading 3D Experience...</p>
      </div>
    </div>
  )
});

// Client-only wrapper to prevent SSR issues with Three.js
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[80vh] w-full rounded-xl overflow-hidden border border-border/20 flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary font-medium">Preparing 3D Environment...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ResumeWorldSection() {
  return (
    <section id="resume-world" className="relative py-12 sm:py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-xl top-20 -right-32"></div>
        <div className="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-xl -bottom-32 -left-32"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Interactive Resume
          </span>
          <h2 className="text-4xl font-bold tracking-tight">
            Explore My Background in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              3D Space
            </span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Navigate through this interactive 3D environment to explore my experience, projects, skills, and education.
            Use your mouse to orbit around and zoom to different sections.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 p-1 rounded-xl"
        >
          <ClientOnly>
            <ResumeWorld />
          </ClientOnly>
        </motion.div>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>💡 Tip: Click and drag to rotate. Scroll to zoom. Hover over islands to see details.</p>
        </div>
      </div>
    </section>
  );
} 