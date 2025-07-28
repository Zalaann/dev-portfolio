"use client";
import { useRef, useState, useEffect } from 'react';
import Crosshair from '@/components/Crosshair';
import Navbar from '@/components/Navbar';
import { SiteTimer } from '@/components/SiteTimer';
import ScrollProgressTracker from '@/components/ScrollProgressTracker';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InteractiveShowcase from '@/components/InteractiveShowcase';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const SHOOT_SOUND = '/sounds/robocop-shoot.wav';

export default function Home() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [shot, setShot] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShoot = () => {
    if (shot) return;
    
    // For mobile, allow direct clicking
    if (isMobile) {
      setShot(true);
      const audio = new Audio(SHOOT_SOUND);
      audio.play();
      setTimeout(() => {
        setEntered(true);
      }, 350);
      return;
    }
    
    // For desktop, require hover
    if (!hovered || shot) return;
    setShot(true);
    const audio = new Audio(SHOOT_SOUND);
    audio.play();
    setTimeout(() => {
      setEntered(true);
    }, 350);
  };

  if (entered) {
    return (
      <>
        <Navbar />
        <SiteTimer />
        <ScrollProgressTracker />
        <main className="flex min-h-screen flex-col items-center justify-between relative">
          <ParticleBackground density={70} interactive={true} />
          <HeroSection />
          <AboutSection />
          <InteractiveShowcase />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
          <Footer />
        </main>
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at 60% 40%, #232136 0%, #18181b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={handleShoot}
    >
      <Crosshair containerRef={containerRef} color="#fff" />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: isMobile ? '#f472b6' : (hovered ? '#f472b6' : '#fff'),
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? '2.5rem' : '3.2rem',
          letterSpacing: '-0.04em',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'auto',
          userSelect: 'none',
          cursor: isMobile ? 'pointer' : (hovered ? 'crosshair' : 'default'),
          transition: 'color 0.18s cubic-bezier(.4,1,.7,1)',
          textShadow: isMobile ? '0 2px 16px #f472b6' : (hovered ? '0 2px 16px #f472b6' : '0 2px 16px #000'),
        }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        {isMobile ? 'Shoot here by clicking!' : (hovered ? 'Shoot!!!' : 'Aim... aand...')}
        <div
          style={{
            fontWeight: 400,
            fontSize: isMobile ? '1rem' : '1.1rem',
            marginTop: '1.2rem',
            color: '#a1a1aa',
            letterSpacing: '0',
            opacity: 0.7,
            transition: 'color 0.18s cubic-bezier(.4,1,.7,1)',
          }}
        >
          {isMobile ? '(tap to enter)' : '(hover the text)'}
        </div>
      </div>
    </div>
  );
}
