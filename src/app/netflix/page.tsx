import type { Metadata } from 'next';
import NetflixHome from '@/components/netflix/NetflixHome';

export const metadata: Metadata = {
  title: 'Ibrahim Tariq - Netflix Style Portfolio',
  description: 'Full Stack Developer portfolio showcasing projects, skills, and experience in a Netflix-inspired design.',
};

export default function NetflixHomePage() {
  return <NetflixHome />;
} 