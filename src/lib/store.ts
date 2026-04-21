import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "./safe-storage";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    jobTitle: string;
    github?: string;
    avatar?: string;
  };
  summary: string;
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link: string;
    technologies: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface ResumeState {
  data: ResumeData;
  templateId: string;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  updateSummary: (summary: string) => void;
  addEducation: (edu: ResumeData["education"][0]) => void;
  updateEducation: (index: number, edu: ResumeData["education"][0]) => void;
  removeEducation: (index: number) => void;
  addExperience: (exp: ResumeData["experience"][0]) => void;
  updateExperience: (index: number, exp: ResumeData["experience"][0]) => void;
  removeExperience: (index: number) => void;
  updateSkills: (skills: string[]) => void;
  addProject: (proj: ResumeData["projects"][0]) => void;
  updateProject: (index: number, proj: ResumeData["projects"][0]) => void;
  removeProject: (index: number) => void;
  addCertification: (cert: ResumeData["certifications"][0]) => void;
  removeCertification: (index: number) => void;
  setTemplateId: (id: string) => void;
  updateData: (data: Partial<ResumeData>) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  reset: () => void;
  fillDummyData: () => void;
  clearData: () => void;
}

const emptyData: ResumeData = {
  personalInfo: {
    fullName: "", email: "", phone: "", location: "", website: "", linkedin: "", jobTitle: "", github: "", avatar: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

const dummyData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    jobTitle: "Senior Software Engineer",
    github: "github.com/alexj",
    avatar: "",
  },
  summary: "Passionate software engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact products used by millions of users.",
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.Sc. Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
      description: "Dean's List. Focused on distributed systems and machine learning.",
    },
  ],
  experience: [
    {
      company: "Google",
      position: "Senior Software Engineer",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "Led development of core infrastructure serving 50M+ daily users. Reduced latency by 40% through architectural improvements and caching strategies.",
    },
    {
      company: "Stripe",
      position: "Software Engineer",
      startDate: "2019-07",
      endDate: "2021-12",
      current: false,
      description: "Built payment processing APIs handling $2B+ in annual transactions. Improved fraud detection accuracy by 25% using ML models.",
    },
  ],
  skills: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes", "GraphQL"],
  projects: [
    {
      name: "OpenTrack",
      description: "Open-source job application tracker with AI-powered insights, used by 10,000+ developers worldwide.",
      link: "github.com/alexj/opentrack",
      technologies: ["Next.js", "TypeScript", "Supabase"],
    },
  ],
  certifications: [
    {
      name: "AWS Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2023-04",
    },
  ],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      data: emptyData,
      templateId: "modern",
      userId: null,
      setUserId: (id) => set({ userId: id }),
      reset: () => set({ data: emptyData, templateId: "modern" }),
      fillDummyData: () => set({ data: dummyData }),
      clearData: () => set({ data: emptyData }),
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
        })),
      updateSummary: (summary) =>
        set((state) => ({ data: { ...state.data, summary } })),
      addEducation: (edu) =>
        set((state) => ({ data: { ...state.data, education: [...state.data.education, edu] } })),
      updateEducation: (index, edu) =>
        set((state) => {
          const education = [...state.data.education];
          education[index] = edu;
          return { data: { ...state.data, education } };
        }),
      removeEducation: (index) =>
        set((state) => ({
          data: { ...state.data, education: state.data.education.filter((_, i) => i !== index) },
        })),
      addExperience: (exp) =>
        set((state) => ({ data: { ...state.data, experience: [...state.data.experience, exp] } })),
      updateExperience: (index, exp) =>
        set((state) => {
          const experience = [...state.data.experience];
          experience[index] = exp;
          return { data: { ...state.data, experience } };
        }),
      removeExperience: (index) =>
        set((state) => ({
          data: { ...state.data, experience: state.data.experience.filter((_, i) => i !== index) },
        })),
      updateSkills: (skills) => set((state) => ({ data: { ...state.data, skills } })),
      addProject: (proj) =>
        set((state) => ({ data: { ...state.data, projects: [...state.data.projects, proj] } })),
      updateProject: (index, proj) =>
        set((state) => {
          const projects = [...state.data.projects];
          projects[index] = proj;
          return { data: { ...state.data, projects } };
        }),
      removeProject: (index) =>
        set((state) => ({
          data: { ...state.data, projects: state.data.projects.filter((_, i) => i !== index) },
        })),
      addCertification: (cert) =>
        set((state) => ({
          data: { ...state.data, certifications: [...state.data.certifications, cert] },
        })),
      removeCertification: (index) =>
        set((state) => ({
          data: { ...state.data, certifications: state.data.certifications.filter((_, i) => i !== index) },
        })),
      setTemplateId: (id) => set({ templateId: id }),
      updateData: (updates) =>
        set((state) => ({
          data: { ...state.data, ...updates },
        })),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
