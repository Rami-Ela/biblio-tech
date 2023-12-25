import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
    // @ts-expect-error oui oui baguette
  if (!global.prisma) {
        // @ts-expect-error oui oui baguette
    global.prisma = new PrismaClient();
  }
      // @ts-expect-error oui oui baguette
  prisma = global.prisma;
}

export default prisma;