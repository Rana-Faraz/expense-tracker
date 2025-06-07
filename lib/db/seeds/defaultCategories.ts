// Default categories for zero-based budgeting
export const defaultCategories = [
  // NEEDS (Essential expenses)
  {
    name: "Housing",
    description: "Rent, mortgage, utilities, maintenance",
    color: "#ef4444", // red
    icon: "FaHome",
    type: "need" as const,
    isDefault: true,
  },
  {
    name: "Transportation",
    description: "Gas, car payment, insurance, maintenance",
    color: "#3b82f6", // blue
    icon: "FaCar",
    type: "need" as const,
    isDefault: true,
  },
  {
    name: "Groceries",
    description: "Food and household essentials",
    color: "#22c55e", // green
    icon: "FaShoppingCart",
    type: "need" as const,
    isDefault: true,
  },
  {
    name: "Healthcare",
    description: "Medical, dental, prescriptions",
    color: "#f59e0b", // yellow
    icon: "FaHeartbeat",
    type: "need" as const,
    isDefault: true,
  },
  {
    name: "Insurance",
    description: "Health, life, disability insurance",
    color: "#8b5cf6", // purple
    icon: "FaShield",
    type: "need" as const,
    isDefault: true,
  },
  {
    name: "Utilities",
    description: "Electric, water, gas, internet, phone",
    color: "#06b6d4", // cyan
    icon: "FaBolt",
    type: "need" as const,
    isDefault: true,
  },

  // WANTS (Non-essential but desired)
  {
    name: "Dining Out",
    description: "Restaurants, takeout, coffee",
    color: "#ec4899", // pink
    icon: "FaUtensils",
    type: "want" as const,
    isDefault: true,
  },
  {
    name: "Entertainment",
    description: "Movies, subscriptions, hobbies",
    color: "#f97316", // orange
    icon: "FaTv",
    type: "want" as const,
    isDefault: true,
  },
  {
    name: "Shopping",
    description: "Clothes, electronics, non-essentials",
    color: "#a855f7", // violet
    icon: "FaBag",
    type: "want" as const,
    isDefault: true,
  },
  {
    name: "Travel",
    description: "Vacations, trips, experiences",
    color: "#84cc16", // lime
    icon: "FaPlane",
    type: "want" as const,
    isDefault: true,
  },
  {
    name: "Personal Care",
    description: "Haircuts, gym, beauty, wellness",
    color: "#14b8a6", // teal
    icon: "FaSpa",
    type: "want" as const,
    isDefault: true,
  },

  // SAVINGS (Future planning)
  {
    name: "Emergency Fund",
    description: "3-6 months of expenses",
    color: "#dc2626", // red-600
    icon: "FaPiggyBank",
    type: "savings" as const,
    isDefault: true,
  },
  {
    name: "Retirement",
    description: "401k, IRA, long-term savings",
    color: "#059669", // emerald-600
    icon: "FaChartLine",
    type: "savings" as const,
    isDefault: true,
  },
  {
    name: "Investment",
    description: "Stocks, bonds, mutual funds",
    color: "#7c3aed", // violet-600
    icon: "FaCoins",
    type: "savings" as const,
    isDefault: true,
  },
  {
    name: "Vacation Fund",
    description: "Saving for future trips",
    color: "#0891b2", // sky-600
    icon: "FaUmbrella",
    type: "savings" as const,
    isDefault: true,
  },

  // DEBT (Debt payments)
  {
    name: "Credit Cards",
    description: "Credit card payments",
    color: "#991b1b", // red-800
    icon: "FaCreditCard",
    type: "debt" as const,
    isDefault: true,
  },
  {
    name: "Student Loans",
    description: "Education loan payments",
    color: "#1f2937", // gray-800
    icon: "FaGraduationCap",
    type: "debt" as const,
    isDefault: true,
  },
  {
    name: "Personal Loans",
    description: "Other loan payments",
    color: "#374151", // gray-700
    icon: "FaHandshake",
    type: "debt" as const,
    isDefault: true,
  },
] as const;
