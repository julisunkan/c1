
import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import modules from "@/data/modules.json";

export default function Header() {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    if (location === "/") return "Dashboard";
    if (location === "/modules") return "All Modules";
    if (location.startsWith("/module/")) {
      const moduleId = location.split("/")[2];
      const module = modules.find(m => m.id === moduleId);
      return module ? module.title : "Module";
    }
    return "Page";
  };

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const handleModuleSelect = (moduleId: string) => {
    navigate(`/module/${moduleId}`);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredModules.length > 0) {
      handleModuleSelect(filteredModules[0].id);
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-semibold text-slate-100">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchTerm && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="pl-10 w-64 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-[var(--cyber-green)]"
              />
            </form>
            
            {showResults && filteredModules.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-800 border-slate-700">
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-auto">
                    {filteredModules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleSelect(module.id)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0"
                      >
                        <div className="font-medium text-slate-200 text-sm">{module.title}</div>
                        <div className="text-slate-400 text-xs mt-1 line-clamp-2">{module.description}</div>
                        <div className="text-[var(--cyber-green)] text-xs mt-1">{module.category} • {module.difficulty}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {showResults && searchTerm && filteredModules.length === 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-800 border-slate-700">
                <CardContent className="p-4 text-center">
                  <p className="text-slate-400 text-sm">No modules found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
