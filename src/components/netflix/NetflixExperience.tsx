"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';

// Experience interface
interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

// Education interface
interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

// Sample experience data
const experiences: Experience[] = [
  {
    id: 1,
    role: "Senior Web Developer",
    company: "Tech Innovations Inc.",
    location: "New York, NY",
    period: "2021 - Present",
    description: [
      "Led a team of 5 developers to build and maintain e-commerce applications serving 50,000+ users",
      "Implemented CI/CD pipelines that reduced deployment times by 40%",
      "Architected and developed microservices using Node.js and TypeScript",
      "Optimized application performance, resulting in a 30% improvement in page load times"
    ]
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "Boston, MA",
    period: "2018 - 2021",
    description: [
      "Developed responsive web applications using React and Next.js",
      "Created RESTful APIs using Express.js and MongoDB",
      "Implemented authentication systems using JWT and OAuth",
      "Collaborated with UX designers to implement pixel-perfect interfaces"
    ]
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Creative Web Agency",
    location: "San Francisco, CA",
    period: "2016 - 2018",
    description: [
      "Built interactive UI components using React and Redux",
      "Implemented responsive designs using SASS and CSS Grid",
      "Optimized frontend performance using code splitting and lazy loading",
      "Collaborated with backend developers to integrate APIs"
    ]
  }
];

// Sample education data
const education: Education[] = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2014 - 2016",
    description: "Specialized in Web Technologies and Artificial Intelligence with a focus on machine learning applications in web development."
  },
  {
    id: 2,
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2010 - 2014",
    description: "Graduated with honors. Completed coursework in algorithms, data structures, and web development."
  }
];

export default function NetflixExperience() {
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

      {/* Experience Section */}
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <h1 className="text-4xl font-bold">Experience</h1>
          </div>
          
          {/* Work Experience */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Work Experience</h2>
            
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-red-500">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-gray-400 mt-2 md:mt-0">{exp.period}</p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.description.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Education</h2>
            
            <div className="space-y-10">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-red-500">{edu.institution} • {edu.location}</p>
                    </div>
                    <p className="text-gray-400 mt-2 md:mt-0">{edu.period}</p>
                  </div>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <NetflixFooter setTheme={setTheme} />
    </div>
  );
} 