export interface ProjectTechnology {
  name: string;
  // Use unknown here to avoid importing React types into this shared type module
  icon: unknown;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: ProjectTechnology[];
  liveUrl?: string;
  githubUrl?: string;
}


