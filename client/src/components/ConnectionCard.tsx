import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, LucideIcon } from "lucide-react";

interface ConnectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  connected: boolean;
  onConnect: () => void;
  onDisconnect?: () => void;
  loading?: boolean;
}

export function ConnectionCard({
  title,
  description,
  icon: Icon,
  connected,
  onConnect,
  onDisconnect,
  loading,
}: ConnectionCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <Badge variant={connected ? "default" : "secondary"} className="ml-2">
            {connected ? (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            ) : (
              <Circle className="w-3 h-3 mr-1" />
            )}
            {connected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {connected ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onDisconnect}
              disabled={loading}
              data-testid={`button-disconnect-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Disconnect
            </Button>
            <Button
              onClick={onConnect}
              disabled={loading}
              data-testid={`button-reconnect-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Reconnect
            </Button>
          </div>
        ) : (
          <Button
            onClick={onConnect}
            disabled={loading}
            data-testid={`button-connect-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Connect Account
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
