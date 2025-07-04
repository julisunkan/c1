
import { createContext, useContext, useEffect, useState } from 'react';

interface ProgressContextType {
  completedModules: string[];
  markModuleCompleted: (moduleId: string) => void;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  isModuleCompleted: (moduleId: string) => boolean;
  toggleModuleCompletion: (moduleId: string) => void;
  getModuleProgress: (moduleId: string) => number;
  getTotalProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completed-modules');
    if (saved) {
      setCompletedModules(JSON.parse(saved));
    }
  }, []);

  const markModuleCompleted = (moduleId: string) => {
    setCompletedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev; // Already completed
      }
      const updated = [...prev, moduleId];
      localStorage.setItem('completed-modules', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => {
      const newCompleted = prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId];

      localStorage.setItem('completed-modules', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const getProgressPercentage = () => {
    const totalModules = 30;
    return (completedModules.length / totalModules) * 100;
  };

  const getCompletedCount = () => {
    return completedModules.length;
  };

  const isModuleCompleted = (moduleId: string) => {
    return completedModules.includes(moduleId);
  };

  const getModuleProgress = (moduleId: string) => {
    return completedModules.includes(moduleId) ? 100 : 0;
  };

  const getTotalProgress = () => {
    const totalModules = 12; // Based on the modules page displaying 12 modules
    return Math.round((completedModules.length / totalModules) * 100);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedModules, 
      markModuleCompleted, 
      getProgressPercentage,
      getCompletedCount,
      isModuleCompleted,
      toggleModuleCompletion,
      getModuleProgress,
      getTotalProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
