import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth";
import { categories } from "./categories";

export const budgets = pgTable("budgets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  month: text("month").notNull(), // YYYY-MM format
  totalIncome: numeric("total_income", { precision: 12, scale: 2 }).notNull(),
  totalAllocated: numeric("total_allocated", {
    precision: 12,
    scale: 2,
  }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const budgetCategories = pgTable("budget_categories", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  budgetId: text("budget_id")
    .notNull()
    .references(() => budgets.id, { onDelete: "cascade" }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  allocated: numeric("allocated", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  user: one(user, {
    fields: [budgets.userId],
    references: [user.id],
  }),
  budgetCategories: many(budgetCategories),
}));

export const budgetCategoriesRelations = relations(
  budgetCategories,
  ({ one }) => ({
    budget: one(budgets, {
      fields: [budgetCategories.budgetId],
      references: [budgets.id],
    }),
    category: one(categories, {
      fields: [budgetCategories.categoryId],
      references: [categories.id],
    }),
  })
);
