
"use client";

import { useState, useEffect } from "react";
import AuthScreen from "@/components/auth/auth-screen";
import Dashboard from "@/components/dashboard/dashboard";
import ProjectView from "@/components/calculator/project-view";
import { Toaster } from "@/components/ui/toaster";

export default function BuildEstimateApp() {
  const [user, setUser] = useState<{ phone: string; name?: string } | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("buildestimate_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleLogin = (phone: string, name: string) => {
    const newUser = { phone, name };
    setUser(newUser);
    localStorage.setItem("buildestimate_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("buildestimate_user");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background shadow-xl overflow-hidden relative border-x">
      {!user ? (
        <AuthScreen onLogin={handleLogin} />
      ) : activeProject ? (
        <ProjectView 
          projectId={activeProject} 
          onBack={() => setActiveProject(null)} 
        />
      ) : (
        <Dashboard 
          user={user} 
          onLogout={handleLogout} 
          onSelectProject={setActiveProject} 
        />
      )}
      <Toaster />
    </div>
  );
}
