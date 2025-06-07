# Database Schema Documentation

## Overview

This document describes the PostgreSQL database schema for the Zero-Based Budgeting Expense Tracker application, implemented using Drizzle ORM.

## Technology Stack

- **Database**: PostgreSQL
- **ORM**: Drizzle ORM v0.44.2
- **Authentication**: Better Auth v1.2.8
- **Schema Management**: Drizzle Kit v0.31.1

## Tables

### 1. Authentication Tables (Existing)

These tables are managed by Better Auth and already exist:

#### `user`

- `id` (text, primary key)
- `name` (text, not null)
- `email` (text, not null, unique)
- `emailVerified` (boolean, not null)
- `image` (text)
- `createdAt` (timestamp, not null)
- `updatedAt` (timestamp, not null)

#### `session`

- `id` (text, primary key)
- `expiresAt` (timestamp, not null)
- `token` (text, not null, unique)
- `createdAt` (timestamp, not null)
- `updatedAt` (timestamp, not null)
- `ipAddress` (text)
- `userAgent` (text)
- `userId` (text, not null, foreign key to user.id)

### 2. Categories Table

#### `categories`

Manages expense categories for zero-based budgeting.

**Columns:**

- `id` (text, primary key, UUID)
- `name` (text, not null) - Category name
- `description` (text) - Optional description
- `color` (text, not null) - Hex color code for UI
- `icon` (text, not null) - React Icon name (e.g., "FaHome")
- `type` (text, not null) - Enum: "need" | "want" | "savings" | "debt"
- `parentId` (text) - Self-reference for subcategories
- `isDefault` (boolean, default false) - System default categories
- `isActive` (boolean, default true) - Soft delete functionality
- `userId` (text, not null, foreign key to user.id, cascade delete)
- `createdAt` (timestamp, not null, default now)
- `updatedAt` (timestamp, not null, default now)

**Relationships:**

- Belongs to User (many-to-one)
- Self-referential (parent-child categories)
- Has many Expenses
- Has many BudgetCategories

### 3. Budget Tables

#### `budgets`

Monthly budget tracking for zero-based budgeting.

**Columns:**

- `id` (text, primary key, UUID)
- `month` (text, not null) - Format: "YYYY-MM"
- `totalIncome` (numeric(12,2), not null) - Total monthly income
- `totalAllocated` (numeric(12,2), not null) - Total allocated amount
- `userId` (text, not null, foreign key to user.id, cascade delete)
- `createdAt` (timestamp, not null, default now)
- `updatedAt` (timestamp, not null, default now)

**Relationships:**

- Belongs to User (many-to-one)
- Has many BudgetCategories

#### `budget_categories`

Budget allocation per category.

**Columns:**

- `id` (text, primary key, UUID)
- `budgetId` (text, not null, foreign key to budgets.id, cascade delete)
- `categoryId` (text, not null, foreign key to categories.id, cascade delete)
- `allocated` (numeric(12,2), not null) - Allocated amount for this category
- `createdAt` (timestamp, not null, default now)
- `updatedAt` (timestamp, not null, default now)

**Relationships:**

- Belongs to Budget (many-to-one)
- Belongs to Category (many-to-one)

### 4. Expenses Table

#### `expenses`

Individual expense transactions.

**Columns:**

- `id` (text, primary key, UUID)
- `amount` (numeric(12,2), not null) - Expense amount
- `description` (text, not null) - Expense description
- `categoryId` (text, not null, foreign key to categories.id)
- `date` (timestamp, not null) - Transaction date
- `paymentMethod` (text, not null) - Enum: "cash" | "card" | "transfer" | "other"
- `recurring` (boolean, default false) - Is this a recurring expense
- `recurringFrequency` (text) - Enum: "daily" | "weekly" | "monthly" | "yearly"
- `recurringInterval` (numeric(3,0)) - Repeat every X frequency units
- `recurringEndDate` (timestamp) - When recurring ends
- `tags` (text[], default empty array) - PostgreSQL array of tags
- `receipt` (text) - File path or base64 of receipt image
- `notes` (text) - Additional notes
- `userId` (text, not null, foreign key to user.id, cascade delete)
- `createdAt` (timestamp, not null, default now)
- `updatedAt` (timestamp, not null, default now)

**Relationships:**

- Belongs to User (many-to-one)
- Belongs to Category (many-to-one)

### 5. Income Table

#### `incomes`

Income sources and transactions.

**Columns:**

- `id` (text, primary key, UUID)
- `amount` (numeric(12,2), not null) - Income amount
- `source` (text, not null) - Income source (job, freelance, etc.)
- `description` (text, not null) - Income description
- `date` (timestamp, not null) - Income date
- `recurring` (boolean, default false) - Is this recurring income
- `recurringFrequency` (text) - Enum: "daily" | "weekly" | "monthly" | "yearly"
- `recurringInterval` (numeric(3,0)) - Repeat every X frequency units
- `recurringEndDate` (timestamp) - When recurring ends
- `taxable` (boolean, default true) - Is this taxable income
- `tags` (text[], default empty array) - PostgreSQL array of tags
- `notes` (text) - Additional notes
- `userId` (text, not null, foreign key to user.id, cascade delete)
- `createdAt` (timestamp, not null, default now)
- `updatedAt` (timestamp, not null, default now)

**Relationships:**

- Belongs to User (many-to-one)

## Default Categories

The system includes 17 pre-defined categories organized by type:

### NEEDS (6 categories)

- Housing (red, FaHome)
- Transportation (blue, FaCar)
- Groceries (green, FaShoppingCart)
- Healthcare (yellow, FaHeartbeat)
- Insurance (purple, FaShield)
- Utilities (cyan, FaBolt)

### WANTS (5 categories)

- Dining Out (pink, FaUtensils)
- Entertainment (orange, FaTv)
- Shopping (violet, FaBag)
- Travel (lime, FaPlane)
- Personal Care (teal, FaSpa)

### SAVINGS (4 categories)

- Emergency Fund (red-600, FaPiggyBank)
- Retirement (emerald-600, FaChartLine)
- Investment (violet-600, FaCoins)
- Vacation Fund (sky-600, FaUmbrella)

### DEBT (3 categories)

- Credit Cards (red-800, FaCreditCard)
- Student Loans (gray-800, FaGraduationCap)
- Personal Loans (gray-700, FaHandshake)

## Database Operations

### Schema Management

```bash
# Push schema changes to database (development)
npm run db:push

# Generate migration files (production)
npm run db:generate

# Run migrations (production)
npm run db:migrate

# Open Drizzle Studio
npm run db:studio

# Drop all tables (destructive)
npm run db:drop
```

### Utility Functions

- `seedDefaultCategories(userId)` - Creates default categories for new users
- `getCurrentMonth()` - Returns current month in YYYY-MM format
- `getMonthDateRange(monthString)` - Returns start/end dates for a month
- `formatCurrency(amount)` - Formats numbers as currency
- `numericToNumber(value)` - Converts DB numeric strings to numbers

## Zero-Based Budgeting Logic

The schema supports zero-based budgeting principles:

1. **Income Assignment**: All income must be allocated to categories
2. **Category Allocation**: `budgets.totalIncome` = `sum(budget_categories.allocated)`
3. **Spending Tracking**: Expenses are tracked against allocated amounts
4. **Balance Calculation**: `remaining = allocated - spent`
5. **Monthly Cycles**: Budgets are created per month with fresh allocations

## Security Features

- **Row-Level Security**: All tables include `userId` for data isolation
- **Cascade Deletes**: User deletion removes all associated data
- **Type Safety**: Enum constraints on payment methods and frequencies
- **UUID Primary Keys**: Prevents enumeration attacks

## Performance Considerations

- **Indexes**: Consider adding indexes on frequently queried columns:
  - `categories(userId, type)`
  - `expenses(userId, date, categoryId)`
  - `budgets(userId, month)`
  - `incomes(userId, date)`

## Future Enhancements

Potential schema additions:

- **Goals table**: Savings goals tracking
- **Transactions table**: Bank transaction imports
- **Notifications table**: Budget alerts and reminders
- **Attachments table**: File management for receipts
