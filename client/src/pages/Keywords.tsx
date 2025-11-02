import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/EmptyState";
import { Key, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";

export default function Keywords() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: keywordsData, isLoading } = useQuery<any>({
    queryKey: ["/api/seo/keywords"],
  });

  const keywords = keywordsData || [
    { keyword: "seo tips for beginners", position: 3.2, clicks: 450, impressions: 8500, ctr: 5.3, trend: "up" },
    { keyword: "website optimization", position: 5.8, clicks: 320, impressions: 6200, ctr: 5.2, trend: "up" },
    { keyword: "google analytics guide", position: 8.1, clicks: 280, impressions: 7100, ctr: 3.9, trend: "down" },
    { keyword: "search engine marketing", position: 12.4, clicks: 150, impressions: 3800, ctr: 3.9, trend: "same" },
    { keyword: "digital marketing agency", position: 15.2, clicks: 120, impressions: 2900, ctr: 4.1, trend: "up" },
    { keyword: "seo best practices", position: 6.7, clicks: 380, impressions: 7200, ctr: 5.3, trend: "up" },
    { keyword: "content marketing tips", position: 9.3, clicks: 240, impressions: 5400, ctr: 4.4, trend: "same" },
    { keyword: "local seo services", position: 4.5, clicks: 410, impressions: 8900, ctr: 4.6, trend: "up" },
  ];

  const filteredKeywords = keywords.filter((kw: any) =>
    kw.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-chart-2" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  if (!isLoading && keywords.length === 0) {
    return (
      <EmptyState
        icon={Key}
        title="No Keywords Found"
        description="Connect your Google Search Console account to see keyword performance data."
        actionLabel="Go to Settings"
        onAction={() => window.location.href = "/settings"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Keywords</h1>
        <p className="text-muted-foreground">
          Track your keyword rankings and search performance
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Keyword Performance</CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-keywords"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Keyword</th>
                    <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Position</th>
                    <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Clicks</th>
                    <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Impressions</th>
                    <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">CTR</th>
                    <th className="text-center text-sm font-medium text-muted-foreground px-6 py-3">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.map((keyword: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b hover-elevate"
                      data-testid={`row-keyword-${index}`}
                    >
                      <td className="px-6 py-3 text-sm">{keyword.keyword}</td>
                      <td className="px-6 py-3 text-sm text-right font-mono">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-muted">
                          #{keyword.position.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-mono">{keyword.clicks.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm text-right font-mono">{keyword.impressions.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm text-right font-mono">{keyword.ctr.toFixed(1)}%</td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center">
                          {getTrendIcon(keyword.trend)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredKeywords.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No keywords found matching "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
