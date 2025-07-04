
import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Clock, Target, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import modules from "@/data/modules.json";

export default function ModuleDetail() {
  const [, params] = useRoute("/module/:id");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getModuleProgress, markModuleComplete } = useProgress();

  const module = modules.find(m => m.id === params?.id);
  const progress = module ? getModuleProgress(module.id) : 0;

  useEffect(() => {
    if (module) {
      setLoading(true);
      setError(null);
      
      fetch(`/modules/${module.id}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load module content (${response.status})`);
          }
          return response.text();
        })
        .then(html => {
          setContent(html);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading module content:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [module]);

  const handleMarkComplete = () => {
    if (module) {
      markModuleComplete(module.id);
    }
  };

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-100 mb-4">Module Not Found</h1>
            <p className="text-slate-400 mb-6">The requested module could not be found.</p>
            <Link href="/modules">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Modules
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/modules">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
        </Link>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            {module.difficulty}
          </Badge>
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            <Clock className="w-3 h-3 mr-1" />
            {module.duration}
          </Badge>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-slate-100 mb-2">
                {module.title}
              </CardTitle>
              <p className="text-slate-400">{module.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-2">Progress</div>
              <div className="flex items-center space-x-2">
                <Progress value={progress} className="w-24" />
                <span className="text-sm font-medium text-[var(--cyber-green)]">
                  {progress.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 text-slate-400">
              <Target className="w-4 h-4" />
              <span>Learning Objectives</span>
            </div>
            {progress < 100 && (
              <Button 
                onClick={handleMarkComplete}
                className="bg-[var(--cyber-green)] text-black hover:bg-[var(--cyber-green)]/90"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}
            {progress === 100 && (
              <Badge className="bg-[var(--cyber-green)] text-black">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--cyber-green)] mx-auto mb-4"></div>
              <p className="text-slate-400">Loading module content...</p>
            </div>
          )}
          {error && (
            <div className="p-8 text-center">
              <div className="text-red-400 mb-4">
                <h3 className="text-lg font-semibold mb-2">Error loading module content</h3>
                <p>Failed to load content for {module.id}</p>
                <p className="text-sm mt-2">Error: {error}</p>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
              >
                Try Again
              </Button>
            </div>
          )}
          {!loading && !error && (
            <div 
              className="module-content p-8 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
