// Fallback content used when the DB is not configured. Swap to live data via
// `/api/projects` after running `prisma migrate` and seeding.

export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "AgriSense AI",
    description:
      "An AI-powered smart agriculture platform designed to help farmers make better decisions using data-driven recommendations.",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "AI/ML", "SQL"],
    featured: true,
  },
  {
    id: 2,
    title: "AI College Enquiry Chatbot",
    description:
      "An AI/NLP-based chatbot that helps students get information about college-related queries through a conversational interface.",
    techStack: ["Python", "NLP", "AI"],
    featured: true,
  },
  {
    id: 3,
    title: "Pharmacy Supply Management System",
    description:
      "A software application for managing pharmacy inventory and supply information to improve organization and efficiency.",
    techStack: ["Python", "Java", "SQL"],
    featured: true,
  },
  {
    id: 4,
    title: "Employee Management System",
    description:
      "A desktop-based employee management application for managing records, departments, and bulk employee data.",
    techStack: ["Python", "Tkinter", "SQLite", "Excel"],
    featured: true,
  },
];
