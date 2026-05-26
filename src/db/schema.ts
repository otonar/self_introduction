import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  year: text("year").notNull(),
  type: text("type").notNull().$type<"slides" | "notes" | "report" | "other">(),
  description: text("description").notNull().default(""),
  blobUrl: text("blob_url").notNull(),
  filename: text("filename").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
