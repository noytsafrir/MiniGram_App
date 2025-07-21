import { PrismaClient } from '@prisma/client';

// Create and export a single PrismaClient instance
const prisma = new PrismaClient();

export default prisma;
