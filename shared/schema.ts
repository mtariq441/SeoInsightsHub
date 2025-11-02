// Blueprint reference: javascript_log_in_with_replit, javascript_database
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Google OAuth connections for Analytics and Search Console
export const googleConnections = pgTable("google_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  serviceType: varchar("service_type").notNull(), // 'analytics' or 'search_console'
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  tokenExpiry: timestamp("token_expiry"),
  accountId: varchar("account_id"), // Google account identifier
  propertyId: varchar("property_id"), // Analytics property or Search Console site URL
  connected: boolean("connected").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cached SEO metrics data for faster loading
export const seoMetrics = pgTable("seo_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  metricType: varchar("metric_type").notNull(), // 'overview', 'pages', 'keywords', 'performance'
  data: jsonb("data").notNull(), // Flexible JSON storage for various metric types
  dateRange: varchar("date_range"), // e.g., '7d', '30d', '90d'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lighthouse audit results
export const lighthouseAudits = pgTable("lighthouse_audits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  url: text("url").notNull(),
  performanceScore: integer("performance_score"),
  seoScore: integer("seo_score"),
  accessibilityScore: integer("accessibility_score"),
  bestPracticesScore: integer("best_practices_score"),
  device: varchar("device"), // 'mobile' or 'desktop'
  auditData: jsonb("audit_data"), // Full audit results
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  googleConnections: many(googleConnections),
  seoMetrics: many(seoMetrics),
  lighthouseAudits: many(lighthouseAudits),
}));

export const googleConnectionsRelations = relations(googleConnections, ({ one }) => ({
  user: one(users, {
    fields: [googleConnections.userId],
    references: [users.id],
  }),
}));

export const seoMetricsRelations = relations(seoMetrics, ({ one }) => ({
  user: one(users, {
    fields: [seoMetrics.userId],
    references: [users.id],
  }),
}));

export const lighthouseAuditsRelations = relations(lighthouseAudits, ({ one }) => ({
  user: one(users, {
    fields: [lighthouseAudits.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertGoogleConnectionSchema = createInsertSchema(googleConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSeoMetricsSchema = createInsertSchema(seoMetrics).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLighthouseAuditSchema = createInsertSchema(lighthouseAudits).omit({
  id: true,
  createdAt: true,
});

// TypeScript types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type GoogleConnection = typeof googleConnections.$inferSelect;
export type InsertGoogleConnection = z.infer<typeof insertGoogleConnectionSchema>;
export type SeoMetric = typeof seoMetrics.$inferSelect;
export type InsertSeoMetric = z.infer<typeof insertSeoMetricsSchema>;
export type LighthouseAudit = typeof lighthouseAudits.$inferSelect;
export type InsertLighthouseAudit = z.infer<typeof insertLighthouseAuditSchema>;
