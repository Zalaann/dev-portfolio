"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiReact, SiTypescript, SiSupabase, SiExpo, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: Array<{ name: string; icon: React.ElementType; color: string }>;
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectsSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const recelloImages = [
    "/projects/1.jpeg",
    "/projects/2.png", 
    "/projects/3.png",
    "/projects/4.png",
    "/projects/5.png",
    "/projects/6.png",
    "/projects/7.png"
  ];

  const projects: Project[] = [
    {
      id: "recello",
      title: "Recello",
      description: "A marketplace app similar to OLX, built with React Native and Supabase. Features include multi-image uploads, location selection, and automated brand/model system.",
      longDescription: "Recello is a comprehensive marketplace application that revolutionizes the buying and selling experience. Built with React Native and powered by Supabase, it offers a seamless platform for users to list items, browse categories, and connect with potential buyers or sellers. The app features advanced image management with multi-upload capabilities, precise location-based searching, and an intelligent brand/model recognition system that automatically categorizes items. With real-time messaging, secure payment integration, and a robust rating system, Recello provides a complete e-commerce solution for local marketplaces.",
      images: recelloImages,
      technologies: [
        { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Expo", icon: SiExpo, color: "#000020" }
      ],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "preorder-dashboard",
      title: "Preorder Store Dashboard",
      description: "An admin panel for managing preorders with Supabase backend. Features include order tracking, customer management, and Kanban-style task system.",
      longDescription: "A comprehensive admin dashboard designed for managing preorder operations efficiently. This web application provides store owners with powerful tools to track orders, manage customer relationships, and streamline their business processes. The dashboard features a Kanban-style task management system, real-time order tracking, customer analytics, and automated inventory management. Built with modern web technologies, it offers a responsive design that works seamlessly across all devices.",
      images: ["/projects/placeholder.png"], // Placeholder for now
      technologies: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" }
      ],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % recelloImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + recelloImages.length) % recelloImages.length);
  };

  const nextModalImage = () => {
    if (selectedProject) {
      setModalImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevModalImage = () => {
    if (selectedProject) {
      setModalImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setModalImageIndex(0);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedProject) {
      nextModalImage();
    }
    if (isRightSwipe && selectedProject) {
      prevModalImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${index === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} rounded-2xl opacity-10 blur-lg`}></div>
              <div className="relative bg-background/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]">
                <div className="aspect-video bg-muted-foreground/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Image Carousel */}
                  <div className="relative w-full h-full">
                    <Image
                      src={project.images[0]}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority={index === 0}
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.id === "recello") prevImage();
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.id === "recello") nextImage();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {/* Image Indicators */}
                    {project.id === "recello" && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(imgIndex);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              imgIndex === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <div className="flex items-center space-x-2">
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                        title="View Project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                        title="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
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
          ))}
        </div>
      </div>

      {/* Glassmorphic Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            {/* Desktop Modal */}
            {!isMobile && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl bg-background/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-200 backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left Side - Project Details */}
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    {/* Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-3">{selectedProject.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6 flex-1">
                      {/* Technologies */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech.name}
                              className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary flex items-center gap-1.5"
                            >
                              <tech.icon className="w-3 h-3" style={{ color: tech.color }} />
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Long Description */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                          About
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image Gallery */}
                  <div className="lg:w-1/2 relative">
                    <div className="h-full relative overflow-hidden">
                      <Image
                        src={selectedProject.images[modalImageIndex]}
                        alt={`${selectedProject.title} screenshot ${modalImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      {/* Navigation Arrows */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={prevModalImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextModalImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      {selectedProject.images.length > 1 && (
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                          {modalImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Image Indicators */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setModalImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === modalImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile Modal */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full bg-background"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Header */}
                <div className="absolute top-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-sm border-b border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">{selectedProject.title}</h2>
                    <button
                      onClick={closeProjectModal}
                      className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-200"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Image Gallery */}
                <div className="h-full pt-16">
                  <div 
                    className="h-full relative overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <Image
                      src={selectedProject.images[modalImageIndex]}
                      alt={`${selectedProject.title} screenshot ${modalImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                    
                    {/* Mobile Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevModalImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextModalImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    
                    {/* Mobile Image Counter */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                        {modalImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Image Indicators */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setModalImageIndex(index)}
                          className={`w-4 h-4 rounded-full transition-all duration-200 ${
                            index === modalImageIndex 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Project Info (Swipe up to reveal) */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-white/10 p-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary flex items-center gap-1"
                          >
                            <tech.icon className="w-3 h-3" style={{ color: tech.color }} />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 