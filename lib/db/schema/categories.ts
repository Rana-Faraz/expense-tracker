import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth";
import { budgetCategories } from "./budgets";
import { expenses } from "./expenses";

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").notNull(), // hex color code
  icon: text("icon").notNull(), // React Icons name (e.g., "FaHome", "FaShoppingCart")
  type: text("type").notNull().$type<"need" | "want" | "savings" | "debt">(),
  parentId: text("parent_id").references((): any => categories.id), // for subcategories
  isDefault: boolean("is_default").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(user, {
    fields: [categories.userId],
    references: [user.id],
  }),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "parentChild",
  }),
  children: many(categories, {
    relationName: "parentChild",
  }),
  expenses: many(expenses),
  budgetCategories: many(budgetCategories),
}));
