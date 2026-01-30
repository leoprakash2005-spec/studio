
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Hammer } from "lucide-react";

interface AuthScreenProps {
  onLogin: (phone: string, name: string) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"name" | "phone">("name");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg rotate-3">
            <Calculator size={40} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-primary">BuildEstimate</h1>
            <p className="text-muted-foreground">Smart construction planning</p>
          </div>
        </div>

        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0 space-y-6">
            {step === "name" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl bg-white border-primary/20"
                  />
                </div>
                <Button 
                  onClick={() => name && setStep("phone")} 
                  className="w-full h-12 rounded-xl font-bold"
                  disabled={!name}
                >
                  Continue
                </Button>
              </div>
            ) : (
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
                      className="pl-12 h-12 rounded-xl bg-white border-primary/20"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => onLogin(phone, name)} 
                  className="w-full h-12 rounded-xl font-bold"
                  disabled={phone.length !== 10}
                >
                  Start Estimating
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setStep("name")}>
                  Back
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
