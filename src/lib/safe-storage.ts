import { StateStorage } from 'zustand/middleware';

export const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      const str = localStorage.getItem(name);
      if (!str) return null;
      JSON.parse(str); // Test parsing to catch corrupted states immediately
      return str;
    } catch (e) {
      console.warn(`Corrupted local storage for ${name}, clearing it.`);
      localStorage.removeItem(name);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      console.warn(`Unable to save ${name} to local storage`, e);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (e) {}
  },
};
