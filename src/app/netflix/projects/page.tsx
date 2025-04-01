import { Metadata } from 'next';
import NetflixProjects from '@/components/netflix/NetflixProjects';

export const metadata: Metadata = {
  title: 'Projects - Netflix Style Portfolio',
  description: 'Showcase of my portfolio projects - Netflix Style',
};

export default function ProjectsPage() {
  return <NetflixProjects />;
} 