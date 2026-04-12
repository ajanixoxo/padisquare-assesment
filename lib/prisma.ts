import { PrismaClient } from "@prisma/client";
import { PrismaBunSqlite } from "prisma-adapter-bun-sqlite";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // Use the connection URL in the adapter constructor
  // The database is located at the project root based on PRISMA_CONFIG
  const adapter = new PrismaBunSqlite({ 
    url: "file:./dev.db" 
  });
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
