import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ProgressContextType {
  completedModules: string[];
  toggleModuleCompletion: (moduleId: string) => void;
  markModuleComplete: (moduleId: string) => void;
  getModuleProgress: (moduleId: string) => number;
  getTotalProgress: () => number;
  getCompletedCount: () => number;
  isModuleCompleted: (moduleId: string) => boolean;
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

  const markModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev; // Already completed
      }
      const newCompleted = [...prev, moduleId];
      localStorage.setItem("completed-modules", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const getTotalProgress = () => {
    const totalModules = 12; // Total number of modules
    return Math.round((completedModules.length / totalModules) * 100);
  };

  const getCompletedCount = () => {
    return completedModules.length;
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  return (
    <ProgressContext.Provider value={{
      completedModules,
      toggleModuleCompletion,
      markModuleComplete,
      getModuleProgress,
      getTotalProgress,
      getCompletedCount,
      isModuleCompleted
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