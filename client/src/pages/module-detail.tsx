import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { ArrowLeft, ArrowRight, Clock, Book, CheckCircle } from "lucide-react";
import modules from "@/data/modules.json";

export default function ModuleDetail() {
  const { id } = useParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { isModuleCompleted, toggleModuleComplete } = useProgress();

  const module = modules.find(m => m.id === id);
  const moduleIndex = modules.findIndex(m => m.id === id);
  const previousModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  useEffect(() => {
    if (module) {
      console.log(`Attempting to load module content: /modules/${module.id}.html`);
      fetch(`/modules/${module.id}.html`)
        .then(response => {
          console.log(`Fetch response status: ${response.status}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(html => {
          console.log(`Module content loaded successfully, length: ${html.length}`);
          setContent(html);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error loading module content:", error);
          setContent(`<div class="text-red-400"><h3>Error loading module content</h3><p>Failed to load content for ${module.id}. Please check that the file exists and try again.</p><p>Error: ${error.message}</p></div>`);
          setLoading(false);
        });
    }
  }, [module]);

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-100 mb-4">Module Not Found</h1>
            <p className="text-slate-400 mb-6">The requested module could not be found.</p>
            <Link href="/modules">
              <Button>Back to Modules</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCompleted = isModuleCompleted(module.id);
  const moduleNumber = parseInt(module.id.replace('module', ''));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                <i className={`${module.icon} text-white text-2xl`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">{module.title}</h1>
                <p className="text-slate-400">{module.summary}</p>
              </div>
            </div>
            <Button
              onClick={() => toggleModuleComplete(module.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCompleted
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-[var(--cyber-green)] text-slate-950 hover:bg-[var(--cyber-green-dark)]'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                'Mark Complete'
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-100">{module.duration.split(' ')[0]}</div>
              <div className="text-sm text-slate-400">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-100">{module.lessons}</div>
              <div className="text-sm text-slate-400">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{module.difficulty}</div>
              <div className="text-sm text-slate-400">Difficulty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--cyber-green)]">
                {isCompleted ? '100%' : '0%'}
              </div>
              <div className="text-sm text-slate-400">Progress</div>
            </div>
          </div>

          <div className="mt-6 w-full bg-slate-800 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-[var(--cyber-green)]' : 'bg-slate-700'
              }`}
              style={{ width: isCompleted ? '100%' : '0%' }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Module Content */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--cyber-green)] mx-auto"></div>
              <p className="text-slate-400 mt-4">Loading module content...</p>
            </div>
          ) : (
            <div 
              className="module-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          
          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-800 mt-8">
            {previousModule ? (
              <Link href={`/module/${previousModule.id}`}>
                <Button variant="ghost" className="text-slate-400 hover:text-slate-100">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Module
                </Button>
              </Link>
            ) : (
              <div />
            )}
            
            {nextModule ? (
              <Link href={`/module/${nextModule.id}`}>
                <Button className="bg-[var(--cyber-green)] text-slate-950 hover:bg-[var(--cyber-green-dark)]">
                  Next Module
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/modules">
                <Button className="bg-[var(--cyber-green)] text-slate-950 hover:bg-[var(--cyber-green-dark)]">
                  Back to Modules
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
