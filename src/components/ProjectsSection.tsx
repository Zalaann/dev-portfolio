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
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({
    "fattys-ecommerce": 0,
    "recello": 0,
    "nuch-ai-summarizer": 0
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true); // Control overlay visibility
  
  // Force re-render when image indices change
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const fattysImages = [
    "/projects/Fattys-1.PNG",
    "/projects/Fattys-2.PNG",
    "/projects/Fattys-3.PNG",
    "/projects/Fattys-4.PNG",
    "/projects/Fattys-5.PNG",
    "/projects/Fattys-6.PNG",
    "/projects/Fattys-7.PNG",
    "/projects/Fattys-8.PNG",
    "/projects/Fattys-9.PNG",
    "/projects/Fattys-10.PNG",
    "/projects/Fattys-11.PNG",
    "/projects/Fattys-12.PNG",
    "/projects/Fattys-13.PNG",
    "/projects/Fattys-14.PNG",
    "/projects/Fattys-15.PNG",
    "/projects/Fattys-16.PNG"
  ];

  const recelloImages = [
    "/projects/recello-1.jpeg",
    "/projects/recello-2.png", 
    "/projects/recello-3.png",
    "/projects/recello-4.png",
    "/projects/recello-5.png",
    "/projects/recello-6.png",
    "/projects/recello-7.png"
  ];

  const nuchImages = [
    "/projects/Nuch-1.png",
    "/projects/Nuch-2.png",
    "/projects/Nuch-3.png",
    "/projects/Nuch-4.png",
    "/projects/Nuch-5.png",
    "/projects/Nuch-6.png",
    "/projects/Nuch-7.png",
    "/projects/Nuch-8.png"
  ];

  const projects: Project[] = [
    {
      id: "fattys-ecommerce",
      title: "Fattys - E-commerce Application",
      description: "Designed and developed a complete cross-platform e-commerce solution for a retail client, built with React Native (Expo) and Supabase backend.",
      longDescription: "Fattys is a comprehensive e-commerce application that provides a complete shopping experience for retail clients. Built with React Native and Expo for cross-platform compatibility, the app features end-to-end functionality including user authentication, product catalog with advanced filtering, shopping cart management, secure checkout process, and payment integration. The Supabase backend ensures real-time data synchronization, secure user management, and scalable database operations. The app streamlines client operations and enhances customer experience with a modern, intuitive interface.",
      images: fattysImages,
      technologies: [
        { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Expo", icon: SiExpo, color: "#000020" }
      ],
      liveUrl: "",
      githubUrl: ""
    },
    {
      id: "recello",
      title: "Recello - Mobile Marketplace",
      description: "Full stack developer (front/backend) - Developed a React Native mobile marketplace for used phones! Tackled UI/UX challenges, integrated complex navigation and authentication flows.",
      longDescription: "Recello is a comprehensive mobile marketplace platform for buying and selling used phones. As a full-stack developer, I designed an optimal database architecture to boost speed performance, added real-time communication between sellers and buyers, and implemented OAuth authentication. The UI was designed from scratch with a focus on user experience, featuring clean code and folder structure for readability. Both frontend and backend were optimized for maximum performance and scalability.",
      images: recelloImages,
      technologies: [
        { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Expo", icon: SiExpo, color: "#000020" }
      ],
      liveUrl: "",
      githubUrl: ""
    },
    {
      id: "nuch-ai-summarizer",
      title: "Nuch AI Summarizer",
      description: "Built an AI-driven summarization tool capable of processing both audio and text inputs using Next.js for frontend and backend logic.",
      longDescription: "Nuch AI Summarizer is an advanced AI-powered tool that revolutionizes content processing through intelligent summarization. The application seamlessly handles both audio and text inputs, utilizing OpenAI Whisper for high-accuracy speech-to-text conversion and DeepSeek models for multi-layered text summarization. Built with Next.js for optimal performance, it features asynchronous task handling, intelligent API rate management, and real-time progress tracking. The tool provides efficient processing of large documents and audio files, making it ideal for professionals who need quick, accurate summaries of lengthy content.",
      images: nuchImages,
      technologies: [
        { name: "Next.js", icon: SiTypescript, color: "#000000" },
        { name: "OpenAI Whisper", icon: SiTypescript, color: "#412991" },
        { name: "DeepSeek", icon: SiTypescript, color: "#FF6B35" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" }
      ],
      liveUrl: "https://nuch-ai-article-summarizer.vercel.app/auth/sign-up/",
      githubUrl: ""
    }
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth <= 768;
      console.log('Mobile detection - window width:', window.innerWidth, 'isMobile:', isSmallScreen);
      setIsMobile(isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debug image indices changes
  useEffect(() => {
    console.log('currentImageIndices changed to:', currentImageIndices);
  }, [currentImageIndices]);

  // Debug forceUpdate changes
  useEffect(() => {
    console.log('forceUpdate changed to:', forceUpdate);
  }, [forceUpdate]);


  const nextImage = (projectId: string, imageCount: number) => {
    console.log('Next image clicked for:', projectId, 'current:', currentImageIndices[projectId]);
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imageCount
    }));
    setForceUpdate(prev => prev + 1); // Force re-render
    setShowOverlay(false); // Hide overlay when navigating
  };

  const prevImage = (projectId: string, imageCount: number) => {
    console.log('Prev image clicked for:', projectId, 'current:', currentImageIndices[projectId]);
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + imageCount) % imageCount
    }));
    setForceUpdate(prev => prev + 1); // Force re-render
    setShowOverlay(false); // Hide overlay when navigating
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
    // Only open modal on desktop
    if (!isMobile) {
      setSelectedProject(project);
      setModalImageIndex(0);
    }
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setModalImageIndex(0);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (projectId: string, imageCount: number) => (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    console.log('Touch end - distance:', distance, 'isLeftSwipe:', isLeftSwipe, 'isRightSwipe:', isRightSwipe);

    if (isLeftSwipe) {
      if (selectedProject) {
        nextModalImage();
      } else {
        console.log('Swiping left - calling nextImage');
        nextImage(projectId, imageCount);
      }
    }
    if (isRightSwipe) {
      if (selectedProject) {
        prevModalImage();
      } else {
        console.log('Swiping right - calling prevImage');
        prevImage(projectId, imageCount);
      }
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
              className={`group relative ${!isMobile ? 'cursor-pointer' : ''}`}
              onClick={(e) => {
                // Only open modal if not clicking on navigation buttons
                const target = e.target as HTMLElement;
                if (!target.closest('button')) {
                  openProjectModal(project);
                }
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${index === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'} rounded-2xl opacity-10 blur-lg`}></div>
              <div className={`relative bg-background/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 ${
                !isMobile ? 'hover:border-primary/30 hover:scale-[1.02]' : ''
              }`}>
                                  <div className="aspect-video bg-muted/10 relative overflow-hidden rounded-lg">
                    {!isMobile && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    )}
                  
                  {/* Image Carousel */}
                  <div 
                    className="relative w-full h-full"
                    onTouchStart={isMobile && project.images.length > 1 ? handleTouchStart : undefined}
                    onTouchMove={isMobile && project.images.length > 1 ? handleTouchMove : undefined}
                    onTouchEnd={isMobile && project.images.length > 1 ? handleTouchEnd(project.id, project.images.length) : undefined}
                    style={{ touchAction: isMobile && project.images.length > 1 ? 'pan-y' : 'auto' }}
                  >
                    {project.images.length > 0 ? (
                      <Image
                        key={`${project.id}-${currentImageIndices[project.id] || 0}-${forceUpdate}`}
                        src={project.images[currentImageIndices[project.id] || 0]}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-contain transition-opacity duration-300"
                        priority={index === 0}
                        onLoad={() => {
                          console.log(`Image loaded for ${project.id}, currentIndex:`, currentImageIndices[project.id] || 0, 'src:', project.images[currentImageIndices[project.id] || 0]);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/10 rounded-lg">
                        <div className="text-center text-muted-foreground">
                          <div className="text-4xl mb-2">📋</div>
                          <div className="text-sm">No preview available</div>
                        </div>
                      </div>
                    )}
                    

                    
                    {/* Click to view overlay - Only on Desktop */}
                    {!isMobile && showOverlay && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black">
                          Click to view
                        </div>
                      </div>
                    )}
                    
                    {/* Image counter - Only on Desktop when overlay is hidden */}
                    {!isMobile && project.images.length > 1 && !showOverlay && (
                      <div className="absolute top-2 right-2 bg-black/40 text-white px-2 py-1 rounded text-xs z-20">
                        {(currentImageIndices[project.id] || 0) + 1}/{project.images.length}
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            console.log('Prev button clicked!');
                            prevImage(project.id, project.images.length);
                          }}
                          onTouchStart={() => {
                            console.log('Prev button touch start!');
                          }}
                          onTouchEnd={() => {
                            console.log('Prev button touch end!');
                            prevImage(project.id, project.images.length);
                          }}
                          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 z-50 ${
                            isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                          aria-label="Previous image"
                          style={{ 
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            console.log('Next button clicked!');
                            nextImage(project.id, project.images.length);
                          }}
                          onTouchStart={() => {
                            console.log('Next button touch start!');
                          }}
                          onTouchEnd={() => {
                            console.log('Next button touch end!');
                            nextImage(project.id, project.images.length);
                          }}
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 z-50 ${
                            isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                          aria-label="Next image"
                          style={{ 
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    {/* Image Indicators */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndices(prev => ({
                                ...prev,
                                [project.id]: imgIndex
                              }));
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              imgIndex === (currentImageIndices[project.id] || 0)
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
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Project"
                          target={project.id === "nuch-ai-summarizer" ? "_blank" : undefined}
                          rel={project.id === "nuch-ai-summarizer" ? "noopener noreferrer" : undefined}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          title="View Code"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
            
            {/* Unified Modal for Both Desktop and Mobile */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative z-10 ${isMobile ? 'w-full h-full' : 'w-full max-w-6xl'} bg-background/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeProjectModal();
                }}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} h-full`}>
                {/* Left Side - Project Details */}
                <div className={`${isMobile ? 'flex-1 p-4' : 'lg:w-1/2 p-6 lg:p-8'} flex flex-col justify-between`}>
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold mb-3`}>{selectedProject.title}</h2>
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
                <div className={`${isMobile ? 'h-1/2 min-h-[300px]' : 'lg:w-1/2'} relative`}>
                  <div 
                    className="h-full relative overflow-hidden bg-muted/10"
                    onTouchStart={isMobile ? handleTouchStart : undefined}
                    onTouchMove={isMobile ? handleTouchMove : undefined}
                    onTouchEnd={isMobile ? handleTouchEnd : undefined}
                    style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
                  >
                    {selectedProject.images.length > 0 ? (
                      <Image
                        src={selectedProject.images[modalImageIndex]}
                        alt={`${selectedProject.title} screenshot ${modalImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                        priority={modalImageIndex === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <div className="text-4xl mb-2">📋</div>
                          <div className="text-sm">No preview available</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevModalImage();
                          }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextModalImage();
                          }}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalImageIndex(index);
                            }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 