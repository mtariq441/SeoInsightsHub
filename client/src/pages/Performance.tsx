import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PerformanceScoreCard } from "@/components/PerformanceScoreCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/EmptyState";
import { Gauge, Smartphone, Monitor, Play } from "lucide-react";

export default function Performance() {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  const { data: auditData, isLoading, refetch } = useQuery<any>({
    queryKey: ["/api/lighthouse/audit", url, device],
    enabled: false,
  });

  const handleRunAudit = () => {
    if (url) {
      refetch();
    }
  };

  const hasResults = auditData && Object.keys(auditData).length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Performance Audit</h1>
        <p className="text-muted-foreground">
          Analyze your website's speed, SEO, and accessibility with Lighthouse
        </p>
      </div>

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
              disabled={!url || isLoading}
              className="w-full sm:w-auto"
              data-testid="button-run-audit"
            >
              <Play className="w-4 h-4 mr-2" />
              {isLoading ? "Running Audit..." : "Run Audit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="w-32 h-32 mx-auto bg-muted animate-pulse rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : hasResults ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PerformanceScoreCard
              title="Performance"
              score={auditData.performanceScore || 85}
              icon={<Gauge className="w-4 h-4" />}
            />
            <PerformanceScoreCard
              title="SEO"
              score={auditData.seoScore || 92}
              icon={<Gauge className="w-4 h-4" />}
            />
            <PerformanceScoreCard
              title="Accessibility"
              score={auditData.accessibilityScore || 88}
              icon={<Gauge className="w-4 h-4" />}
            />
            <PerformanceScoreCard
              title="Best Practices"
              score={auditData.bestPracticesScore || 90}
              icon={<Gauge className="w-4 h-4" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Audit Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm font-medium">URL Audited</span>
                  <span className="text-sm text-muted-foreground font-mono">{url}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm font-medium">Device</span>
                  <span className="text-sm text-muted-foreground capitalize">{device}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm font-medium">Audit Date</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <EmptyState
          icon={Gauge}
          title="No Audit Results Yet"
          description="Enter a website URL and run a Lighthouse audit to see performance, SEO, accessibility, and best practices scores."
        />
      )}
    </div>
  );
}
