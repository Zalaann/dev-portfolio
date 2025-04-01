"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';
import { ChevronRight } from 'lucide-react';

// Sample project data
const featuredProjects = [
  {
    id: 1,
    title: "Recello Project",
    description: "A web application for real-time collaboration",
    image: "/projects/recello.png",
    link: "/netflix/projects"
  },
  {
    id: 2,
    title: "Preorder Store Dashboard",
    description: "Admin dashboard for e-commerce store management",
    image: "/projects/dashboard.png",
    link: "/netflix/projects"
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure and user-friendly mobile banking solution",
    image: "/projects/banking.png",
    link: "/netflix/projects"
  },
];

export default function NetflixHome() {
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

      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black">
          {/* You can add a background image here */}
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Ibrahim Tariq</h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">Full Stack Developer</h2>
            <p className="text-xl text-gray-400 mb-8">
              Creating innovative web solutions with modern technologies
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/netflix/projects" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors inline-flex items-center"
              >
                View Projects <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
              <Link 
                href="/netflix/contact" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link href="/netflix/projects" className="text-sm text-gray-400 hover:text-white transition flex items-center">
              See all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <Link href={project.link} key={project.id}>
                <div className="bg-gray-900 rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
                  <div className="aspect-video bg-gray-800 relative">
                    {/* Project image as background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Quick Navigation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/netflix/experience">
              <div className="bg-black p-6 rounded-md hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-2">Experience</h3>
                <p className="text-gray-400 mb-4">My professional journey and work history</p>
                <span className="text-red-600 flex items-center">View Experience <ChevronRight className="ml-1 h-4 w-4" /></span>
              </div>
            </Link>
            
            <Link href="/netflix/skills">
              <div className="bg-black p-6 rounded-md hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-2">Skills</h3>
                <p className="text-gray-400 mb-4">Technical expertise and proficiencies</p>
                <span className="text-red-600 flex items-center">View Skills <ChevronRight className="ml-1 h-4 w-4" /></span>
              </div>
            </Link>
            
            <Link href="/netflix/contact">
              <div className="bg-black p-6 rounded-md hover:bg-gray-800 transition-colors">
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p className="text-gray-400 mb-4">Get in touch for opportunities or collaborations</p>
                <span className="text-red-600 flex items-center">Contact Me <ChevronRight className="ml-1 h-4 w-4" /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <NetflixFooter setTheme={setTheme} />
    </div>
  );
} 