import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth";
import { categories } from "./categories";

export const expenses = pgTable("expenses", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
  date: timestamp("date").notNull(),
  paymentMethod: text("payment_method")
    .notNull()
    .$type<"cash" | "card" | "transfer" | "other">(),
  recurring: boolean("recurring").notNull().default(false),
  recurringFrequency: text("recurring_frequency").$type<
    "daily" | "weekly" | "monthly" | "yearly"
  >(),
  recurringInterval: numeric("recurring_interval", { precision: 3, scale: 0 }), // every X frequency
  recurringEndDate: timestamp("recurring_end_date"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`), // PostgreSQL array
  receipt: text("receipt"), // file path or base64
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(user, {
    fields: [expenses.userId],
    references: [user.id],
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));
