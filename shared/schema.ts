import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({ id: true, createdAt: true });

export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;
