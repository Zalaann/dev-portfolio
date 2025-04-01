"use client";

import { useEffect, useState } from 'react';

export default function NetflixLoading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // The loading component is very minimal and styled like Netflix
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="w-14 h-14 mb-4">
        {/* Netflix "N" logo */}
        <div className="w-full h-full bg-red-600 flex items-center justify-center text-white font-bold text-3xl">
          M
        </div>
      </div>
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 