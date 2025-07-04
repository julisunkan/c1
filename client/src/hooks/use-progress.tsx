import { createContext, useContext, useEffect, useState } from 'react';

interface ProgressContextType {
  completedModules: string[];
  markModuleCompleted: (moduleId: string) => void;
  getProgressPercentage: () => number;
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
      const updated = [...prev, moduleId];
      localStorage.setItem('completed-modules', JSON.stringify(updated));
      return updated;
    });
  };

  const getProgressPercentage = () => {
    const totalModules = 30;
    return (completedModules.length / totalModules) * 100;
  };

  return (
    <ProgressContext.Provider value={{ 
      completedModules, 
      markModuleCompleted, 
      getProgressPercentage 
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