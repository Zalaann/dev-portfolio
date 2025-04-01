import type { Metadata } from 'next';
import NetflixExperience from '@/components/netflix/NetflixExperience';

export const metadata: Metadata = {
  title: 'Experience - Netflix Style Portfolio',
  description: 'Professional work experience and education timeline highlighting my career journey.',
};

export default function ExperiencePage() {
  return <NetflixExperience />;
} 