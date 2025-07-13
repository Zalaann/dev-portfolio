"use client";
import { useRef, useState } from 'react';
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

  const handleShoot = () => {
    if (!hovered || shot) return;
    setShot(true);
    const audio = new Audio(SHOOT_SOUND);
    audio.play();
    // Firing effect: flash text, then load site
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
          color: hovered ? '#f472b6' : '#fff',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '3.2rem',
          letterSpacing: '-0.04em',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'auto',
          userSelect: 'none',
          cursor: hovered ? 'crosshair' : 'default',
          transition: 'color 0.18s cubic-bezier(.4,1,.7,1)',
          textShadow: hovered ? '0 2px 16px #f472b6' : '0 2px 16px #000',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? 'Shoot!!!' : 'Aim... aand...'}
        <div
          style={{
            fontWeight: 400,
            fontSize: '1.1rem',
            marginTop: '1.2rem',
            color: '#a1a1aa',
            letterSpacing: '0',
            opacity: 0.7,
            transition: 'color 0.18s cubic-bezier(.4,1,.7,1)',
          }}
        >
          (hover the text)
        </div>
      </div>
    </div>
  );
}
