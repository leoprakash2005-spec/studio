"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee, 
  CreditCard, 
  History, 
  Bell, 
  Download, 
  LogOut, 
  Settings,
  Calendar,
  AlertCircle,
  FileText,
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface TenantViewProps {
  user: { phone: string; name?: string };
  onLogout: () => void;
}

export default function TenantView({ user, onLogout }: TenantViewProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"home" | "history" | "agreement">("home");
  const [isProcessing, setIsProcessing] = useState(false);

  const rentData = {
    unit: "Flat 102",
    property: "Srinivasa Residency",
    address: "HSR Layout, Bangalore",
    amount: 18000,
    dueDate: "05 May 2024",
    status: "unpaid",
    lateFee: 0,
  };

  const handlePayRent = () => {
    setIsProcessing(true);
    // Simulate Razorpay checkout
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Rent for May 2024 has been paid. Transaction ID: #TXN89274",
      });
    }, 2000);
  };

  const history = [
    { id: 1, month: "April 2024", amount: 18000, date: "04 Apr 2024", method: "UPI" },
    { id: 2, month: "March 2024", amount: 18000, date: "05 Mar 2024", method: "Netbanking" },
    { id: 3, month: "February 2024", amount: 18000, date: "04 Feb 2024", method: "UPI" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <Image src="https://picsum.photos/seed/user-tenant/40/40" alt="Avatar" width={40} height={40} className="rounded-full" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight">{user.name}</h2>
            <p className="text-xs text-muted-foreground">Tenant @ {rentData.unit}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
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
            {/* Rent Due Card */}
            <Card className="border-none shadow-2xl rounded-3xl bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <CreditCard size={120} />
              </div>
              <CardContent className="p-6 space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Next Rent Due</p>
                    <h3 className="text-4xl font-black">₹{rentData.amount.toLocaleString()}</h3>
                  </div>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                    Due in 3 days
                  </Badge>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-2 opacity-70" />
                    <span>Pay by <span className="font-bold">{rentData.dueDate}</span></span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={14} className="mr-2 opacity-70" />
                    <span>{rentData.property}, {rentData.unit}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayRent}
                  disabled={isProcessing}
                  className="w-full h-14 rounded-2xl bg-white text-primary font-black text-lg hover:bg-white/90 shadow-xl"
                >
                  {isProcessing ? "Processing..." : "PAY NOW"}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 rounded-2xl flex flex-col gap-1 border-primary/20 bg-white"
                onClick={() => setActiveTab("agreement")}
              >
                <FileText className="text-primary" />
                <span className="font-bold text-xs">Agreement</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 rounded-2xl flex flex-col gap-1 border-primary/20 bg-white"
                onClick={() => setActiveTab("history")}
              >
                <History className="text-primary" />
                <span className="font-bold text-xs">Receipts</span>
              </Button>
            </div>

            {/* Maintenance / Help */}
            <Card className="border-none shadow-md rounded-2xl bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <AlertCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Maintenance Request</h4>
                    <p className="text-[10px] text-muted-foreground">Report issues with your unit</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="rounded-full">
                  <ArrowUpRight size={18} />
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : activeTab === "history" ? (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Payment History</h3>
              <Button variant="ghost" onClick={() => setActiveTab("home")}>Back</Button>
            </div>
            {history.map((payment) => (
              <Card key={payment.id} className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                      <Download size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{payment.month}</h4>
                      <p className="text-xs text-muted-foreground">Paid on {payment.date} via {payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-[10px] uppercase font-black text-green-600/60">Success</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Rental Agreement</h3>
              <Button variant="ghost" onClick={() => setActiveTab("home")}>Back</Button>
            </div>
            <Card className="border-2 border-dashed border-primary/20 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 bg-white">
              <div className="p-6 bg-primary/10 rounded-full text-primary">
                <FileText size={48} />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-lg">Standard Lease Agreement</h4>
                <p className="text-sm text-muted-foreground">Valid till 31st March 2025</p>
              </div>
              <Button className="w-full h-12 rounded-xl gap-2 font-bold">
                <Download size={18} /> Download PDF
              </Button>
            </Card>
           </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t h-20 px-6 flex items-center justify-around z-20">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`}
        >
          <CreditCard size={24} strokeWidth={activeTab === "home" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Rent</span>
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "history" ? "text-primary" : "text-muted-foreground"}`}
        >
          <History size={24} strokeWidth={activeTab === "history" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">History</span>
        </button>
        <button 
          onClick={() => setActiveTab("agreement")}
          className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === "agreement" ? "text-primary" : "text-muted-foreground"}`}
        >
          <FileText size={24} strokeWidth={activeTab === "agreement" ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Lease</span>
        </button>
      </nav>
    </div>
  );
}
