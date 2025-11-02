// Blueprint reference: javascript_log_in_with_replit
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { google } from "googleapis";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Google OAuth Connection Status
  app.get('/api/google/connections', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const connections = await storage.getGoogleConnections(userId);
      
      const status = {
        analytics: connections.some(c => c.serviceType === 'analytics' && c.connected),
        searchConsole: connections.some(c => c.serviceType === 'search_console' && c.connected),
      };
      
      res.json(status);
    } catch (error) {
      console.error("Error fetching connections:", error);
      res.status(500).json({ message: "Failed to fetch connections" });
    }
  });

  // Initiate Google OAuth Connection
  app.post('/api/google/connect/:serviceType', isAuthenticated, async (req: any, res) => {
    try {
      const { serviceType } = req.params;
      const userId = req.user.claims.sub;

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `https://${req.hostname}/api/google/callback/${serviceType}`
      );

      let scopes: string[] = [];
      if (serviceType === 'analytics') {
        scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
      } else if (serviceType === 'search_console') {
        scopes = ['https://www.googleapis.com/auth/webmasters.readonly'];
      }

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: userId,
      });

      res.json({ authUrl });
    } catch (error) {
      console.error("Error initiating connection:", error);
      res.status(500).json({ message: "Failed to initiate connection" });
    }
  });

  // Google OAuth Callback
  app.get('/api/google/callback/:serviceType', async (req, res) => {
    try {
      const { serviceType } = req.params;
      const { code, state: userId } = req.query;

      if (!code || !userId) {
        return res.redirect('/settings?error=oauth_failed');
      }

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `https://${req.hostname}/api/google/callback/${serviceType}`
      );

      const { tokens } = await oauth2Client.getToken(code as string);
      
      await storage.createGoogleConnection({
        userId: userId as string,
        serviceType,
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token || null,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        connected: true,
      });

      res.redirect('/settings?success=connected');
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      res.redirect('/settings?error=oauth_failed');
    }
  });

  // Disconnect Google Service
  app.post('/api/google/disconnect/:serviceType', isAuthenticated, async (req: any, res) => {
    try {
      const { serviceType } = req.params;
      const userId = req.user.claims.sub;

      const connection = await storage.getGoogleConnection(userId, serviceType);
      if (connection) {
        await storage.deleteGoogleConnection(connection.id);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error disconnecting service:", error);
      res.status(500).json({ message: "Failed to disconnect service" });
    }
  });

  // Get SEO Overview Data
  app.get('/api/seo/overview', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const connection = await storage.getGoogleConnection(userId, 'search_console');

      if (!connection || !connection.connected) {
        return res.json({});
      }

      // Get cached metrics
      const metrics = await storage.getSeoMetrics(userId, 'overview');
      
      if (metrics.length > 0) {
        const latestMetric = metrics[0];
        return res.json(latestMetric.data);
      }

      // If no cached data, return mock data for now
      const mockData = {
        totalClicks: 1845,
        totalImpressions: 45230,
        avgCtr: 4.08,
        avgPosition: 12.4,
        trafficTrend: [
          { date: "Jan 1", clicks: 120, impressions: 3200 },
          { date: "Jan 8", clicks: 145, impressions: 3800 },
          { date: "Jan 15", clicks: 178, impressions: 4200 },
          { date: "Jan 22", clicks: 165, impressions: 4100 },
          { date: "Jan 29", clicks: 198, impressions: 4800 },
          { date: "Feb 5", clicks: 215, impressions: 5200 },
          { date: "Feb 12", clicks: 245, impressions: 5800 },
        ],
        topPages: [
          { page: "/blog/seo-tips", clicks: 450, impressions: 8500, ctr: 5.3 },
          { page: "/services", clicks: 320, impressions: 6200, ctr: 5.2 },
          { page: "/", clicks: 280, impressions: 7100, ctr: 3.9 },
          { page: "/about", clicks: 150, impressions: 3800, ctr: 3.9 },
          { page: "/contact", clicks: 120, impressions: 2900, ctr: 4.1 },
        ],
      };

      res.json(mockData);
    } catch (error) {
      console.error("Error fetching SEO overview:", error);
      res.status(500).json({ message: "Failed to fetch SEO data" });
    }
  });

  // Get Keywords Data
  app.get('/api/seo/keywords', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const connection = await storage.getGoogleConnection(userId, 'search_console');

      if (!connection || !connection.connected) {
        return res.json([]);
      }

      // Get cached metrics
      const metrics = await storage.getSeoMetrics(userId, 'keywords');
      
      if (metrics.length > 0) {
        const latestMetric = metrics[0];
        return res.json(latestMetric.data);
      }

      // Return mock data for now
      const mockData = [
        { keyword: "seo tips for beginners", position: 3.2, clicks: 450, impressions: 8500, ctr: 5.3, trend: "up" },
        { keyword: "website optimization", position: 5.8, clicks: 320, impressions: 6200, ctr: 5.2, trend: "up" },
        { keyword: "google analytics guide", position: 8.1, clicks: 280, impressions: 7100, ctr: 3.9, trend: "down" },
        { keyword: "search engine marketing", position: 12.4, clicks: 150, impressions: 3800, ctr: 3.9, trend: "same" },
        { keyword: "digital marketing agency", position: 15.2, clicks: 120, impressions: 2900, ctr: 4.1, trend: "up" },
        { keyword: "seo best practices", position: 6.7, clicks: 380, impressions: 7200, ctr: 5.3, trend: "up" },
        { keyword: "content marketing tips", position: 9.3, clicks: 240, impressions: 5400, ctr: 4.4, trend: "same" },
        { keyword: "local seo services", position: 4.5, clicks: 410, impressions: 8900, ctr: 4.6, trend: "up" },
      ];

      res.json(mockData);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      res.status(500).json({ message: "Failed to fetch keywords" });
    }
  });

  // Get Pages Data
  app.get('/api/seo/pages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const connection = await storage.getGoogleConnection(userId, 'search_console');

      if (!connection || !connection.connected) {
        return res.json([]);
      }

      // Get cached metrics
      const metrics = await storage.getSeoMetrics(userId, 'pages');
      
      if (metrics.length > 0) {
        const latestMetric = metrics[0];
        return res.json(latestMetric.data);
      }

      // Return mock data for now
      const mockData = [
        { page: "/blog/seo-tips", clicks: 450, impressions: 8500, ctr: 5.3, position: 3.2 },
        { page: "/services", clicks: 320, impressions: 6200, ctr: 5.2, position: 5.8 },
        { page: "/", clicks: 280, impressions: 7100, ctr: 3.9, position: 8.1 },
        { page: "/about", clicks: 150, impressions: 3800, ctr: 3.9, position: 12.4 },
        { page: "/contact", clicks: 120, impressions: 2900, ctr: 4.1, position: 15.2 },
        { page: "/blog/content-marketing", clicks: 380, impressions: 7200, ctr: 5.3, position: 6.7 },
        { page: "/pricing", clicks: 240, impressions: 5400, ctr: 4.4, position: 9.3 },
        { page: "/blog/local-seo", clicks: 410, impressions: 8900, ctr: 4.6, position: 4.5 },
      ];

      res.json(mockData);
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  // Get Analytics Data
  app.get('/api/analytics/overview', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const connection = await storage.getGoogleConnection(userId, 'analytics');

      if (!connection || !connection.connected) {
        return res.json({});
      }

      // Get cached metrics
      const metrics = await storage.getSeoMetrics(userId, 'analytics');
      
      if (metrics.length > 0) {
        const latestMetric = metrics[0];
        return res.json(latestMetric.data);
      }

      // Return mock data for now
      const mockData = {
        totalUsers: 8450,
        totalSessions: 12340,
        avgSessionDuration: "3m 24s",
        bounceRate: 42.3,
        trafficSources: [
          { name: "Organic Search", value: 4500, color: "hsl(var(--chart-1))" },
          { name: "Direct", value: 2800, color: "hsl(var(--chart-2))" },
          { name: "Social Media", value: 1200, color: "hsl(var(--chart-3))" },
          { name: "Referral", value: 900, color: "hsl(var(--chart-4))" },
          { name: "Email", value: 600, color: "hsl(var(--chart-5))" },
        ],
        sessionTrend: [
          { date: "Jan 1", sessions: 850, users: 720 },
          { date: "Jan 8", sessions: 920, users: 780 },
          { date: "Jan 15", sessions: 1050, users: 890 },
          { date: "Jan 22", sessions: 980, users: 830 },
          { date: "Jan 29", sessions: 1150, users: 970 },
          { date: "Feb 5", sessions: 1280, users: 1080 },
          { date: "Feb 12", sessions: 1420, users: 1200 },
        ],
      };

      res.json(mockData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Run Lighthouse Audit
  app.get('/api/lighthouse/audit', isAuthenticated, async (req: any, res) => {
    try {
      const { url, device } = req.query;
      const userId = req.user.claims.sub;

      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      // Use PageSpeed Insights API instead of running Lighthouse directly
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url as string)}&strategy=${device || 'mobile'}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'PageSpeed API request failed');
      }

      const lighthouseResult = data.lighthouseResult;
      const categories = lighthouseResult.categories;

      const auditResult = {
        performanceScore: Math.round((categories.performance?.score || 0) * 100),
        seoScore: Math.round((categories.seo?.score || 0) * 100),
        accessibilityScore: Math.round((categories.accessibility?.score || 0) * 100),
        bestPracticesScore: Math.round((categories['best-practices']?.score || 0) * 100),
      };

      // Store the audit result
      await storage.createLighthouseAudit({
        userId,
        url: url as string,
        performanceScore: auditResult.performanceScore,
        seoScore: auditResult.seoScore,
        accessibilityScore: auditResult.accessibilityScore,
        bestPracticesScore: auditResult.bestPracticesScore,
        device: (device as string) || 'mobile',
        auditData: lighthouseResult,
      });

      res.json(auditResult);
    } catch (error) {
      console.error("Error running Lighthouse audit:", error);
      res.status(500).json({ message: "Failed to run audit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
