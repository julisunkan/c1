import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HandHeart, Award, Users, Book, Clock, Infinity } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
          alt="Professional cybersecurity workspace with multiple monitors" 
          className="rounded-2xl shadow-2xl w-full h-64 object-cover mb-8"
        />

        <h1 className="text-5xl font-bold text-slate-100 mb-6">
          Ultimate Guide to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyber-green)] to-blue-400">
            Penetration Testing
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
          Master ethical hacking with Debian-based operating systems. Learn industry-standard penetration testing techniques through hands-on labs and real-world scenarios.
        </p>
        <Link href="/modules">
          <Button className="px-8 py-4 bg-gradient-to-r from-[var(--cyber-green)] to-[var(--cyber-green-dark)] text-slate-950 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[var(--cyber-green)]/25 transition-all">
            Start Learning
          </Button>
        </Link>
      </div>

      {/* Course Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-[var(--cyber-green)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HandHeart className="text-[var(--cyber-green)] w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Hands-On Learning</h3>
          <p className="text-slate-400">Practice with real vulnerable systems in safe, controlled environments</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="text-blue-400 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Industry Standards</h3>
          <p className="text-slate-400">Learn techniques used by professional penetration testers worldwide</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="text-purple-400 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Expert Support</h3>
          <p className="text-slate-400">Get guidance from experienced cybersecurity professionals</p>
        </div>
      </div>

      {/* Course Stats */}
      <Card className="bg-slate-900 border-slate-800 mb-12">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--cyber-green)] mb-2">12</div>
              <div className="text-slate-400">Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">24+</div>
              <div className="text-slate-400">Hours</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-slate-400">Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-2">∞</div>
              <div className="text-slate-400">Lifetime Access</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-100 text-center mb-8">Your Learning Journey</h2>
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 hover:border-[var(--cyber-green)]/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-[var(--cyber-green)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-950 font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">Foundation Building</h3>
                  <p className="text-slate-400">Master Linux fundamentals and set up your penetration testing laboratory</p>
                </div>
                <div className="text-[var(--cyber-green)] font-medium">3 modules</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">Information Gathering</h3>
                  <p className="text-slate-400">Learn reconnaissance techniques and vulnerability discovery methods</p>
                </div>
                <div className="text-blue-400 font-medium">2 modules</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-purple-500/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">Exploitation & Access</h3>
                  <p className="text-slate-400">Exploit vulnerabilities and gain unauthorized access to target systems</p>
                </div>
                <div className="text-purple-400 font-medium">3 modules</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-950 font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">Advanced Topics</h3>
                  <p className="text-slate-400">Web application testing, wireless attacks, and professional reporting</p>
                </div>
                <div className="text-amber-400 font-medium">4 modules</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}