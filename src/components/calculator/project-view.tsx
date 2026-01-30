
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  FileText, 
  Share2,
  Calculator,
  Hammer,
  Truck,
  ShieldCheck,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateProjectReport } from "@/ai/flows/project-report-flow";
import { useToast } from "@/hooks/use-toast";

interface ProjectViewProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectView({ projectId, onBack }: ProjectViewProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "Cement & Sand", category: "Materials", total: 120000, qty: 400, unit: "Bags" },
    { id: "2", name: "TMT Steel Bars", category: "Materials", total: 350000, qty: 5, unit: "Tons" },
    { id: "3", name: "Masonry Work", category: "Labor", total: 200000, qty: 45, unit: "Days" },
    { id: "4", name: "Site Approval", category: "Permits", total: 45000, qty: 1, unit: "Unit" },
  ]);

  const totalCost = items.reduce((sum, item) => sum + item.total, 0);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const result = await generateProjectReport({
        projectName: "Modern Villa - Sector 45",
        projectType: "Residential",
        totalArea: 2400,
        items,
        totalCost
      });
      
      toast({
        title: "Report Generated",
        description: "Your professional summary is ready to share.",
      });
      console.log(result);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate report." });
    } finally {
      setIsGenerating(false);
    }
  };

  const categoryIcons: any = {
    Materials: <Hammer size={16} />,
    Labor: <Calculator size={16} />,
    Permits: <ShieldCheck size={16} />,
    Logistics: <Truck size={16} />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <header className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold truncate px-2">Modern Villa - Sector 45</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={20} />
        </Button>
      </header>

      <main className="flex-1 pb-24">
        <div className="p-4 bg-white border-b space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Estimate</p>
              <h2 className="text-3xl font-black text-primary">₹{totalCost.toLocaleString()}</h2>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
              Residential • 2400 sqft
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 rounded-xl h-12 font-bold gap-2" 
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              <FileText size={18} /> {isGenerating ? "Analyzing..." : "Report"}
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold gap-2">
              <Share2 size={18} /> Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="costs" className="w-full">
          <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none px-4">
            <TabsTrigger value="costs" className="data-[state=active]:border-b-2 border-primary rounded-none shadow-none bg-transparent">Breakdown</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:border-b-2 border-primary rounded-none shadow-none bg-transparent">Project Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="costs" className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Cost Items</h3>
              <Button size="sm" variant="outline" className="rounded-full h-8 text-xs gap-1 border-primary text-primary">
                <Plus size={14} /> Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="border-none shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary">
                        {categoryIcons[item.category] || <Calculator size={16} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-none">{item.name}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {item.category} • {item.qty} {item.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{item.total.toLocaleString()}</p>
                      <button className="text-muted-foreground hover:text-destructive transition-colors mt-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-4">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-bold">Residential</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Area</p>
                    <p className="font-bold">2,400 sqft</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-bold">Sector 45, Gurgaon</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-bold">Estimation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
