
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Building2, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  HardHat,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardProps {
  user: { name?: string };
  onLogout: () => void;
  onSelectProject: (id: string) => void;
}

export default function Dashboard({ user, onLogout, onSelectProject }: DashboardProps) {
  const [projects] = useState([
    { id: "1", name: "Modern Villa - Sector 45", type: "Residential", area: 2400, cost: 4500000 },
    { id: "2", name: "Office Renovation", type: "Commercial", area: 1200, cost: 850000 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <Building2 size={20} />
          </div>
          <h1 className="font-bold text-lg">BuildEstimate</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout} className="text-muted-foreground">
          <LogOut size={18} />
        </Button>
      </header>

      <main className="p-4 space-y-6 pb-20">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Hello, {user.name}</h2>
          <p className="text-muted-foreground text-sm">You have {projects.length} active estimates.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-none shadow-sm bg-primary text-white">
            <CardContent className="p-4 space-y-2">
              <TrendingUp size={24} />
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80">Total Estimates</p>
                <p className="text-xl font-bold">₹53.5L</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 space-y-2">
              <HardHat size={24} className="text-primary" />
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Area Tracked</p>
                <p className="text-xl font-bold">3,600 <span className="text-xs font-normal">sqft</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
          <Input placeholder="Search projects..." className="pl-10 h-11 bg-white border-none shadow-sm rounded-xl" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Recent Projects</h3>
            <Button variant="link" size="sm" className="text-primary">See All</Button>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <Card 
                key={p.id} 
                className="border-none shadow-sm bg-white hover:ring-2 ring-primary/20 transition-all cursor-pointer"
                onClick={() => onSelectProject(p.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">{p.name}</h4>
                      <p className="text-xs text-muted-foreground">{p.type} • {p.area} sqft</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[200px] px-4">
        <Button className="w-full h-14 rounded-full shadow-xl shadow-primary/30 font-bold gap-2">
          <Plus size={20} /> NEW ESTIMATE
        </Button>
      </div>
    </div>
  );
}
