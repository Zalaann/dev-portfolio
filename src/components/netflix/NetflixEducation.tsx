"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import NetflixHeader from './NetflixHeader';
import NetflixFooter from './NetflixFooter';

// Education interface
interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  courses?: string[];
  achievements?: string[];
}

// Sample education data
const education: Education[] = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2014 - 2016",
    description: "Specialized in Web Technologies and Artificial Intelligence with a focus on machine learning applications in web development.",
    courses: [
      "Advanced Web Development",
      "Machine Learning",
      "Cloud Computing",
      "Algorithms and Data Structures",
      "Database Management Systems"
    ],
    achievements: [
      "Graduated with Distinction",
      "Published research paper on 'Web Performance Optimization Techniques'",
      "Teaching Assistant for Web Development course"
    ]
  },
  {
    id: 2,
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    location: "Cambridge, MA",
    period: "2010 - 2014",
    description: "Graduated with honors. Completed coursework in algorithms, data structures, and web development.",
    courses: [
      "Object-Oriented Programming",
      "Web Application Development",
      "Computer Networks",
      "Software Engineering Principles",
      "User Interface Design"
    ],
    achievements: [
      "Dean's List for all semesters",
      "Capstone Project: Developed a real-time collaborative code editor",
      "Received the Outstanding Student Achievement Award"
    ]
  }
];

// Sample certifications
const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    url: "#"
  },
  {
    id: 2,
    title: "Professional React Developer",
    issuer: "Meta",
    date: "2022",
    url: "#"
  },
  {
    id: 3,
    title: "Google Cloud Certified - Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2021",
    url: "#"
  },
  {
    id: 4,
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "2020",
    url: "#"
  }
];

export default function NetflixEducation() {
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

      {/* Education Section */}
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-10">
            <h1 className="text-4xl font-bold">Education</h1>
          </div>
          
          {/* Formal Education */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Academic Background</h2>
            
            <div className="space-y-12">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-900/50 rounded-lg p-8 hover:bg-gray-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-red-500 text-lg">{edu.institution} • {edu.location}</p>
                    </div>
                    <p className="text-gray-400 mt-2 md:mt-0 text-lg">{edu.period}</p>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{edu.description}</p>
                  
                  {edu.courses && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-white">Relevant Coursework</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {edu.courses.map((course, idx) => (
                          <li key={idx} className="text-gray-300 flex items-center">
                            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {edu.achievements && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-white">Achievements</h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Professional Certifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center text-2xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                      <div className="flex justify-between mt-2">
                        <p className="text-gray-400">{cert.issuer}</p>
                        <p className="text-gray-500">Issued {cert.date}</p>
                      </div>
                    </div>
                  </div>
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