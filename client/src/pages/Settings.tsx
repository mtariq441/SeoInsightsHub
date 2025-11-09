import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";

export default function Settings() {
  const { user, isLoading, isAuthenticated } = useAuth() as { user: User | undefined, isLoading: boolean, isAuthenticated: boolean };
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Signing out",
      description: "Redirecting to logout...",
    });
    setTimeout(() => {
      window.location.href = '/api/logout';
    }, 500);
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>
                <UserIcon className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{user?.email}</p>
              <p className="text-sm text-muted-foreground">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Integrations</CardTitle>
            <CardDescription>Connect your Google services for SEO insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Google Analytics and Search Console integrations will be available in a future update.
              For now, you can explore the demo data throughout the dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
