"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';

export default function NetflixContact() {
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

      {/* Contact Section */}
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <h1 className="text-4xl font-bold">Contact</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in touch</h3>
              <p className="text-gray-400 mb-6">
                Feel free to reach out for collaborations, opportunities, or just to say hello!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <span className="text-red-500">@</span>
                  </div>
                  <a href="mailto:mibrahimtariq@outlook.com" className="text-gray-300 hover:text-white transition">
                    mibrahimtariq@outlook.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <span className="text-red-500">GH</span>
                  </div>
                  <a href="https://github.com/ibrahim-tariq" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                    github.com/ibrahim-tariq
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <span className="text-red-500">in</span>
                  </div>
                  <a href="https://linkedin.com/in/ibrahim-tariq" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                    linkedin.com/in/ibrahim-tariq
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 p-6 rounded-md">
              <h3 className="text-xl font-bold mb-4">Send a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message" 
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <NetflixFooter setTheme={setTheme} />
    </div>
  );
} 