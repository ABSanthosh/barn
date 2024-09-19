import { PrismaClient } from '@prisma/client';
export const db = new PrismaClient();

// insert a new user
db.user.create({
  data: {
    email: "aaa",
    name: "bbb",
  }
})