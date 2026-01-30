"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus, 
  Users, 
  IndianRupee, 
  Bell, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Settings,
  LogOut,
  Home,
  FileText
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { sendRentDueNotification } from "@/ai/flows/rent-due-notifications";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface LandlordViewProps {
  user: { phone: string; name?: string };
  onLogout: () => void;
}

export default function LandlordView({ user, onLogout }: LandlordViewProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"home" | "properties" | "tenants" | "notifications">("home");

  const properties = [
    { id: 1, name: "Srinivasa Residency", address: "HSR Layout, Bangalore", units: 12, occupied: 10, image: PlaceHolderImages[1].imageUrl },
    { id: 2, name: "Maple Heights", address: "Indiranagar, Bangalore", units: 8, occupied: 8, image: PlaceHolderImages[2].imageUrl },
  ];

  const handleSendReminder = async () => {
    try {
      const result = await sendRentDueNotification({
        tenantName: "Arun Kumar",
        unitNumber: "102",
        rentAmount: 18000,
        dueDate: "2024-05-05",
        daysUntilDue: 3,
      });
      
      toast({
        title: result.title,
        description: result.message,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send notification",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight">Welcome, {user.name}</h2>
            <p className="text-xs text-muted-foreground">Landlord Admin</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut size={16} className="mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === "home" ? (
          <div className="p-4 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-4 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <IndianRupee size={18} />
                  </div>
                  <p className="text-2xl font-bold">₹1.4L</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Collected</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-4 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                  <p className="text-2xl font-bold">₹28k</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Pending</p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1 h-12 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20">
                <Plus size={20} /> Add Property
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-2xl gap-2 font-bold" onClick={handleSendReminder}>
                <Bell size={18} /> Send All Reminders
              </Button>
            </div>

            {/* Properties List */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-lg">My Properties</h3>
                <Button variant="link" className="text-primary font-bold">View All</Button>
              </div>
              <div className="space-y-4">
                {properties.map((prop) => (
                  <Card key={prop.id} className="border-none shadow-lg rounded-2xl overflow-hidden group">
                    <div className="relative h-32 w-full">
                      <Image 
                        src={prop.image} 
                        alt={prop.name} 
                        fill 
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="property house"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-4 text-white">
                        <h4 className="font-bold text-lg">{prop.name}</h4>
                        <p className="text-xs opacity-80 flex items-center"><Home size={10} className="mr-1" /> {prop.address}</p>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-white/90 text-primary border-none font-bold">
                        {prop.occupied}/{prop.units} Occupied
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-muted flex items-center justify-center overflow-hidden">
                              <Image src={`https://picsum.photos/seed/user${i}/30/30`} alt="user" width={30} height={30} />
                            </div>
                          ))}
                        </div>
                        <span className="text-muted-foreground text-xs font-medium">10 Tenants</span>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronRight size={20} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground p-8 text-center">
            <p>Coming soon: Manage {activeTab} section for complete control over your rental business.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t h-20 px-6 flex items-center justify-between z-20">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home size={24} strokeWidth={activeTab === "home" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab("properties")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "properties" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Building2 size={24} strokeWidth={activeTab === "properties" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Properties</span>
        </button>
        <button 
          onClick={() => setActiveTab("tenants")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "tenants" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Users size={24} strokeWidth={activeTab === "tenants" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Tenants</span>
        </button>
        <button 
          onClick={() => setActiveTab("notifications")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "notifications" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Bell size={24} strokeWidth={activeTab === "notifications" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
      </nav>
    </div>
  );
}
