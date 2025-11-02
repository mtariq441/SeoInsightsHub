import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, Gauge, Key, FileText, TrendingUp, Zap } from "lucide-react";
import { Auth } from "@/components/Auth";

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">SEO Dashboard</h1>
          </div>
          <Button onClick={() => setShowAuth(true)} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Understand Your Website's SEO Health
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get simple, visual insights from Google Analytics, Search Console, and PageSpeed to help your small business grow online.
            </p>
            <Button size="lg" onClick={() => setShowAuth(true)} data-testid="button-get-started">
              Get Started Free
            </Button>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Everything You Need in One Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">SEO Overview</h4>
                  <p className="text-muted-foreground">
                    Track clicks, impressions, CTR, and organic traffic all in one place
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Page Insights</h4>
                  <p className="text-muted-foreground">
                    See which pages perform best and identify opportunities
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Keyword Analysis</h4>
                  <p className="text-muted-foreground">
                    Discover what keywords bring visitors to your site
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Gauge className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Performance Scores</h4>
                  <p className="text-muted-foreground">
                    Get SEO, speed, and accessibility scores from Lighthouse
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Visual Analytics</h4>
                  <p className="text-muted-foreground">
                    Beautiful charts and graphs that make data easy to understand
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Easy Setup</h4>
                  <p className="text-muted-foreground">
                    Connect your Google accounts and start getting insights instantly
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Improve Your SEO?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join small business owners who are growing their online presence with data-driven insights
            </p>
            <Button size="lg" onClick={() => setShowAuth(true)} data-testid="button-start-now">
              Start Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SEO Dashboard. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to SEO Dashboard</DialogTitle>
          </DialogHeader>
          <Auth />
        </DialogContent>
      </Dialog>
    </div>
  );
}
