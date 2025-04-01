"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { ThemeType } from '@/contexts/ThemeContext';

interface NetflixFooterProps {
  setTheme: (theme: ThemeType) => void;
}

export default function NetflixFooter({ setTheme }: NetflixFooterProps) {
  return (
    <footer className="bg-black py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/netflix" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/netflix/experience" className="text-gray-400 hover:text-white transition">Experience</Link></li>
              <li><Link href="/netflix/education" className="text-gray-400 hover:text-white transition">Education</Link></li>
              <li><Link href="/netflix/skills" className="text-gray-400 hover:text-white transition">Skills</Link></li>
              <li><Link href="/netflix/projects" className="text-gray-400 hover:text-white transition">Projects</Link></li>
              <li><Link href="/netflix/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Theme</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setTheme("default")}
                  className="text-gray-400 hover:text-white transition"
                >
                  Default Theme
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setTheme("netflix")}
                  className="text-red-600 font-bold"
                >
                  Netflix Theme
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-600" />
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition">contact@example.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4 text-red-600" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">LinkedIn</a>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-red-600" />
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Github</a>
              </li>
              <li className="flex items-center space-x-2">
                <Twitter className="w-4 h-4 text-red-600" />
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Twitter</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-gray-400">
              A Netflix-themed portfolio showcasing skills and experience. Created with Next.js, Tailwind CSS, and TypeScript.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © 2023 Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 