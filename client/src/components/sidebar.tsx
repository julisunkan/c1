import { Link, useLocation } from "wouter";
import { Book, Home, GraduationCap, Shield } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";

export default function Sidebar() {
  const [location] = useLocation();
  const { getTotalProgress } = useProgress();

  const progress = getTotalProgress();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/modules", icon: Book, label: "Modules" },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-[var(--cyber-green)]" />
          <div>
            <h1 className="text-xl font-bold text-white">CyberSec</h1>
            <p className="text-sm text-slate-400">Security Academy</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Progress</span>
            <span className="text-sm text-slate-400">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--cyber-green)] text-black font-medium"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-slate-400">
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm">Cybersecurity Course</span>
        </div>
      </div>
    </aside>
  );
}