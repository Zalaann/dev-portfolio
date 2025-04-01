"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';

export default function NetflixSkills() {
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

      {/* Skills Section - Card Style like in the screenshot */}
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <h1 className="text-3xl font-bold border-b-2 border-red-600 pb-2">Frontend</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">⚛️</div>
              <h3 className="text-xl font-bold">React</h3>
              <p className="text-gray-400 text-sm mt-2">Frontend Framework</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">▲</div>
              <h3 className="text-xl font-bold">Next.js</h3>
              <p className="text-gray-400 text-sm mt-2">React Framework</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">TS</div>
              <h3 className="text-xl font-bold">TypeScript</h3>
              <p className="text-gray-400 text-sm mt-2">Type-safe JavaScript</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold">TailwindCSS</h3>
              <p className="text-gray-400 text-sm mt-2">Utility-first CSS</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold">Framer Motion</h3>
              <p className="text-gray-400 text-sm mt-2">Animation Library</p>
            </div>
          </div>
          
          <div className="flex items-center mb-10">
            <h2 className="text-3xl font-bold border-b-2 border-red-600 pb-2">Backend & DevOps</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">JS</div>
              <h3 className="text-xl font-bold">Node.js</h3>
              <p className="text-gray-400 text-sm mt-2">Backend Runtime</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold">Firebase</h3>
              <p className="text-gray-400 text-sm mt-2">Backend Platform</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">☁️</div>
              <h3 className="text-xl font-bold">AWS</h3>
              <p className="text-gray-400 text-sm mt-2">Cloud Platform</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">🐳</div>
              <h3 className="text-xl font-bold">Docker</h3>
              <p className="text-gray-400 text-sm mt-2">Containerization</p>
            </div>
            
            <div className="bg-gray-900 rounded-md p-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-600 text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold">CI/CD</h3>
              <p className="text-gray-400 text-sm mt-2">Continuous Integration</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <NetflixFooter setTheme={setTheme} />
    </div>
  );
} 