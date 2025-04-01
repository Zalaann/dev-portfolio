"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play, Info, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Project interface
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

// Category interface
interface Category {
  id: string;
  name: string;
}

// Sample data - replace with your actual project data
const projectsData: Project[] = [
  {
    id: "project1",
    title: "Recello",
    category: "featured",
    description: "A real-time collaborative note-taking application built with React and Firebase",
    image: "/project-images/recello.jpg",
    link: "#"
  },
  {
    id: "project2",
    title: "Preorder Store Dashboard",
    category: "web",
    description: "An e-commerce dashboard for managing preorders with analytics",
    image: "/project-images/dashboard.jpg",
    link: "#"
  },
  {
    id: "project3",
    title: "Personal Portfolio",
    category: "web",
    description: "Modern, responsive portfolio website built with Next.js and TailwindCSS",
    image: "/project-images/portfolio.jpg",
    link: "#"
  },
  {
    id: "project4",
    title: "E-Commerce Platform",
    category: "web",
    description: "Full-featured online store with payment processing and inventory management",
    image: "/project-images/ecommerce.jpg",
    link: "#"
  }
];

// Categories with Netflix-style names
const categories: Category[] = [
  { id: "featured", name: "Featured Projects" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" },
  { id: "design", name: "UI/UX Design" },
];

// Skills categories for the Netflix-style cards
const skillsCategories = [
  { id: "frontend", name: "Frontend", icon: "💻", color: "text-red-600" },
  { id: "backend", name: "Backend", icon: "🛠️", color: "text-red-600" },
  { id: "tools", name: "DevOps", icon: "🔧", color: "text-red-600" },
  { id: "soft", name: "Other", icon: "🤝", color: "text-red-600" },
];

// Technologies with icons
const techStack = [
  { id: "react", name: "React", icon: "⚛️", color: "text-blue-500", category: "frontend" },
  { id: "nextjs", name: "Next.js", icon: "▲", color: "text-white", category: "frontend" },
  { id: "typescript", name: "TypeScript", icon: "TS", color: "text-blue-500", category: "frontend" },
  { id: "nodejs", name: "Node.js", icon: "JS", color: "text-green-500", category: "backend" },
  { id: "firebase", name: "Firebase", icon: "🔥", color: "text-yellow-500", category: "backend" },
  { id: "aws", name: "AWS", icon: "☁️", color: "text-orange-500", category: "tools" },
  { id: "docker", name: "Docker", icon: "🐳", color: "text-blue-500", category: "tools" },
  { id: "git", name: "Git", icon: "🔄", color: "text-orange-500", category: "tools" },
];

// Personal interests for the "Continue Watching" section
const personalInterests = [
  { id: "music", title: "Music", image: "/project-images/music.jpg", url: "#music-section" },
  { id: "reading", title: "Reading", image: "/project-images/reading.jpg", url: "#reading-section" },
  { id: "blogs", title: "Blogs", image: "/project-images/blogs.jpg", url: "#blogs-section" },
  { id: "contact", title: "Contact Me", image: "/project-images/contact.jpg", url: "#contact" },
  { id: "certifications", title: "Certifications", image: "/project-images/certifications.jpg", url: "#certifications" },
];

// Certifications and courses
const certifications = [
  {
    id: "cert1",
    title: "React - The Complete Guide",
    provider: "Udemy",
    icon: "📱",
    iconBg: "bg-blue-600",
    year: "2023",
    link: "#"
  },
  {
    id: "cert2",
    title: "TypeScript Development",
    provider: "Udemy",
    icon: "TS",
    iconBg: "bg-blue-500",
    year: "2023",
    link: "#"
  },
  {
    id: "cert3",
    title: "Next.js & React - The Complete Guide",
    provider: "Academind",
    icon: "▲",
    iconBg: "bg-black",
    year: "2023",
    link: "#"
  },
  {
    id: "cert4",
    title: "UI/UX Design Fundamentals",
    provider: "Coursera",
    icon: "🎨",
    iconBg: "bg-purple-600",
    year: "2022",
    link: "#"
  },
  {
    id: "cert5",
    title: "AWS Cloud Practitioner",
    provider: "Amazon Web Services",
    icon: "☁️",
    iconBg: "bg-orange-500",
    year: "2023",
    link: "#"
  },
  {
    id: "cert6",
    title: "JavaScript Algorithms & Data Structures",
    provider: "freeCodeCamp",
    icon: "JS",
    iconBg: "bg-yellow-500",
    year: "2021",
    link: "#"
  }
];

export default function NetflixPortfolio() {
  const { setTheme } = useTheme();
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Set featured project on mount
  useEffect(() => {
    const featured = projectsData.find(p => p.category === "featured");
    if (featured) {
      setFeaturedProject(featured);
    }
  }, []);

  // Track scroll for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Netflix-style Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-red-600 font-extrabold text-3xl tracking-tighter">MIT</div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/netflix" className="hover:text-gray-300 transition">Home</Link>
              <Link href="/netflix/experience" className="hover:text-gray-300 transition">Experience</Link>
              <Link href="/netflix/skills" className="hover:text-gray-300 transition">Skills</Link>
              <Link href="/netflix/projects" className="hover:text-gray-300 transition">Projects</Link>
              <Link href="/netflix/contact" className="hover:text-gray-300 transition">Hire Me</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden">
              <Image 
                src="/profile.jpg"
                alt="Muhammad Ibrahim Tariq"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <button 
              onClick={() => setTheme("default")}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-1 rounded text-sm transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span>Switch Theme</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section / Featured Banner */}
      <section id="hero" className="relative h-screen">
        {/* Background Image - The Office style (like the screenshot) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10"></div>
          <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black/50 z-5"></div>
          <div className="w-full h-full">
            {/* This is where we would normally use an image from The Office like in the screenshot */}
            <div className="absolute inset-0 bg-gray-800 opacity-80">
              {/* We'll create a faux office environment background with gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
                {/* Adding some elements to make it look like an office scene */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-500/20 blur-xl"></div>
                <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-500/10 blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-red-500/10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4">Muhammad Ibrahim Tariq - Senior Developer</h1>
            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
              Dynamic and results-driven Software Developer with expertise in full-stack development across impactful applications. I bring expertise in React, Next.js, and modern web technologies, with a passion for building intuitive and impactful digital experiences. I've led e-commerce initiatives serving thousands of users and implemented automation strategies that reduced processing times by 40%.
            </p>
            
            <div className="flex space-x-4">
              <Link href="/netflix/resume" className="bg-white text-black hover:bg-white/90 transition px-8 py-3 rounded-md flex items-center space-x-2">
                <Play size={20} />
                <span className="font-semibold">Resume</span>
              </Link>
              <Link href="https://linkedin.com/in/ibrahim-tariq" target="_blank" rel="noopener noreferrer" className="bg-gray-500/30 hover:bg-gray-500/40 transition px-8 py-3 rounded-md flex items-center space-x-2">
                <Info size={20} />
                <span className="font-semibold">LinkedIn</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Picks For Recruiter Section (Projects) */}
      <section id="projects" className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Today's Top Picks for recruiters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Project Cards with Netflix Style - with page navigation */}
            <Link href="/netflix/experience" className="group">
              <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-gray-900 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white/70">Work Experience</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold">Work Experience</h3>
              </div>
            </Link>
            
            <Link href="/netflix/skills" className="group">
              <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-red-900/30 to-gray-900 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white/70">Skills</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold">Skills</h3>
              </div>
            </Link>
            
            <Link href="/netflix/projects" className="group">
              <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-green-900/30 to-gray-900 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white/70">Projects</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold">Projects</h3>
              </div>
            </Link>
            
            <Link href="/netflix/education" className="group">
              <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-gray-900 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white/70">Education</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
            </Link>
            
            <Link href="/netflix/contact" className="group">
              <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-yellow-600/30 to-gray-900 flex items-center justify-center">
                  <span className="text-xl font-semibold text-white/70">Contact</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold">Contact</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Continue Watching Section - like in screenshot */}
      <section id="continue-watching" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Continue Watching for recruiter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {personalInterests.map(item => (
              <Link 
                key={item.id} 
                href={`/netflix/${item.id}`} 
                className="group"
              >
                <div className="aspect-video bg-gray-800 relative rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-xl font-semibold text-white/70">{item.title}</span>
                  </div>
                  {/* Netflix-style progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-red-600" style={{ width: `${Math.random() * 70 + 30}%` }}></div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-gray-500 font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/netflix" className="text-gray-400 hover:text-gray-300 transition">Home</Link></li>
                <li><Link href="/netflix/experience" className="text-gray-400 hover:text-gray-300 transition">Experience</Link></li>
                <li><Link href="/netflix/skills" className="text-gray-400 hover:text-gray-300 transition">Skills</Link></li>
                <li><Link href="/netflix/projects" className="text-gray-400 hover:text-gray-300 transition">Projects</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:mibrahimtariq@outlook.com" className="text-gray-400 hover:text-gray-300 transition">Email</a></li>
                <li><a href="https://linkedin.com/in/ibrahim-tariq" className="text-gray-400 hover:text-gray-300 transition">LinkedIn</a></li>
                <li><a href="https://github.com/ibrahim-tariq" className="text-gray-400 hover:text-gray-300 transition">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/netflix/privacy" className="text-gray-400 hover:text-gray-300 transition">Privacy Policy</Link></li>
                <li><Link href="/netflix/terms" className="text-gray-400 hover:text-gray-300 transition">Terms of Service</Link></li>
                <li><Link href="/netflix/cookies" className="text-gray-400 hover:text-gray-300 transition">Cookie Preferences</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-500 font-bold mb-4">Theme</h3>
              <button 
                onClick={() => setTheme("default")}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
              >
                Switch to Standard Theme
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Muhammad Ibrahim Tariq. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Inspired by <a href="https://sumanthsamala.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 transition">Sumanth Samala</a>'s Netflix-style portfolio design.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 