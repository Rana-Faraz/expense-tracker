# Expense Tracker - Zero-Based Budgeting App

## 🎯 Project Overview

A modern, zero-based budgeting application built with Next.js that helps users track personal expenses against income, ensuring every dollar is allocated to a category (Income - Expenses = 0).

## 🏗️ System Architecture

### Frontend Framework

- **Next.js 14** (App Router) with TypeScript
- **React 18** with Server Components and Client Components
- **Tailwind CSS** for styling
- **shadcn/ui** component library for consistent UI

### State Management

- **Zustand** for global state management
- Persistent storage with localStorage
- Type-safe store definitions

### UI/UX Libraries

- **shadcn/ui** components (buttons, forms, tables, dialogs)
- **Recharts** for data visualization and charts
- **React Hook Form** with Zod validation for form handling
- **date-fns** for date manipulation and formatting
- **React Icons** for iconography
- **Better Auth** for authentication

### Data Storage

- **PostgreSQL** with Drizzle ORM
- **Better Auth** for authentication and user management
- **Schema Push Workflow** for rapid development
- **Type-safe database** operations

## 🎨 Core Features

### 1. Dashboard Overview

- **Income vs Expenses** summary for current month
- **Budget allocation** pie chart
- **Spending trends** line chart (last 6 months)
- **Quick action buttons** (Add Income, Add Expense, Create Budget)
- **Alerts** for over-budget categories

### 2. Zero-Based Budgeting System

- **Monthly budget cycles** (reset each month)
- **Category-based allocation**
- **Income allocation** - assign every dollar to categories
- **Remaining unallocated** amount tracker
- **Budget vs Actual** comparison

### 3. Income Management

- **Income sources** (salary, freelance, investments, etc.)
- **Recurring income** setup
- **One-time income** entries
- **Income categorization**

### 4. Expense Tracking

- **Manual expense entry** with receipt details
- **Expense categories** (housing, food, transportation, etc.)
- **Recurring expenses** (rent, utilities, subscriptions)
- **Expense search and filtering**
- **Bulk expense import** (CSV)

### 5. Category Management

- **Default categories** (needs vs wants)
- **Custom category creation**
- **Category budgets** and limits
- **Subcategory support**
- **Category analytics**

### 6. Reports & Analytics

- **Monthly spending reports**
- **Category breakdown** charts
- **Trend analysis** over time
- **Budget performance** metrics
- **Export functionality** (PDF, CSV)

### 7. Goals & Savings

- **Savings goals** tracking
- **Emergency fund** tracker
- **Debt payoff** progress
- **Investment allocation**

## 🗂️ File Structure

```
expense-tracker/
├── app/
│   ├── (dashboard)/
│   │   ├── page.tsx                    # Main dashboard
│   │   ├── budget/
│   │   │   ├── page.tsx               # Budget overview
│   │   │   └── create/page.tsx        # Create/edit budget
│   │   ├── expenses/
│   │   │   ├── page.tsx               # Expense list
│   │   │   └── add/page.tsx           # Add expense
│   │   ├── income/
│   │   │   ├── page.tsx               # Income list
│   │   │   └── add/page.tsx           # Add income
│   │   ├── categories/
│   │   │   └── page.tsx               # Manage categories
│   │   ├── reports/
│   │   │   └── page.tsx               # Reports & analytics
│   │   └── settings/
│   │       └── page.tsx               # App settings
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Landing page
│   └── globals.css                     # Global styles
├── components/
│   ├── ui/                            # shadcn/ui components
│   ├── layout/
│   │   ├── Sidebar.tsx                # Navigation sidebar
│   │   ├── Header.tsx                 # Top header
│   │   └── Footer.tsx                 # Footer
│   ├── dashboard/
│   │   ├── OverviewCards.tsx          # Summary cards
│   │   ├── BudgetChart.tsx            # Budget visualization
│   │   ├── TrendChart.tsx             # Spending trends
│   │   └── RecentTransactions.tsx     # Recent activity
│   ├── forms/
│   │   ├── IncomeForm.tsx             # Add/edit income
│   │   ├── ExpenseForm.tsx            # Add/edit expense
│   │   ├── BudgetForm.tsx             # Create budget
│   │   └── CategoryForm.tsx           # Manage categories
│   ├── tables/
│   │   ├── ExpenseTable.tsx           # Expense data table
│   │   ├── IncomeTable.tsx            # Income data table
│   │   └── TransactionTable.tsx       # All transactions
│   └── charts/
│       ├── PieChart.tsx               # Category breakdown
│       ├── LineChart.tsx              # Trends over time
│       ├── BarChart.tsx               # Monthly comparisons
│       └── ProgressChart.tsx          # Goal progress
├── lib/
│   ├── auth.ts                        # Better Auth configuration
│   ├── auth-client.ts                 # Client-side auth utilities
│   ├── db/
│   │   ├── index.ts                   # Drizzle instance
│   │   ├── schema/                    # Database schemas
│   │   │   ├── auth.ts               # Auth tables (existing)
│   │   │   ├── budget.ts             # Budget tables
│   │   │   ├── expense.ts            # Expense tables
│   │   │   ├── income.ts             # Income tables
│   │   │   ├── category.ts           # Category tables
│   │   │   └── index.ts              # Schema exports
│   │   └── migrate.ts                # Migration utilities
│   ├── stores/
│   │   ├── budgetStore.ts             # Budget state
│   │   ├── expenseStore.ts            # Expense state
│   │   ├── incomeStore.ts             # Income state
│   │   ├── categoryStore.ts           # Category state
│   │   └── settingsStore.ts           # App settings
│   ├── utils/
│   │   ├── calculations.ts            # Budget calculations
│   │   ├── formatting.ts              # Number/date formatting
│   │   ├── validation.ts              # Form validation schemas
│   │   └── db.ts                      # Database utilities
│   ├── types/
│   │   ├── budget.ts                  # Budget types
│   │   ├── expense.ts                 # Expense types
│   │   ├── income.ts                  # Income types
│   │   └── category.ts                # Category types
│   └── constants/
│       ├── categories.ts              # Default categories
│       └── config.ts                  # App configuration
├── hooks/
│   ├── useBudget.ts                   # Budget operations
│   ├── useExpenses.ts                 # Expense operations
│   ├── useIncome.ts                   # Income operations
│   └── useCategories.ts               # Category operations
└── public/
    ├── icons/                         # Category icons
    └── images/                        # App images
```

## 📊 Data Models

### Budget Model

```typescript
interface Budget {
  id: string;
  month: string; // YYYY-MM format
  totalIncome: number;
  totalAllocated: number;
  categories: CategoryBudget[];
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryBudget {
  categoryId: string;
  allocated: number;
  spent: number; // calculated field
  remaining: number; // calculated field
}
```

### Expense Model

```typescript
interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  paymentMethod: "cash" | "card" | "transfer" | "other";
  recurring: boolean;
  recurringPattern?: RecurringPattern;
  tags: string[];
  receipt?: string; // file path or base64
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number; // every X frequency
  endDate?: Date;
}
```

### Income Model

```typescript
interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: Date;
  recurring: boolean;
  recurringPattern?: RecurringPattern;
  taxable: boolean;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Category Model

```typescript
interface Category {
  id: string;
  name: string;
  description?: string;
  color: string; // hex color
  icon: string; // icon name
  type: "need" | "want" | "savings" | "debt";
  parentId?: string; // for subcategories
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Technical Implementation

### Database Schema with Drizzle ORM

```typescript
// lib/db/schema/category.ts
export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").notNull(), // hex color
  icon: text("icon").notNull(), // React Icon name
  type: text("type").notNull().$type<"need" | "want" | "savings" | "debt">(),
  parentId: text("parent_id").references(() => categories.id),
  isDefault: boolean("is_default").default(false),
  isActive: boolean("is_active").default(true),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// lib/db/schema/budget.ts
export const budgets = pgTable("budgets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  month: text("month").notNull(), // YYYY-MM format
  totalIncome: numeric("total_income", { precision: 10, scale: 2 }).notNull(),
  totalAllocated: numeric("total_allocated", {
    precision: 10,
    scale: 2,
  }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
  allocated: numeric("allocated", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// lib/db/schema/expense.ts
export const expenses = pgTable("expenses", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
  date: timestamp("date").notNull(),
  paymentMethod: text("payment_method")
    .notNull()
    .$type<"cash" | "card" | "transfer" | "other">(),
  recurring: boolean("recurring").default(false),
  tags: text("tags").array(), // PostgreSQL array
  receipt: text("receipt"), // file path or base64
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// lib/db/schema/income.ts
export const incomes = pgTable("incomes", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  source: text("source").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  recurring: boolean("recurring").default(false),
  taxable: boolean("taxable").default(true),
  tags: text("tags").array(),
  notes: text("notes"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### State Management with Zustand

```typescript
// Budget Store
interface BudgetStore {
  currentBudget: Budget | null;
  budgets: Budget[];

  // Actions
  createBudget: (
    budget: Omit<Budget, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  setCurrentBudget: (month: string) => void;

  // Computed
  getRemainingToAllocate: () => number;
  getCategorySpending: (categoryId: string) => number;
  getBudgetStatus: () => "under" | "on-track" | "over";
}

// Expense Store
interface ExpenseStore {
  expenses: Expense[];
  filters: ExpenseFilters;

  // Actions
  addExpense: (
    expense: Omit<Expense, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: Partial<ExpenseFilters>) => void;

  // Computed
  getFilteredExpenses: () => Expense[];
  getTotalExpenses: (month?: string) => number;
  getExpensesByCategory: (categoryId: string) => Expense[];
}
```

### Form Validation with Zod

```typescript
// Expense Form Schema
const expenseSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  date: z.date(),
  paymentMethod: z.enum(["cash", "card", "transfer", "other"]),
  recurring: z.boolean(),
  recurringPattern: z
    .object({
      frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
      interval: z.number().positive(),
      endDate: z.date().optional(),
    })
    .optional(),
  tags: z.array(z.string()),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;
```

### Chart Components with Recharts

```typescript
// Budget Allocation Pie Chart
interface BudgetPieChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

## 🎨 UI/UX Design

### Color Scheme

- **Primary**: Green (#10b981) - represents money/growth
- **Secondary**: Blue (#3b82f6) - trustworthy, professional
- **Success**: Green (#22c55e) - under budget
- **Warning**: Yellow (#f59e0b) - approaching limit
- **Danger**: Red (#ef4444) - over budget
- **Neutral**: Gray (#6b7280) - general text

### Layout Structure

- **Sidebar Navigation** (collapsed on mobile)
- **Top Header** with search, notifications, profile
- **Main Content Area** with breadcrumbs
- **Card-based Design** for sections
- **Responsive Grid System**

### Component Library (shadcn/ui)

- **Buttons**: Primary, secondary, ghost variants
- **Forms**: Input, select, textarea, checkbox, radio
- **Data Display**: Tables, cards, badges, progress bars
- **Feedback**: Alerts, toasts, loading states
- **Navigation**: Tabs, breadcrumbs, pagination
- **Overlays**: Modals, dropdowns, tooltips

## 📈 Features by Phase

### Phase 1: Core MVP (Week 1-2)

- [x] Project setup with Next.js, TypeScript, Tailwind
- [ ] Basic layout with sidebar navigation
- [ ] Income and expense forms
- [ ] Category management
- [ ] Simple budget creation
- [ ] Basic dashboard with summary cards
- [ ] PostgreSQL database with Drizzle ORM

### Phase 2: Enhanced Features (Week 3-4)

- [ ] Advanced charts and visualizations
- [ ] Expense/income search and filtering
- [ ] Recurring transactions
- [ ] Budget vs actual analysis
- [ ] Monthly reports
- [ ] Data export functionality
- [ ] Responsive mobile design

### Phase 3: Advanced Features (Week 5-6)

- [ ] Goals and savings tracking
- [ ] Budget templates
- [ ] Receipt attachment
- [ ] Advanced analytics
- [ ] Category insights and recommendations
- [ ] Bulk import/export
- [ ] Dark mode support

### Phase 4: Future Enhancements

- [ ] Cloud synchronization
- [ ] Multi-currency support
- [ ] Bank account integration
- [ ] AI-powered categorization
- [ ] Spending predictions
- [ ] Collaborative budgets
- [ ] Mobile app (React Native)

## 🔧 Development Setup

### Environment Variables

```bash
# .env.local
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Package Dependencies

```json
{
  "dependencies": {
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "better-auth": "^1.2.8",
    "drizzle-orm": "^0.44.2",
    "pg": "^8.16.0",
    "@hookform/resolvers": "^5.0.1",
    "react-hook-form": "^7.57.0",
    "zod": "^3.25.56",
    "recharts": "^2.8.0",
    "react-icons": "^5.5.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.0",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "next-themes": "^0.4.6",
    "sonner": "^2.0.5",
    "dotenv": "^16.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/pg": "^8.15.4",
    "drizzle-kit": "^0.31.1",
    "eslint": "^9.0.0",
    "eslint-config-next": "15.3.3",
    "prettier": "^3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.12"
  }
}
```

### Development Commands

```bash
# Install dependencies
npm install

# Database commands
npm run db:generate    # Generate migrations
npm run db:push       # Push schema to database (for development)
npm run db:migrate    # Run migrations (for production)
npm run db:studio     # Open Drizzle Studio
npm run db:drop       # Drop database

# Add shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input form table card

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 🧪 Testing Strategy

### Unit Testing

- **Utility functions** (calculations, formatting)
- **Store actions** and computed values
- **Form validation** schemas
- **Component behavior**

### Integration Testing

- **Form submissions** and data flow
- **Store persistence** and hydration
- **Chart rendering** with data
- **Navigation** and routing

### E2E Testing

- **Complete user journeys** (create budget → add expenses → view reports)
- **Cross-browser compatibility**
- **Mobile responsiveness**
- **Data persistence** across sessions

### Authentication with Better Auth

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});

// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

// Usage in components
const { data: session, isPending } = authClient.useSession();
```

## 🔒 Security Considerations

### Data Privacy

- **User-specific data isolation** with proper user authentication
- **Row-level security** with user ID constraints
- **Secure session management** with Better Auth

### Input Validation

- **Server-side validation** for all inputs
- **XSS prevention** with proper sanitization
- **SQL injection protection** (future database integration)

### Error Handling

- **Graceful error recovery**
- **User-friendly error messages**
- **Error logging** and monitoring

## 📱 Mobile Considerations

### Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Touch-friendly** button sizes and spacing
- **Optimized forms** for mobile input
- **Collapsible navigation** for small screens

### Progressive Web App (PWA)

- **Service worker** for offline functionality
- **App manifest** for installation
- **Push notifications** for budget alerts
- **Background sync** for data updates

## 🚀 Deployment Strategy

### Development

- **Local development** with hot reload
- **Git workflow** with feature branches
- **Code review** process

### Staging

- **Vercel preview deployments** for testing
- **Environment parity** with production
- **QA testing** and user acceptance

### Production

- **Vercel production deployment**
- **Custom domain** setup
- **Performance monitoring**
- **Error tracking** with Sentry
- **Analytics** with privacy-focused tools

## 📚 Documentation Plan

### User Documentation

- **Getting started guide**
- **Feature tutorials** with screenshots
- **FAQ** and troubleshooting
- **Video walkthroughs**

### Developer Documentation

- **Architecture overview**
- **API documentation**
- **Contributing guidelines**
- **Deployment instructions**

## 🎯 Success Metrics

### User Experience

- **Task completion rate** for core features
- **Time to complete** common actions
- **User satisfaction** surveys
- **Feature adoption** rates

### Technical Performance

- **Page load times** < 2 seconds
- **First contentful paint** < 1 second
- **Lighthouse scores** > 90
- **Core Web Vitals** optimization

### Business Goals

- **User retention** rates
- **Feature usage** analytics
- **Error rates** < 1%
- **Uptime** > 99.9%

---

This comprehensive plan provides a solid foundation for building a modern, user-friendly zero-based budgeting application. The modular architecture and phased approach allow for iterative development while maintaining high code quality and user experience standards.
