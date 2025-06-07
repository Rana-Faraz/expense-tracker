# Next.js + Drizzle ORM + Better Auth + shadcn/ui Template

A modern, full-stack Next.js template with authentication, database, and UI components pre-configured. This template provides a solid foundation for building web applications with the latest technologies and best practices.

## 🚀 Tech Stack

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Drizzle ORM](https://orm.drizzle.team)** - TypeScript ORM for PostgreSQL
- **[Better Auth](https://www.better-auth.com)** - Full-featured authentication framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful and accessible UI components
- **[TypeScript](https://www.typescriptlang.org)** - Type safety and developer experience
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[PostgreSQL](https://postgresql.org)** - Powerful, open source object-relational database

## ✨ Features

- 🔐 **Complete Authentication System** - Email/password auth with session management
- 📊 **Type-safe Database** - Drizzle ORM with PostgreSQL support
- 🎨 **Beautiful UI Components** - shadcn/ui with Tailwind CSS
- 🚀 **Modern Next.js** - App Router, Server Components, and TypeScript
- 📦 **Schema Push Workflow** - Uses `drizzle-kit push` for rapid development
- 🛡️ **Type Safety** - End-to-end type safety from database to UI
- 📱 **Responsive Design** - Mobile-first responsive components
- ⚡ **Performance Optimized** - Built-in optimizations and best practices

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Shared utilities
│   ├── auth.ts           # Better Auth configuration
│   ├── auth-client.ts    # Client-side auth utilities
│   ├── db/               # Database configuration
│   │   ├── index.ts      # Drizzle instance
│   │   ├── schema/       # Database schemas
│   │   └── migrate.ts    # Migration utilities
│   └── utils.ts          # Utility functions
├── components.json        # shadcn/ui configuration
├── drizzle.config.ts     # Drizzle Kit configuration
└── middleware.ts         # Next.js middleware
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL database (local or cloud)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Rana-Faraz/nextjs-drizzle-better-auth
cd nextjs-drizzle-better-auth

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 2. Environment Setup

Copy the environment variables:

```bash
cp .env.example .env.local
```

> **⚠️ Important**: Generate a strong, random value for `BETTER_AUTH_SECRET`. This is crucial for session security and encryption. You can use `openssl rand -base64 32` to generate a secure secret.

Configure your environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Database Setup

This template uses **drizzle-kit push** for schema management instead of traditional migrations. This approach is perfect for rapid development and prototyping:

```bash
# Push your schema to the database
npm run db:push
# or
pnpm db:push
```

The `db:push` command will:

- Read your schema from `lib/db/schema/`
- Compare it with your database
- Apply changes directly without generating migration files

### 4. Start Development

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📊 Database Management

### Schema Development with Push

This template uses `drizzle-kit push` for a streamlined development experience:

```bash
# Push schema changes to database
npm run db:push

# Check schema differences (dry run)
npm run db:check

# Generate types and introspect database
npm run db:pull

# Open Drizzle Studio (database browser)
npm run db:studio
```

### Why Push Over Migrations?

- **Faster Development**: No migration file management
- **Simpler Workflow**: Direct schema-to-database synchronization
- **Perfect for Prototyping**: Rapid iteration and experimentation
- **Type-Safe**: Automatic TypeScript type generation

### When to Use Migrations

Consider switching to migrations for:

- Production deployments
- Team collaboration with multiple developers
- Complex schema changes requiring data preservation
- Audit trails of database changes

## 🔐 Authentication

Better Auth is pre-configured with:

- **Email/Password Authentication**
- **Session Management**
- **TypeScript Support**
- **Next.js Integration**

### Adding Authentication to Pages

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/signin");
  }

  return <div>Protected content</div>;
}
```

### Client-Side Usage

```typescript
import { authClient } from "@/lib/auth-client";

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password",
});

// Sign out
await authClient.signOut();

// Get session
const { data: session } = authClient.useSession();
```

## 🎨 UI Components

shadcn/ui components are ready to use:

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add form
npx shadcn@latest add dialog
```

### Example Usage

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## 📝 Available Scripts

| Script       | Description                             |
| ------------ | --------------------------------------- |
| `dev`        | Start development server with Turbopack |
| `build`      | Build for production                    |
| `start`      | Start production server                 |
| `lint`       | Run ESLint                              |
| `db:push`    | Push schema changes to database         |
| `db:pull`    | Pull and introspect database schema     |
| `db:studio`  | Open Drizzle Studio                     |
| `db:check`   | Check schema differences                |
| `db:migrate` | Run migrations (if needed)              |

## 🔧 Configuration

### Database Configuration

Update `drizzle.config.ts` for your database:

```typescript
export default defineConfig({
  schema: "./lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Authentication Configuration

Customize `lib/auth.ts`:

```typescript
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    // Add social providers here
  },
});
```

### UI Theme Configuration

Modify `components.json` for custom themes:

```json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic builds

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
BETTER_AUTH_SECRET="your-production-secret-key"
BETTER_AUTH_URL="https://your-domain.com"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-domain.com"
```

## 📚 Learn More

### Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://www.better-auth.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Key Concepts

- **App Router**: Next.js 13+ routing system
- **Server Components**: React components that render on the server
- **Type Safety**: End-to-end TypeScript integration
- **Schema Push**: Direct database schema synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Template Features

- ✅ Latest Next.js 15 with App Router
- ✅ Drizzle ORM with PostgreSQL
- ✅ Better Auth authentication system
- ✅ shadcn/ui components with Tailwind CSS
- ✅ TypeScript configuration
- ✅ ESLint and Prettier setup
- ✅ Schema push workflow (no migrations)
- ✅ Responsive design system
- ✅ Production-ready configuration

---

**Ready to build something amazing? Get started by cloning this template and following the setup guide above!** 🎉
