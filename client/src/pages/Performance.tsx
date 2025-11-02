import { useState } from "react";
import { PerformanceScoreCard } from "@/components/PerformanceScoreCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Gauge, Smartphone, Monitor, Play, Info } from "lucide-react";

export default function Performance() {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  const handleRunAudit = () => {
    if (url) {
      alert("Performance audit feature requires a backend API integration. This is demo mode.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Performance Audit</h1>
        <p className="text-muted-foreground">
          Analyze your website's speed, SEO, and accessibility with Lighthouse
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Performance audit requires Google PageSpeed Insights API integration. This feature is currently in demo mode.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Run Lighthouse Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                data-testid="input-audit-url"
              />
            </div>

            <Tabs value={device} onValueChange={(v) => setDevice(v as "mobile" | "desktop")}>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="mobile" data-testid="tab-mobile">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="desktop" data-testid="tab-desktop">
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              onClick={handleRunAudit}
              disabled={!url}
              className="w-full sm:w-auto"
              data-testid="button-run-audit"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Audit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PerformanceScoreCard
          title="Performance"
          score={85}
          icon={<Gauge className="w-4 h-4" />}
        />
        <PerformanceScoreCard
          title="SEO"
          score={92}
          icon={<Gauge className="w-4 h-4" />}
        />
        <PerformanceScoreCard
          title="Accessibility"
          score={88}
          icon={<Gauge className="w-4 h-4" />}
        />
        <PerformanceScoreCard
          title="Best Practices"
          score={90}
          icon={<Gauge className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}
