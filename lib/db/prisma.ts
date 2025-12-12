// Prisma client will be available after running: npx prisma generate
// Temporarily using a placeholder until database is configured

const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
};

// Placeholder - will be replaced after Prisma setup
export const prisma = globalForPrisma.prisma ?? null;

// After setting up Supabase and running migrations, uncomment:
// import { PrismaClient } from '@prisma/client';
// export const prisma = globalForPrisma.prisma ?? new PrismaClient({
//   log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
// });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
