
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ProgressContextType {
  completedModules: string[];
  toggleModuleComplete: (moduleId: string) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  getTotalProgress: () => number;
  getModuleProgress: (moduleId: string) => number;
  markModuleComplete: (moduleId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const TOTAL_MODULES = 12;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("completed-modules");
    if (saved) {
      try {
        setCompletedModules(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse completed modules from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completed-modules", JSON.stringify(completedModules));
  }, [completedModules]);

  const toggleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const markModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  const getProgressPercentage = () => {
    return Math.round((completedModules.length / TOTAL_MODULES) * 100);
  };

  const getCompletedCount = () => {
    return completedModules.length;
  };

  const getTotalProgress = () => {
    return getProgressPercentage();
  };

  const getModuleProgress = (moduleId: string) => {
    return isModuleCompleted(moduleId) ? 100 : 0;
  };

  return (
    <ProgressContext.Provider value={{
      completedModules,
      toggleModuleComplete,
      isModuleCompleted,
      getProgressPercentage,
      getCompletedCount,
      getTotalProgress,
      getModuleProgress,
      markModuleComplete,
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
