import { PrismaClient } from "@prisma/client";

// Singleton pattern — avoids exhausting connections in Next.js dev (HMR).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function isDbConfigured(): boolean {
  return !!process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0;
}
