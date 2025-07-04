The prompt requests modifications to the sidebar component, adding color, animations, and transitions to improve the visual appeal. The changes involve updating the background, text colors, adding animations like pulse and floating effects, and using gradients for a more vibrant look.
```

```replit_final_file
import { Link, useLocation } from "wouter";
import { Book, Home, GraduationCap, Shield, CheckCircle } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import modules from "@/data/modules.json";

export default function Sidebar() {
  const [location] = useLocation();
  const { getTotalProgress, isModuleCompleted } = useProgress();

  const progress = getTotalProgress();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/modules", icon: Book, label: "All Modules" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border-r border-white/20 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-[var(--cyber-green)] animate-pulse" />
          <div>
            <h1 className="text-xl font-bold text-white rainbow-text">&lt;/&gt;</h1>
            <p className="text-sm text-slate-300">Security Academy</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Progress</span>
            <span className="text-sm text-slate-300">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-2 mb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-medium shadow-md"
                      : "text-slate-300 hover:bg-white/10 hover:text-cyan-200"
                  }`}
                >
                  <Icon className="h-5 w-5 animate-pulse" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/20 pt-4">
          <h3 className="text-sm font-medium text-slate-300 mb-3 px-3 rainbow-text">Modules</h3>
          <div className="space-y-1">
            {modules.map((module) => {
              const isActive = location === `/module/${module.id}`;
              const isCompleted = isModuleCompleted(module.id);

              return (
                <Link key={module.id} href={`/module/${module.id}`}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm hover:bg-white/10 hover:transform hover:scale-105 hover:shadow-lg ${
                      isActive
                        ? "bg-white/10 shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-[var(--cyber-green)] animate-pulse" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-600" />
                    )}
                    <span className="truncate">{module.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-2 text-slate-300">
          <GraduationCap className="h-4 w-4 animate-pulse" />
          <span className="text-sm">Cybersecurity Course</span>
        </div>
      </div>
    </aside>
  );
}