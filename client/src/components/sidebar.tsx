
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Target, 
  Award,
  Menu,
  X,
  Home,
  Users,
  Settings,
  CheckCircle
} from "lucide-react";
import modules from "@/data/modules.json";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [location] = useLocation();
  const { completedModules, getProgressPercentage } = useProgress();

  const progressPercentage = getProgressPercentage();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-green-400 to-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeSidebar}>
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg transform group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  &lt;/&gt;
                </h1>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  Penetration Testing
                </p>
              </div>
            </div>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={closeSidebar}
            className="md:hidden text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="relative z-10 p-6 border-b border-slate-700/50">
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center">
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Completed</span>
                <span className="text-emerald-400 font-semibold">
                  {completedModules.length}/30 modules
                </span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-2 bg-slate-700"
              />
              <div className="text-xs text-slate-500">
                {progressPercentage.toFixed(0)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          <Link href="/" onClick={closeSidebar}>
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
              location === "/" 
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30" 
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}>
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>
          
          <Link href="/modules" onClick={closeSidebar}>
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
              location === "/modules" 
                ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30" 
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}>
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">All Modules</span>
            </div>
          </Link>
        </div>

        {/* Module List */}
        <div className="px-4 pb-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Learning Modules
          </h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {modules.slice(0, 30).map((module, index) => {
              const isCompleted = completedModules.includes(module.id);
              const isActive = location === `/module/${module.id}`;
              
              return (
                <Link key={module.id} href={`/module/${module.id}`} onClick={closeSidebar}>
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${
                    isActive 
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30" 
                      : isCompleted
                      ? "bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}>
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                        isCompleted 
                          ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white"
                          : isActive
                          ? "bg-gradient-to-br from-purple-400 to-pink-500 text-white"
                          : "bg-slate-700 text-slate-400 group-hover:bg-slate-600"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className="text-sm font-medium truncate group-hover:text-white transition-colors">
                        {module.title}
                      </span>
                    </div>
                    {isCompleted && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-2">
            Ultimate Guide to Penetration Testing
          </p>
          <Badge 
            variant="outline" 
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            Debian-based OS
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 flex-shrink-0">
        <div className="fixed top-0 left-0 w-80 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <SidebarContent />
      </div>
    </>
  );
}
