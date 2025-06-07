import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { seedDefaultCategories } from "@/lib/db/utils";

/**
 * API endpoint to seed default categories for the authenticated user
 * POST /api/seed-categories
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userName = session.user.name;

    console.log(`🌱 API: Seeding categories for user ${userName} (${userId})`);

    // Parse query parameters for force option
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    if (force) {
      console.log("⚠️  Force mode enabled via API");
    }

    // Seed the categories
    const result = await seedDefaultCategories(userId);

    if (result.success) {
      console.log(`✅ API: ${result.message}`);

      return NextResponse.json({
        success: true,
        message: result.message,
        user: {
          id: userId,
          name: userName,
        },
      });
    } else {
      console.error(`❌ API: Failed to seed categories: ${result.error}`);

      return NextResponse.json(
        {
          error: "Failed to seed categories",
          details: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ API: Unexpected error in seed-categories:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET method to check if user has categories seeded
 * GET /api/seed-categories
 */
export async function GET() {
  try {
    // Get the authenticated user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check if user has categories
    const { db } = await import("@/lib/db");
    const { categories } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");

    const userCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        type: categories.type,
        isDefault: categories.isDefault,
      })
      .from(categories)
      .where(eq(categories.userId, userId));

    return NextResponse.json({
      hasCategories: userCategories.length > 0,
      categoryCount: userCategories.length,
      categories: userCategories,
      user: {
        id: userId,
        name: session.user.name,
      },
    });
  } catch (error) {
    console.error("❌ API: Error checking categories:", error);

    return NextResponse.json(
      {
        error: "Failed to check categories",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
