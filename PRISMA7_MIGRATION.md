# Prisma 7 Migration Guide

## ⚠️ Breaking Changes in Prisma 7

Prisma 7.x introduced significant breaking changes that required major refactoring of our database setup.

## Changes Made

### 1. Schema Configuration (`schema.prisma`)
**Before (Prisma 5/6):**
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**After (Prisma 7):**
```prisma
datasource db {
  provider = "postgresql"
  # No url or directUrl - moved to prisma.config.ts
}
```

### 2. Prisma Configuration (`prisma.config.ts`)
```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),  // Direct connection for migrations
  },
});
```

### 3. PrismaClient Initialization

**Requires PostgreSQL Adapter:**
```bash
npm install @prisma/adapter-pg pg
```

**Runtime Client (`lib/db/prisma.ts`):**
```typescript
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
});
```

**Seed Script (`lib/db/seed.ts`):**
```typescript
import 'dotenv/config'; // MUST load env vars first
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});
```

## Environment Variables

`.env`:
```bash
# Pooling connection (for app runtime queries)
DATABASE_URL="postgresql://postgres.xxx:password@...pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (for Prisma migrations)
DIRECT_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

## Migration & Seed Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (uses DIRECT_URL from prisma.config.ts)
npx prisma migrate dev --name init

# Seed database (uses DATABASE_URL from Pool)
npm run db:seed

# View data in Prisma Studio
npx prisma studio
```

## Key Differences

| Feature | Prisma 5/6 | Prisma 7 |
|---------|-----------|----------|
| **Connection URL** | In `schema.prisma` | In `prisma.config.ts` |
| **PrismaClient** | `new PrismaClient()` | Requires `adapter` option |
| **Database Driver** | Built-in | Explicit adapter (@prisma/adapter-pg) |
| **Migration URL** | `directUrl` in schema | `datasource.url` in config |
| **Runtime URL** | `url` in schema | `Pool` constructor |

## Troubleshooting

### Error: "datasources" not supported
- **Cause:** Using `datasources` in PrismaClient constructor
- **Fix:** Use `adapter` option instead

### Error: "url property no longer supported"
- **Cause:** `url` still in `schema.prisma`
- **Fix:** Remove `url` and `directUrl` from schema, use `prisma.config.ts`

### Error: "SCRAM password must be a string"
- **Cause:** Environment variables not loaded
- **Fix:** Add `import 'dotenv/config'` at top of seed file

### Error: "PrismaClient needs non-empty options"
- **Cause:** Empty constructor `new PrismaClient()`
- **Fix:** Add adapter: `new PrismaClient({ adapter })`

## References
- [Prisma 7 Client Config](https://pris.ly/d/prisma7-client-config)
- [Prisma 7 Datasource Config](https://pris.ly/d/config-datasource)
- [@prisma/adapter-pg](https://www.npmjs.com/package/@prisma/adapter-pg)
