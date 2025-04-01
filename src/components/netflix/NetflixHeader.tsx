"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Palette } from 'lucide-react';
import { ThemeType } from '@/contexts/ThemeContext';

interface NetflixHeaderProps {
  scrollY: number;
  setTheme: (theme: ThemeType) => void;
}

export default function NetflixHeader({ scrollY, setTheme }: NetflixHeaderProps) {
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/netflix" className="text-red-600 font-extrabold text-3xl tracking-tighter" prefetch={true}>MIT</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/netflix" className="hover:text-gray-300 transition" prefetch={true}>Home</Link>
            <Link href="/netflix/experience" className="hover:text-gray-300 transition" prefetch={true}>Experience</Link>
            <Link href="/netflix/education" className="hover:text-gray-300 transition" prefetch={true}>Education</Link>
            <Link href="/netflix/skills" className="hover:text-gray-300 transition" prefetch={true}>Skills</Link>
            <Link href="/netflix/projects" className="hover:text-gray-300 transition" prefetch={true}>Projects</Link>
            <Link href="/netflix/contact" className="hover:text-gray-300 transition" prefetch={true}>Contact</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            <Image 
              src="/profile.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
              priority
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
  );
} 