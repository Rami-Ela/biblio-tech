'use server';

import { PrismaClient } from '@prisma/client';

export async function getAllBooks() {
  const prisma = new PrismaClient();
  return prisma.book.findMany({ include: { author: true } });
}

export async function addBook(formData: FormData) {
  const prisma = new PrismaClient();
  const { title, authorId } = {
    title: formData.get('title'),
    authorId: formData.get('authorId'),
  };

  if (!title || !authorId) {
    throw new Error('Missing parameters');
  }

  return prisma.book.create({
    data: { title: title.toString(), authorId: authorId.toString() },
  });
}
