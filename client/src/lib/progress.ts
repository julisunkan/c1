// Utility functions for progress tracking and calculations

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  completedAt?: Date;
}

export interface CourseStats {
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
  estimatedHoursRemaining: number;
}

export const TOTAL_MODULES = 30;
export const ESTIMATED_TOTAL_HOURS = 65;

export function calculateProgressPercentage(completedCount: number): number {
  return Math.round((completedCount / TOTAL_MODULES) * 100);
}

export function calculateEstimatedHoursRemaining(completedCount: number): number {
  const averageHoursPerModule = ESTIMATED_TOTAL_HOURS / TOTAL_MODULES;
  const remainingModules = TOTAL_MODULES - completedCount;
  return Math.max(0, Math.round(remainingModules * averageHoursPerModule));
}

export function getCourseStats(completedModules: string[]): CourseStats {
  const completedCount = completedModules.length;
  
  return {
    totalModules: TOTAL_MODULES,
    completedModules: completedCount,
    progressPercentage: calculateProgressPercentage(completedCount),
    estimatedHoursRemaining: calculateEstimatedHoursRemaining(completedCount)
  };
}

export function getModuleStatus(moduleId: string, completedModules: string[]): 'completed' | 'not-started' {
  return completedModules.includes(moduleId) ? 'completed' : 'not-started';
}

export function getFilteredModules(modules: any[], filter: string, completedModules: string[]) {
  switch (filter) {
    case 'completed':
      return modules.filter(module => completedModules.includes(module.id));
    case 'not-started':
      return modules.filter(module => !completedModules.includes(module.id));
    case 'all':
    default:
      return modules;
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'text-green-400';
    case 'intermediate':
      return 'text-yellow-400';
    case 'advanced':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] border-[var(--cyber-green)]/20';
    case 'in-progress':
      return 'bg-amber-500/10 text-amber-400 border-amber-400/20';
    case 'not-started':
    default:
      return 'bg-slate-700 text-slate-400 border-slate-600';
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  PROGRESS: 'pentest-progress',
  THEME: 'pentest-theme',
  LAST_VISITED: 'pentest-last-visited'
} as const;

// Save last visited module
export function saveLastVisitedModule(moduleId: string): void {
  localStorage.setItem(STORAGE_KEYS.LAST_VISITED, moduleId);
}

// Get last visited module
export function getLastVisitedModule(): string | null {
  return localStorage.getItem(STORAGE_KEYS.LAST_VISITED);
}

// Format duration string
export function formatDuration(duration: string): string {
  return duration.replace(/(\d+)\s*(hour|hr|h)/i, '$1h')
    .replace(/(\d+)\s*(minute|min|m)/i, '$1m')
    .trim();
}

// Calculate module progress width for progress bars
export function getModuleProgressWidth(moduleId: string, completedModules: string[]): number {
  return completedModules.includes(moduleId) ? 100 : 0;
}

// Get progress bar color class
export function getProgressBarColor(moduleId: string, completedModules: string[]): string {
  return completedModules.includes(moduleId) ? 'bg-[var(--cyber-green)]' : 'bg-slate-700';
}

// Module navigation helpers
export function getNextModule(currentModuleId: string, modules: any[]): any | null {
  const currentIndex = modules.findIndex(m => m.id === currentModuleId);
  return currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;
}

export function getPreviousModule(currentModuleId: string, modules: any[]): any | null {
  const currentIndex = modules.findIndex(m => m.id === currentModuleId);
  return currentIndex > 0 ? modules[currentIndex - 1] : null;
}

// Search functionality
export function searchModules(modules: any[], query: string): any[] {
  if (!query.trim()) return modules;
  
  const lowerQuery = query.toLowerCase();
  return modules.filter(module => 
    module.title.toLowerCase().includes(lowerQuery) ||
    module.summary.toLowerCase().includes(lowerQuery)
  );
}

// Module completion tracking
export function getCompletionStats(modules: any[], completedModules: string[]) {
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0);
  const completedLessons = modules
    .filter(module => completedModules.includes(module.id))
    .reduce((sum, module) => sum + module.lessons, 0);

  return {
    totalLessons,
    completedLessons,
    lessonCompletionPercentage: Math.round((completedLessons / totalLessons) * 100)
  };
}
