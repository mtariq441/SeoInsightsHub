// Blueprint reference: javascript_log_in_with_replit, javascript_database
import {
  users,
  googleConnections,
  seoMetrics,
  lighthouseAudits,
  type User,
  type UpsertUser,
  type GoogleConnection,
  type InsertGoogleConnection,
  type SeoMetric,
  type InsertSeoMetric,
  type LighthouseAudit,
  type InsertLighthouseAudit,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Google Connection operations
  getGoogleConnections(userId: string): Promise<GoogleConnection[]>;
  getGoogleConnection(userId: string, serviceType: string): Promise<GoogleConnection | undefined>;
  createGoogleConnection(connection: InsertGoogleConnection): Promise<GoogleConnection>;
  updateGoogleConnection(id: string, connection: Partial<InsertGoogleConnection>): Promise<GoogleConnection | undefined>;
  deleteGoogleConnection(id: string): Promise<void>;

  // SEO Metrics operations
  getSeoMetrics(userId: string, metricType?: string): Promise<SeoMetric[]>;
  createSeoMetric(metric: InsertSeoMetric): Promise<SeoMetric>;
  updateSeoMetric(id: string, metric: Partial<InsertSeoMetric>): Promise<SeoMetric | undefined>;

  // Lighthouse Audit operations
  getLighthouseAudits(userId: string, url?: string): Promise<LighthouseAudit[]>;
  createLighthouseAudit(audit: InsertLighthouseAudit): Promise<LighthouseAudit>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Google Connection operations
  async getGoogleConnections(userId: string): Promise<GoogleConnection[]> {
    return await db
      .select()
      .from(googleConnections)
      .where(eq(googleConnections.userId, userId));
  }

  async getGoogleConnection(userId: string, serviceType: string): Promise<GoogleConnection | undefined> {
    const [connection] = await db
      .select()
      .from(googleConnections)
      .where(
        and(
          eq(googleConnections.userId, userId),
          eq(googleConnections.serviceType, serviceType)
        )
      );
    return connection;
  }

  async createGoogleConnection(connection: InsertGoogleConnection): Promise<GoogleConnection> {
    const [newConnection] = await db
      .insert(googleConnections)
      .values(connection)
      .returning();
    return newConnection;
  }

  async updateGoogleConnection(id: string, connection: Partial<InsertGoogleConnection>): Promise<GoogleConnection | undefined> {
    const [updated] = await db
      .update(googleConnections)
      .set({ ...connection, updatedAt: new Date() })
      .where(eq(googleConnections.id, id))
      .returning();
    return updated;
  }

  async deleteGoogleConnection(id: string): Promise<void> {
    await db.delete(googleConnections).where(eq(googleConnections.id, id));
  }

  // SEO Metrics operations
  async getSeoMetrics(userId: string, metricType?: string): Promise<SeoMetric[]> {
    if (metricType) {
      return await db
        .select()
        .from(seoMetrics)
        .where(
          and(
            eq(seoMetrics.userId, userId),
            eq(seoMetrics.metricType, metricType)
          )
        )
        .orderBy(desc(seoMetrics.createdAt));
    }
    return await db
      .select()
      .from(seoMetrics)
      .where(eq(seoMetrics.userId, userId))
      .orderBy(desc(seoMetrics.createdAt));
  }

  async createSeoMetric(metric: InsertSeoMetric): Promise<SeoMetric> {
    const [newMetric] = await db
      .insert(seoMetrics)
      .values(metric)
      .returning();
    return newMetric;
  }

  async updateSeoMetric(id: string, metric: Partial<InsertSeoMetric>): Promise<SeoMetric | undefined> {
    const [updated] = await db
      .update(seoMetrics)
      .set({ ...metric, updatedAt: new Date() })
      .where(eq(seoMetrics.id, id))
      .returning();
    return updated;
  }

  // Lighthouse Audit operations
  async getLighthouseAudits(userId: string, url?: string): Promise<LighthouseAudit[]> {
    if (url) {
      return await db
        .select()
        .from(lighthouseAudits)
        .where(
          and(
            eq(lighthouseAudits.userId, userId),
            eq(lighthouseAudits.url, url)
          )
        )
        .orderBy(desc(lighthouseAudits.createdAt));
    }
    return await db
      .select()
      .from(lighthouseAudits)
      .where(eq(lighthouseAudits.userId, userId))
      .orderBy(desc(lighthouseAudits.createdAt));
  }

  async createLighthouseAudit(audit: InsertLighthouseAudit): Promise<LighthouseAudit> {
    const [newAudit] = await db
      .insert(lighthouseAudits)
      .values(audit)
      .returning();
    return newAudit;
  }
}

export const storage = new DatabaseStorage();
