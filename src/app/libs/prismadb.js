import { PrismaClient } from "@prisma/client";

// Check if a Prisma Client instance named "prisma" exists globally; if not, create one.
const prisma = globalThis.prisma || new PrismaClient();

// In non-production environments, store the Prisma Client instance globally as "prisma."
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Export the Prisma Client instance (named "prisma") for use in other parts of the application.
export default prisma;
