import { useLocation, Link } from "wouter";
import { Shield, Home, Book, Moon, Sun, Check, X } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useTheme } from "@/components/theme-provider";
import modules from "@/data/modules.json";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { getProgressPercentage, getCompletedCount, isModuleCompleted } = useProgress();
  const { theme, setTheme } = useTheme();

  const progressPercentage = getProgressPercentage();
  const completedCount = getCompletedCount();
  const estimatedHoursLeft = Math.max(0, 24 - (completedCount * 2));

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--cyber-green)] to-[var(--cyber-green-dark)] rounded-lg flex items-center justify-center">
              <Shield className="text-slate-950 w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--cyber-green)]">PenTest Pro</h1>
              <p className="text-xs text-slate-400">Debian Course</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Overview */}
        <div className="p-6 border-b border-slate-800">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Course Progress</span>
              <span className="text-[var(--cyber-green)] font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[var(--cyber-green)] to-[var(--cyber-green-dark)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>{completedCount} of 12 modules completed</span>
            <span>~{estimatedHoursLeft} hours left</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <Link href="/">
              <a className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group ${
                location === '/' 
                  ? 'bg-slate-800 text-[var(--cyber-green)]' 
                  : 'text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800'
              }`}>
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/modules">
              <a className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group ${
                location === '/modules' 
                  ? 'bg-slate-800 text-[var(--cyber-green)]' 
                  : 'text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800'
              }`}>
                <Book className="w-5 h-5" />
                <span>All Modules</span>
              </a>
            </Link>
            
            {/* Module List */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Course Modules
              </h3>
              <div className="space-y-1">
                {modules.map((module) => {
                  const isCompleted = isModuleCompleted(module.id);
                  const moduleNumber = parseInt(module.id.replace('module', ''));
                  
                  return (
                    <Link key={module.id} href={`/module/${module.id}`}>
                      <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group cursor-pointer ${
                        location === `/module/${module.id}`
                          ? 'bg-slate-800 text-[var(--cyber-green)]'
                          : 'text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-[var(--cyber-green)]' 
                            : 'border-2 border-slate-600'
                        }`}>
                          {isCompleted ? (
                            <Check className="text-slate-950 w-3 h-3" />
                          ) : (
                            <span className="text-slate-400 text-xs">{moduleNumber}</span>
                          )}
                        </div>
                        <span className="text-sm truncate">{module.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-between w-full px-3 py-2 text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Dark Mode</span>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${
              theme === "dark" ? 'bg-[var(--cyber-green)]' : 'bg-slate-600'
            }`}>
              <div className={`w-5 h-5 bg-slate-950 rounded-full absolute top-0.5 transition-transform ${
                theme === "dark" ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </div>
          </Button>
        </div>
      </div>
    </aside>
  );
}
