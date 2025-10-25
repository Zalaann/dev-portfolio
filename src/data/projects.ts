import { TbBrandReactNative } from "react-icons/tb";
import { SiTypescript, SiSupabase, SiExpo } from "react-icons/si";
import type { Project } from "@/types/project";

export const fattysImages: string[] = [
  "/projects/Fattys-1.PNG",
  "/projects/Fattys-2.PNG",
  "/projects/Fattys-3.PNG",
  "/projects/Fattys-4.PNG",
  "/projects/Fattys-5.PNG",
  "/projects/Fattys-6.PNG",
  "/projects/Fattys-7.PNG",
  "/projects/Fattys-8.PNG",
  "/projects/Fattys-9.PNG",
  "/projects/Fattys-10.PNG",
  "/projects/Fattys-11.PNG",
  "/projects/Fattys-12.PNG",
  "/projects/Fattys-13.PNG",
  "/projects/Fattys-14.PNG",
  "/projects/Fattys-15.PNG",
  "/projects/Fattys-16.PNG",
];

export const recelloImages: string[] = [
  "/projects/recello-1.jpeg",
  "/projects/recello-2.png",
  "/projects/recello-3.png",
  "/projects/recello-4.png",
  "/projects/recello-5.png",
  "/projects/recello-6.png",
  "/projects/recello-7.png",
];

export const nuchImages: string[] = [
  "/projects/Nuch-1.png",
  "/projects/Nuch-2.png",
  "/projects/Nuch-3.png",
  "/projects/Nuch-4.png",
  "/projects/Nuch-5.png",
  "/projects/Nuch-6.png",
  "/projects/Nuch-7.png",
  "/projects/Nuch-8.png",
];

export const projects: Project[] = [
  {
    id: "fattys-ecommerce",
    title: "Fattys - E-commerce Application",
    description:
      "Designed and developed a complete cross-platform e-commerce solution for a retail client, built with React Native (Expo) and Supabase backend.",
    longDescription:
      "Fattys is a comprehensive e-commerce application that provides a complete shopping experience for retail clients. Built with React Native and Expo for cross-platform compatibility, the app features end-to-end functionality including user authentication, product catalog with advanced filtering, shopping cart management, secure checkout process, and payment integration. The Supabase backend ensures real-time data synchronization, secure user management, and scalable database operations. The app streamlines client operations and enhances customer experience with a modern, intuitive interface.",
    images: fattysImages,
    technologies: [
      { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Expo", icon: SiExpo, color: "#000020" },
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "recello",
    title: "Recello - Mobile Marketplace",
    description:
      "Full stack developer (front/backend) - Developed a React Native mobile marketplace for used phones! Tackled UI/UX challenges, integrated complex navigation and authentication flows.",
    longDescription:
      "Recello is a comprehensive mobile marketplace platform for buying and selling used phones. As a full-stack developer, I designed an optimal database architecture to boost speed performance, added real-time communication between sellers and buyers, and implemented OAuth authentication. The UI was designed from scratch with a focus on user experience, featuring clean code and folder structure for readability. Both frontend and backend were optimized for maximum performance and scalability.",
    images: recelloImages,
    technologies: [
      { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Expo", icon: SiExpo, color: "#000020" },
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "nuch-ai-summarizer",
    title: "Nuch AI Summarizer",
    description:
      "Built an AI-driven summarization tool capable of processing both audio and text inputs using Next.js for frontend and backend logic.",
    longDescription:
      "Nuch AI Summarizer is an advanced AI-powered tool that revolutionizes content processing through intelligent summarization. The application seamlessly handles both audio and text inputs, utilizing OpenAI Whisper for high-accuracy speech-to-text conversion and DeepSeek models for multi-layered text summarization. Built with Next.js for optimal performance, it features asynchronous task handling, intelligent API rate management, and real-time progress tracking. The tool provides efficient processing of large documents and audio files, making it ideal for professionals who need quick, accurate summaries of lengthy content.",
    images: nuchImages,
    technologies: [
      { name: "Next.js", icon: SiTypescript, color: "#000000" },
      { name: "OpenAI Whisper", icon: SiTypescript, color: "#412991" },
      { name: "DeepSeek", icon: SiTypescript, color: "#FF6B35" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
    liveUrl: "https://nuch-ai-article-summarizer.vercel.app/auth/sign-up/",
    githubUrl: "",
  },
];


