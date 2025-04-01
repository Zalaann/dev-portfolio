import { Metadata } from 'next';
import NetflixSkills from '@/components/netflix/NetflixSkills';

export const metadata: Metadata = {
  title: 'Skills - Netflix Style Portfolio',
  description: 'Technical skills and expertise - Netflix Style',
};

export default function SkillsPage() {
  return <NetflixSkills />;
} 