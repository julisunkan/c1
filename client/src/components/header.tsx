import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import modules from "@/data/modules.json";
import { Link } from "wouter";

export default function Header() {
  const [location, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progress = 75; // Example progress value. Replace with actual progress calculation if needed.

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
    <header className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-xl text-white p-4 border-b border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold hover:text-cyan-400 transition-all duration-300 hover:scale-110 rainbow-text">
            &lt;/&gt;
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/modules" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group">
              Modules
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Progress: {Math.round(progress)}%</span>
          <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}