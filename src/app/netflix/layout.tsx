"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NetflixLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Prefetch all Netflix routes when the layout loads
  useEffect(() => {
    const routes = [
      '/netflix',
      '/netflix/experience',
      '/netflix/education',
      '/netflix/skills',
      '/netflix/projects',
      '/netflix/contact',
    ];
    
    // Prefetch all routes except the current one
    routes.forEach(route => {
      if (route !== pathname) {
        router.prefetch(route);
      }
    });
  }, [router, pathname]);
  
  return (
    <div className="netflix-theme">
      {children}
    </div>
  );
} 