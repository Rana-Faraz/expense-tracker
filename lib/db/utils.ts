import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { defaultCategories } from "./seeds/defaultCategories";
import { eq } from "drizzle-orm";

/**
 * Seeds default categories for a new user
 * @param userId - The user ID to create categories for
 */
export async function seedDefaultCategories(userId: string) {
  try {
    // Check if user already has categories
    const existingCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId))
      .limit(1);

    if (existingCategories.length > 0) {
      return { success: true, message: "Categories already exist for user" };
    }

    // Insert default categories
    const categoriesToInsert = defaultCategories.map((category) => ({
      ...category,
      userId,
      isActive: true,
    }));

    await db.insert(categories).values(categoriesToInsert);

    return {
      success: true,
      message: `Successfully created ${categoriesToInsert.length} default categories`,
    };
  } catch (error) {
    console.error("Error seeding default categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Gets the current month in YYYY-MM format
 */
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Gets a specific month in YYYY-MM format
 */
export function getMonthString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Parses a month string (YYYY-MM) to a Date object
 */
export function parseMonthString(monthString: string): Date {
  const [year, month] = monthString.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

/**
 * Gets the start and end dates for a given month
 */
export function getMonthDateRange(monthString: string) {
  const [year, month] = monthString.split("-").map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  return { startDate, endDate };
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Converts a numeric string from database to number
 */
export function numericToNumber(value: string | null): number {
  return value ? parseFloat(value) : 0;
}
