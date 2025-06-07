#!/usr/bin/env tsx

import { db } from "@/lib/db";
import { user, categories } from "@/lib/db/schema";
import { defaultCategories } from "@/lib/db/seeds/defaultCategories";
import { seedDefaultCategories } from "@/lib/db/utils";
import { eq } from "drizzle-orm";

/**
 * Seed script to create default categories for users
 * Usage:
 *   - npm run seed:categories (seeds for all users)
 *   - npm run seed:categories -- --email=user@example.com (seeds for specific user)
 *   - npm run seed:categories -- --userId=user123 (seeds for specific user ID)
 */

interface SeedOptions {
  email?: string;
  userId?: string;
  force?: boolean; // Force re-seed even if categories exist
}

function parseArgs(): SeedOptions {
  const args = process.argv.slice(2);
  const options: SeedOptions = {};

  for (const arg of args) {
    if (arg.startsWith("--email=")) {
      options.email = arg.split("=")[1];
    } else if (arg.startsWith("--userId=")) {
      options.userId = arg.split("=")[1];
    } else if (arg === "--force") {
      options.force = true;
    }
  }

  return options;
}

async function getAllUsers() {
  try {
    const users = await db.select().from(user);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function getUserByEmail(email: string) {
  try {
    const users = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    return users[0] || null;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    return null;
  }
}

async function getUserById(userId: string) {
  try {
    const users = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);
    return users[0] || null;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }
}

async function seedCategoriesForUser(
  userId: string,
  userName: string,
  force = false
) {
  console.log(`\n📂 Seeding categories for user: ${userName} (${userId})`);

  if (!force) {
    // Check if user already has categories
    const existingCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId))
      .limit(1);

    if (existingCategories.length > 0) {
      console.log(
        `  ⚠️  User already has categories (${existingCategories.length} found)`
      );
      console.log(`     Use --force flag to re-seed`);
      return { success: true, skipped: true };
    }
  } else {
    // Delete existing categories if force is enabled
    const deletedCategories = await db
      .delete(categories)
      .where(eq(categories.userId, userId));
    console.log(`  🗑️  Deleted existing categories`);
  }

  // Seed default categories
  const result = await seedDefaultCategories(userId);

  if (result.success) {
    console.log(`  ✅ ${result.message}`);

    // Show summary of created categories
    const createdCategories = await db
      .select({
        name: categories.name,
        type: categories.type,
        color: categories.color,
      })
      .from(categories)
      .where(eq(categories.userId, userId));

    console.log(`  📊 Categories by type:`);
    const categoriesByType = createdCategories.reduce(
      (acc, cat) => {
        acc[cat.type] = (acc[cat.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    Object.entries(categoriesByType).forEach(([type, count]) => {
      console.log(`     ${type.toUpperCase()}: ${count} categories`);
    });

    return { success: true, count: createdCategories.length };
  } else {
    console.log(`  ❌ Failed to seed categories: ${result.error}`);
    return { success: false, error: result.error };
  }
}

async function main() {
  console.log("🌱 Starting category seeding script...\n");

  const options = parseArgs();
  let targetUsers: Array<{ id: string; name: string; email: string }> = [];

  // Determine which users to seed
  if (options.userId) {
    console.log(`🔍 Looking for user with ID: ${options.userId}`);
    const targetUser = await getUserById(options.userId);
    if (targetUser) {
      targetUsers = [targetUser];
      console.log(`✅ Found user: ${targetUser.name} (${targetUser.email})`);
    } else {
      console.log(`❌ User with ID ${options.userId} not found`);
      process.exit(1);
    }
  } else if (options.email) {
    console.log(`🔍 Looking for user with email: ${options.email}`);
    const targetUser = await getUserByEmail(options.email);
    if (targetUser) {
      targetUsers = [targetUser];
      console.log(`✅ Found user: ${targetUser.name} (${targetUser.email})`);
    } else {
      console.log(`❌ User with email ${options.email} not found`);
      process.exit(1);
    }
  } else {
    console.log("🔍 Getting all users...");
    const allUsers = await getAllUsers();
    if (allUsers.length === 0) {
      console.log("❌ No users found in the database");
      console.log(
        "💡 Make sure you have users registered in your system first"
      );
      process.exit(1);
    }
    targetUsers = allUsers;
    console.log(`✅ Found ${allUsers.length} users`);
  }

  console.log(`\n🎯 Will seed categories for ${targetUsers.length} user(s)`);
  if (options.force) {
    console.log("⚠️  FORCE mode enabled - existing categories will be deleted");
  }

  // Seed categories for each user
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const user of targetUsers) {
    const result = await seedCategoriesForUser(
      user.id,
      user.name,
      options.force
    );

    if (result.success) {
      if (result.skipped) {
        skippedCount++;
      } else {
        successCount++;
      }
    } else {
      errorCount++;
    }
  }

  // Final summary
  console.log(`\n📊 Seeding Summary:`);
  console.log(`   ✅ Successfully seeded: ${successCount} users`);
  console.log(`   ⏭️  Skipped (already exists): ${skippedCount} users`);
  console.log(`   ❌ Errors: ${errorCount} users`);
  console.log(
    `   📂 Default categories available: ${defaultCategories.length}`
  );

  console.log(`\n🎉 Category seeding completed!`);

  if (skippedCount > 0 && !options.force) {
    console.log(`\n💡 Tip: Use --force flag to re-seed existing categories`);
  }

  process.exit(0);
}

// Handle errors
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});

// Run the script
main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
