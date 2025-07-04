import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { Book, CheckCircle, Clock } from "lucide-react";
import modules from "@/data/modules.json";

type FilterType = "all" | "completed" | "in-progress" | "not-started";

export default function Modules() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { getCompletedCount, isModuleCompleted } = useProgress();

  const completedCount = getCompletedCount();
  const totalHours = modules.reduce((acc, module) => {
    const hours = parseFloat(module.duration.split(' ')[0]);
    return acc + hours;
  }, 0);

  const filteredModules = modules.filter(module => {
    const isCompleted = isModuleCompleted(module.id);
    
    switch (activeFilter) {
      case "completed":
        return isCompleted;
      case "not-started":
        return !isCompleted;
      default:
        return true;
    }
  });

  const getModuleStatus = (moduleId: string) => {
    const isCompleted = isModuleCompleted(moduleId);
    
    if (isCompleted) {
      return { label: "Completed", className: "bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] border-[var(--cyber-green)]/20" };
    } else {
      return { label: "Not Started", className: "bg-slate-700 text-slate-400 border-slate-600" };
    }
  };

  const getProgressWidth = (moduleId: string) => {
    return isModuleCompleted(moduleId) ? 100 : 0;
  };

  const getProgressColor = (moduleId: string) => {
    return isModuleCompleted(moduleId) ? "bg-[var(--cyber-green)]" : "bg-slate-700";
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Modules</p>
                <p className="text-2xl font-bold text-slate-100">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Book className="text-blue-400 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-[var(--cyber-green)]">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-[var(--cyber-green)]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-[var(--cyber-green)] w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Estimated Time</p>
                <p className="text-2xl font-bold text-slate-100">{Math.ceil(totalHours)}h</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Clock className="text-amber-400 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 p-1 bg-slate-900 rounded-lg w-fit">
        {([
          { key: "all", label: "All Modules" },
          { key: "completed", label: "Completed" },
          { key: "not-started", label: "Not Started" }
        ] as const).map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === key
                ? 'bg-[var(--cyber-green)] text-slate-950'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const status = getModuleStatus(module.id);
          const progressWidth = getProgressWidth(module.id);
          const progressColor = getProgressColor(module.id);
          
          return (
            <Link key={module.id} href={`/module/${module.id}`}>
              <Card className="bg-slate-900 border-slate-800 hover:border-[var(--cyber-green)]/30 transition-colors group cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center`}>
                      <i className={`${module.icon} text-white`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={status.className}>
                        {status.label}
                      </Badge>
                      {isModuleCompleted(module.id) && (
                        <CheckCircle className="text-[var(--cyber-green)] w-4 h-4" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-[var(--cyber-green)] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{module.summary}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>
                      <Clock className="inline w-3 h-3 mr-1" />
                      {module.duration}
                    </span>
                    <span>
                      <Book className="inline w-3 h-3 mr-1" />
                      {module.lessons} lessons
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-800 rounded-full h-1">
                    <div 
                      className={`${progressColor} h-1 rounded-full transition-all duration-500`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
