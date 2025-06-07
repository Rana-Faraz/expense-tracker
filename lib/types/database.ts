import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import {
  categories,
  budgets,
  budgetCategories,
  expenses,
  incomes,
  user,
} from "@/lib/db/schema";

// User types
export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

// Category types
export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;
export type CategoryType = "need" | "want" | "savings" | "debt";

// Budget types
export type Budget = InferSelectModel<typeof budgets>;
export type NewBudget = InferInsertModel<typeof budgets>;

export type BudgetCategory = InferSelectModel<typeof budgetCategories>;
export type NewBudgetCategory = InferInsertModel<typeof budgetCategories>;

// Expense types
export type Expense = InferSelectModel<typeof expenses>;
export type NewExpense = InferInsertModel<typeof expenses>;
export type PaymentMethod = "cash" | "card" | "transfer" | "other";
export type RecurringFrequency = "daily" | "weekly" | "monthly" | "yearly";

// Income types
export type Income = InferSelectModel<typeof incomes>;
export type NewIncome = InferInsertModel<typeof incomes>;

// Extended types with computed fields
export interface BudgetWithCategories extends Budget {
  budgetCategories: (BudgetCategory & {
    category: Category;
  })[];
}

export interface CategoryWithSpending extends Category {
  allocated?: number;
  spent: number;
  remaining: number;
}

export interface ExpenseWithCategory extends Expense {
  category: Category;
}

export interface BudgetSummary {
  totalIncome: number;
  totalAllocated: number;
  totalSpent: number;
  remainingToAllocate: number;
  categories: CategoryWithSpending[];
  status: "under" | "on-track" | "over";
}

// Recurring pattern type
export interface RecurringPattern {
  frequency: RecurringFrequency;
  interval: number;
  endDate?: Date;
}

// Form data types
export interface ExpenseFormData {
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  paymentMethod: PaymentMethod;
  recurring: boolean;
  recurringPattern?: RecurringPattern;
  tags: string[];
  notes?: string;
  receipt?: string;
}

export interface IncomeFormData {
  amount: number;
  source: string;
  description: string;
  date: Date;
  recurring: boolean;
  recurringPattern?: RecurringPattern;
  taxable: boolean;
  tags: string[];
  notes?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  color: string;
  icon: string;
  type: CategoryType;
  parentId?: string;
}

export interface BudgetFormData {
  month: string;
  totalIncome: number;
  categories: {
    categoryId: string;
    allocated: number;
  }[];
}

// Filter types
export interface ExpenseFilters {
  categoryId?: string;
  paymentMethod?: PaymentMethod;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  tags?: string[];
  search?: string;
}

export interface IncomeFilters {
  source?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  taxable?: boolean;
  tags?: string[];
  search?: string;
}

// Chart data types
export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface BarChartData {
  name: string;
  budgeted: number;
  spent: number;
  remaining: number;
}

export interface LineChartData {
  date: string;
  income: number;
  expenses: number;
  balance: number;
}
