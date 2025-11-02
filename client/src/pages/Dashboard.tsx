import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MousePointer, Eye, TrendingUp, Target } from "lucide-react";

export default function Dashboard() {
  const trafficData = [
    { date: "Jan 1", clicks: 120, impressions: 3200 },
    { date: "Jan 8", clicks: 145, impressions: 3800 },
    { date: "Jan 15", clicks: 178, impressions: 4200 },
    { date: "Jan 22", clicks: 165, impressions: 4100 },
    { date: "Jan 29", clicks: 198, impressions: 4800 },
    { date: "Feb 5", clicks: 215, impressions: 5200 },
    { date: "Feb 12", clicks: 245, impressions: 5800 },
  ];

  const topPages = [
    { page: "/blog/seo-tips", clicks: 450, impressions: 8500, ctr: 5.3 },
    { page: "/services", clicks: 320, impressions: 6200, ctr: 5.2 },
    { page: "/", clicks: 280, impressions: 7100, ctr: 3.9 },
    { page: "/about", clicks: 150, impressions: 3800, ctr: 3.9 },
    { page: "/contact", clicks: 120, impressions: 2900, ctr: 4.1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">SEO Overview</h1>
        <p className="text-muted-foreground">
          Your website's search performance at a glance (demo data)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Clicks"
          value="1,845"
          change={12.5}
          changeLabel="vs last period"
          icon={<MousePointer className="w-4 h-4" />}
        />
        <MetricCard
          label="Impressions"
          value="45,230"
          change={8.3}
          changeLabel="vs last period"
          icon={<Eye className="w-4 h-4" />}
        />
        <MetricCard
          label="Avg. CTR"
          value="4.08%"
          change={2.1}
          changeLabel="vs last period"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Avg. Position"
          value="12.4"
          change={-5.2}
          changeLabel="improvement"
          icon={<Target className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Clicks"
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Impressions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="page"
                    className="text-xs"
                    width={150}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="clicks" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Page Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Page</th>
                  <th className="text-right py-3 px-4 font-semibold">Clicks</th>
                  <th className="text-right py-3 px-4 font-semibold">Impressions</th>
                  <th className="text-right py-3 px-4 font-semibold">CTR</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm">{page.page}</td>
                    <td className="text-right py-3 px-4 font-mono">{page.clicks.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 font-mono">{page.impressions.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 font-mono">{page.ctr.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
