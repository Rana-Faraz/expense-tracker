import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth";

export const incomes = pgTable("incomes", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  source: text("source").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  recurring: boolean("recurring").notNull().default(false),
  recurringFrequency: text("recurring_frequency").$type<
    "daily" | "weekly" | "monthly" | "yearly"
  >(),
  recurringInterval: numeric("recurring_interval", { precision: 3, scale: 0 }), // every X frequency
  recurringEndDate: timestamp("recurring_end_date"),
  taxable: boolean("taxable").notNull().default(true),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`), // PostgreSQL array
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const incomesRelations = relations(incomes, ({ one }) => ({
  user: one(user, {
    fields: [incomes.userId],
    references: [user.id],
  }),
}));
