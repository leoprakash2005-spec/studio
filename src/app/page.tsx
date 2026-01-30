"use client";

import { useState, useEffect } from "react";
import AuthScreen from "@/components/auth/auth-screen";
import LandlordDashboard from "@/components/dashboard/landlord-view";
import TenantDashboard from "@/components/dashboard/tenant-view";
import { Toaster } from "@/components/ui/toaster";

export type UserRole = "landlord" | "tenant" | null;

export default function RentEaseApp() {
  const [user, setUser] = useState<{ phone: string; name?: string; role: UserRole } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading local session
    const savedUser = localStorage.getItem("rentease_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleLogin = (phone: string) => {
    setUser({ phone, role: null });
  };

  const handleRoleSelect = (role: UserRole, name: string) => {
    if (user) {
      const updatedUser = { ...user, role, name };
      setUser(updatedUser);
      localStorage.setItem("rentease_user", JSON.stringify(updatedUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("rentease_user");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background shadow-xl overflow-hidden relative">
      {!user || !user.role ? (
        <AuthScreen 
          onLogin={handleLogin} 
          onRoleSelect={handleRoleSelect} 
          currentUser={user}
        />
      ) : user.role === "landlord" ? (
        <LandlordDashboard user={user} onLogout={handleLogout} />
      ) : (
        <TenantDashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
}
