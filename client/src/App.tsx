import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/hooks/use-progress";
import { Shield } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import Home from "@/pages/home";
import Modules from "@/pages/modules";
import ModuleDetail from "@/pages/module-detail";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Shield className="h-5 w-5 text-[var(--cyber-green)]" />
              <span className="text-slate-300 text-sm">&copy; 2024 Security Academy. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span>Built for cybersecurity professionals</span>
              <span>•</span>
              <span>Debian-based penetration testing</span>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <ProgressProvider>
            <AppLayout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/modules" component={Modules} />
                <Route path="/module/:id" component={ModuleDetail} />
                <Route component={NotFound} />
              </Switch>
            </AppLayout>
          </ProgressProvider>
        </TooltipProvider>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;