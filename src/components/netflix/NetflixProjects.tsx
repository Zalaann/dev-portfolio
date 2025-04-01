"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';

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

export default function NetflixProjects() {
  const { setTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

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
      <NetflixHeader scrollY={scrollY} setTheme={setTheme} />

      {/* Project Categories */}
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          
          {categories.map((category) => (
            <section 
              key={category.id} 
              className="py-8 bg-black"
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <Link href={`#${category.id}`} className="flex items-center text-sm text-gray-400 hover:text-white transition">
                    <span>See all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {projectsData
                    .filter(project => project.category === category.id)
                    .map(project => (
                      <Link 
                        key={project.id} 
                        href={project.link}
                        className="group rounded-md overflow-hidden transition-transform hover:scale-105 duration-300"
                      >
                        <div className="aspect-video bg-gray-800 relative">
                          {/* Project image placeholder - replace with actual images */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg text-white/30">{project.title}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <div>
                              <h3 className="font-bold">{project.title}</h3>
                              <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <NetflixFooter setTheme={setTheme} />
    </div>
  );
} 