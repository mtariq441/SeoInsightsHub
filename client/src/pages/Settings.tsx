import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ConnectionCard } from "@/components/ConnectionCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, LogOut } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Settings() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: connections } = useQuery<any>({
    queryKey: ["/api/google/connections"],
  });

  const connectMutation = useMutation({
    mutationFn: async (serviceType: string) => {
      return await apiRequest("POST", `/api/google/connect/${serviceType}`, {});
    },
    onSuccess: (data) => {
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async (serviceType: string) => {
      return await apiRequest("POST", `/api/google/disconnect/${serviceType}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/google/connections"] });
      toast({
        title: "Disconnected",
        description: "Service disconnected successfully",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Disconnection Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getInitials = (firstName?: string | null, lastName?: string | null, email?: string | null) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and integrations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Account Information</CardTitle>
          <CardDescription>Your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.profileImageUrl || undefined} style={{ objectFit: 'cover' }} />
              <AvatarFallback>{getInitials(user?.firstName, user?.lastName, user?.email)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email || "User"}
              </h3>
              {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
            </div>
            <Button variant="outline" asChild data-testid="button-logout">
              <a href="/api/logout">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Google Integrations</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Connect your Google accounts to import SEO and analytics data
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ConnectionCard
            title="Google Analytics"
            description="Import website traffic, user behavior, and conversion data"
            icon={BarChart3}
            connected={connections?.analytics || false}
            onConnect={() => connectMutation.mutate("analytics")}
            onDisconnect={() => disconnectMutation.mutate("analytics")}
            loading={connectMutation.isPending || disconnectMutation.isPending}
          />
          <ConnectionCard
            title="Google Search Console"
            description="Access search performance, keyword rankings, and click data"
            icon={Search}
            connected={connections?.searchConsole || false}
            onConnect={() => connectMutation.mutate("search_console")}
            onDisconnect={() => disconnectMutation.mutate("search_console")}
            loading={connectMutation.isPending || disconnectMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
