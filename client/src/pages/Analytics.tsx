import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/EmptyState";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Users, Clock, MousePointer, TrendingDown, BarChart3 } from "lucide-react";

export default function Analytics() {
  const { data: analyticsData, isLoading } = useQuery<any>({
    queryKey: ["/api/analytics/overview"],
  });

  const { data: connections } = useQuery<any>({
    queryKey: ["/api/google/connections"],
  });

  if (!connections?.analytics && !isLoading) {
    return (
      <EmptyState
        icon={BarChart3}
        title="Connect Google Analytics"
        description="To see your website analytics, connect your Google Analytics account in settings."
        actionLabel="Go to Settings"
        onAction={() => window.location.href = "/settings"}
      />
    );
  }

  const trafficSources = analyticsData?.trafficSources || [
    { name: "Organic Search", value: 4500, color: "hsl(var(--chart-1))" },
    { name: "Direct", value: 2800, color: "hsl(var(--chart-2))" },
    { name: "Social Media", value: 1200, color: "hsl(var(--chart-3))" },
    { name: "Referral", value: 900, color: "hsl(var(--chart-4))" },
    { name: "Email", value: 600, color: "hsl(var(--chart-5))" },
  ];

  const sessionTrend = analyticsData?.sessionTrend || [
    { date: "Jan 1", sessions: 850, users: 720 },
    { date: "Jan 8", sessions: 920, users: 780 },
    { date: "Jan 15", sessions: 1050, users: 890 },
    { date: "Jan 22", sessions: 980, users: 830 },
    { date: "Jan 29", sessions: 1150, users: 970 },
    { date: "Feb 5", sessions: 1280, users: 1080 },
    { date: "Feb 12", sessions: 1420, users: 1200 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive website traffic and user behavior insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Users"
          value={analyticsData?.totalUsers?.toLocaleString() || "8,450"}
          change={15.3}
          changeLabel="vs last period"
          icon={<Users className="w-4 h-4" />}
          loading={isLoading}
        />
        <MetricCard
          label="Sessions"
          value={analyticsData?.totalSessions?.toLocaleString() || "12,340"}
          change={12.8}
          changeLabel="vs last period"
          icon={<MousePointer className="w-4 h-4" />}
          loading={isLoading}
        />
        <MetricCard
          label="Avg. Session Duration"
          value={analyticsData?.avgSessionDuration || "3m 24s"}
          change={5.2}
          changeLabel="vs last period"
          icon={<Clock className="w-4 h-4" />}
          loading={isLoading}
        />
        <MetricCard
          label="Bounce Rate"
          value={`${analyticsData?.bounceRate || "42.3"}%`}
          change={-3.5}
          changeLabel="improvement"
          icon={<TrendingDown className="w-4 h-4" />}
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSources.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sessions & Users Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sessionTrend}>
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
                    dataKey="sessions"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
