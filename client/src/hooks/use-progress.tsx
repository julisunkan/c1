import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ProgressContextType {
  completedModules: string[];
  toggleModuleCompletion: (moduleId: string) => void;
  getModuleProgress: (moduleId: string) => number;
  getTotalProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("completed-modules");
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const toggleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => {
      const newCompleted = prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];

      localStorage.setItem("completed-modules", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const getModuleProgress = (moduleId: string) => {
    return completedModules.includes(moduleId) ? 100 : 0;
  };

  const getTotalProgress = () => {
    const totalModules = 12; // Total number of modules
    return Math.round((completedModules.length / totalModules) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedModules,
      toggleModuleCompletion,
      getModuleProgress,
      getTotalProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}