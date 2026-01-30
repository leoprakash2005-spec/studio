"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserRole } from "@/app/page";
import { Building2, User, Phone, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface AuthScreenProps {
  onLogin: (phone: string) => void;
  onRoleSelect: (role: UserRole, name: string) => void;
  currentUser: { phone: string; role: UserRole } | null;
}

export default function AuthScreen({ onLogin, onRoleSelect, currentUser }: AuthScreenProps) {
  const [step, setStep] = useState<"phone" | "otp" | "role">(currentUser ? "role" : "phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const logo = PlaceHolderImages.find(img => img.id === "app-logo")?.imageUrl || "";

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      onLogin(phone);
      setStep("role");
    }
  };

  if (step === "role" || (currentUser && !currentUser.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Welcome to RentEase</h1>
          <p className="text-muted-foreground">Please tell us who you are</p>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Full Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Rahul Sharma" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => name && onRoleSelect("landlord", name)}
              disabled={!name}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all space-y-3 ${
                name ? "hover:border-primary hover:bg-primary/5 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Building2 size={32} />
              </div>
              <span className="font-bold">Landlord</span>
            </button>

            <button
              onClick={() => name && onRoleSelect("tenant", name)}
              disabled={!name}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all space-y-3 ${
                name ? "hover:border-accent hover:bg-accent/5 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="p-4 bg-accent/10 rounded-full text-accent">
                <User size={32} />
              </div>
              <span className="font-bold">Tenant</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-xl shadow-primary/20 bg-primary/10 flex items-center justify-center">
            <Building2 className="text-primary w-12 h-12" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">RentEase</h1>
            <p className="text-muted-foreground">Manage rentals seamlessly</p>
          </div>
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0 space-y-6">
            {step === "phone" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">+91</span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="99999 99999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="pl-12 h-12 text-lg rounded-xl bg-white"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOtp} 
                  className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20"
                  disabled={phone.length !== 10}
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 text-center">
                  <p className="text-sm text-muted-foreground">OTP sent to +91 {phone}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 4-digit OTP</Label>
                  <Input
                    id="otp"
                    type="password"
                    placeholder="• • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="h-12 text-center text-2xl tracking-[1em] rounded-xl bg-white"
                  />
                  <p className="text-xs text-center text-muted-foreground mt-2">Hint: Use 1234</p>
                </div>
                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20"
                  disabled={otp.length !== 4}
                >
                  Verify & Login
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep("phone")}>
                  Change Phone Number
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
