import type { Metadata } from 'next';
import NetflixEducation from '@/components/netflix/NetflixEducation';

export const metadata: Metadata = {
  title: 'Education - Netflix Style Portfolio',
  description: 'Academic background, courses, and professional certifications - Netflix Style',
};

export default function EducationPage() {
  return <NetflixEducation />;
} 