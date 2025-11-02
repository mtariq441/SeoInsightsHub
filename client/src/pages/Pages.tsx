import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Pages() {
  const [searchTerm, setSearchTerm] = useState("");

  const pages = [
    { page: "/blog/seo-tips", clicks: 450, impressions: 8500, ctr: 5.3, position: 3.2 },
    { page: "/services", clicks: 320, impressions: 6200, ctr: 5.2, position: 5.8 },
    { page: "/", clicks: 280, impressions: 7100, ctr: 3.9, position: 8.1 },
    { page: "/about", clicks: 150, impressions: 3800, ctr: 3.9, position: 12.4 },
    { page: "/contact", clicks: 120, impressions: 2900, ctr: 4.1, position: 15.2 },
    { page: "/blog/content-marketing", clicks: 380, impressions: 7200, ctr: 5.3, position: 6.7 },
    { page: "/pricing", clicks: 240, impressions: 5400, ctr: 4.4, position: 9.3 },
    { page: "/blog/local-seo", clicks: 410, impressions: 8900, ctr: 4.6, position: 4.5 },
  ];

  const filteredPages = pages.filter((page) =>
    page.page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pages</h1>
        <p className="text-muted-foreground">
          See which pages perform best in search results (demo data)
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Page Performance</CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-pages"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Page URL</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Clicks</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Impressions</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">CTR</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-3">Avg. Position</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page, index) => (
                  <tr
                    key={index}
                    className="border-b hover-elevate"
                    data-testid={`row-page-${index}`}
                  >
                    <td className="px-6 py-3 text-sm font-mono">{page.page}</td>
                    <td className="px-6 py-3 text-sm text-right font-mono">{page.clicks.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm text-right font-mono">{page.impressions.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm text-right font-mono">{page.ctr.toFixed(1)}%</td>
                    <td className="px-6 py-3 text-sm text-right font-mono">#{page.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No pages found matching "{searchTerm}"
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
