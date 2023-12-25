'use server';

import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/prefer-default-export
export async function getAllAuthors() {
  const prisma = new PrismaClient();
  return prisma.author.findMany();
}
