import { Book, Home, Shield, Terminal, Users, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import modules from "@/data/modules.json";

export default function Sidebar() {
  const [location] = useLocation();
  const { getModuleProgress, getTotalProgress } = useProgress();

  const totalProgress = getTotalProgress();

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-[var(--cyber-green)]" />
          <div>
            <h2 className="text-xl font-bold text-slate-100">PenTest Pro</h2>
            <p className="text-sm text-slate-400">Debian Security Course</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-[var(--cyber-green)]">{totalProgress.toFixed(0)}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          <Link href="/">
            <Button
              variant={location === "/" ? "default" : "ghost"}
              className={`w-full justify-start ${
                location === "/" 
                  ? "bg-slate-800 text-[var(--cyber-green)] hover:bg-slate-800" 
                  : "text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800"
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Button>
          </Link>

          <Link href="/modules">
            <Button
              variant={location === "/modules" ? "default" : "ghost"}
              className={`w-full justify-start ${
                location === "/modules" 
                  ? "bg-slate-800 text-[var(--cyber-green)] hover:bg-slate-800" 
                  : "text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800"
              }`}
            >
              <Book className="w-5 h-5 mr-3" />
              All Modules
            </Button>
          </Link>

          <div className="pt-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2 px-3">MODULES</h3>
            <div className="space-y-1">
              {modules.map((module) => {
                const progress = getModuleProgress(module.id);
                const isActive = location === `/module/${module.id}`;

                return (
                  <Link key={module.id} href={`/module/${module.id}`}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left p-3 h-auto ${
                        isActive 
                          ? "bg-slate-800 text-[var(--cyber-green)]" 
                          : "text-slate-300 hover:text-[var(--cyber-green)] hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Terminal className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {module.title}
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {module.description}
                          </div>
                        </div>
                        {progress === 100 && (
                          <Badge variant="secondary" className="bg-[var(--cyber-green)] text-black text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 text-sm text-slate-400">
          <Users className="w-4 h-4" />
          <span>Debian PenTest Course</span>
        </div>
      </div>
    </aside>
  );
}
```