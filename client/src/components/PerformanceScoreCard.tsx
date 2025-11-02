import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PerformanceScoreCardProps {
  title: string;
  score: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function PerformanceScoreCard({ title, score, icon, loading }: PerformanceScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-chart-2";
    if (score >= 50) return "text-chart-4";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-chart-2/10";
    if (score >= 50) return "bg-chart-4/10";
    return "bg-destructive/10";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8">
        {loading ? (
          <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
        ) : (
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={cn("transition-all duration-1000", getScoreColor(score))}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn("text-center px-4 py-2 rounded-lg", getScoreBg(score))}>
                <div className={cn("text-3xl font-bold font-mono", getScoreColor(score))} data-testid={`score-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {score}
                </div>
                <div className="text-xs text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
