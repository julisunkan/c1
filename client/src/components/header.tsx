import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const getPageInfo = () => {
    if (location === "/") {
      return {
        title: "Welcome to PenTest Pro",
        subtitle: "Your journey to cybersecurity mastery begins here"
      };
    } else if (location === "/modules") {
      return {
        title: "All Modules",
        subtitle: "Choose a module to continue your learning journey"
      };
    } else if (location.startsWith("/module/")) {
      return {
        title: "Module Content",
        subtitle: "Learning cybersecurity through hands-on practice"
      };
    }
    return {
      title: "PenTest Pro",
      subtitle: "Ultimate Guide to Penetration Testing"
    };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden text-slate-400 hover:text-slate-100"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 w-64 pl-10 focus:border-[var(--cyber-green)] transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 bg-slate-800 text-slate-400 hover:text-[var(--cyber-green)] hover:bg-slate-700 transition-colors"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
