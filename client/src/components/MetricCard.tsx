import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function MetricCard({ label, value, change, changeLabel, icon, loading }: MetricCardProps) {
  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    return `${change > 0 ? '+' : ''}${absChange.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-chart-2";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-3 h-3" />;
    if (change < 0) return <ArrowDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="text-4xl font-bold font-mono" data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </div>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm mt-2", getChangeColor(change))}>
                {getChangeIcon(change)}
                <span className="font-medium">{formatChange(change)}</span>
                {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
