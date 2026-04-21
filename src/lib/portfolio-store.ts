import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "./safe-storage";

export interface PortfolioData {
  templateId: string;
  themeColor: string;
  isPublic: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  sectionsVisibility: {
    hero: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    blog: boolean;
    contact: boolean;
  };
}

interface PortfolioStore {
  data: PortfolioData;
  updateData: (data: Partial<PortfolioData>) => void;
  updateSocialLink: (key: keyof PortfolioData["socialLinks"], value: string) => void;
  toggleSection: (key: keyof PortfolioData["sectionsVisibility"]) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  reset: () => void;
}

const initialData: PortfolioData = {
  templateId: "modern",
  themeColor: "#4f46e5",
  isPublic: true,
  socialLinks: {},
  sectionsVisibility: {
    hero: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    blog: true,
    contact: true,
  },
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: initialData,
      userId: null,
      setUserId: (id) => set({ userId: id }),
      reset: () => set({ data: initialData }),
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      updateSocialLink: (key, value) =>
        set((state) => ({
          data: {
            ...state.data,
            socialLinks: { ...state.data.socialLinks, [key]: value },
          },
        })),
      toggleSection: (key) =>
        set((state) => ({
          data: {
            ...state.data,
            sectionsVisibility: {
              ...state.data.sectionsVisibility,
              [key]: !state.data.sectionsVisibility[key],
            },
          },
        })),
    }),
    {
      name: "portfolio-storage",
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
