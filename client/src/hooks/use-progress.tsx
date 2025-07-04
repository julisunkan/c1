import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressContextType {
  completedModules: string[];
  toggleModuleComplete: (moduleId: string) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pentest-progress");
    if (saved) {
      try {
        setCompletedModules(JSON.parse(saved));
      } catch {
        setCompletedModules([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pentest-progress", JSON.stringify(completedModules));
  }, [completedModules]);

  const toggleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  const getProgressPercentage = () => {
    return Math.round((completedModules.length / 12) * 100);
  };

  const getCompletedCount = () => {
    return completedModules.length;
  };

  return (
    <ProgressContext.Provider value={{
      completedModules,
      toggleModuleComplete,
      isModuleCompleted,
      getProgressPercentage,
      getCompletedCount
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
