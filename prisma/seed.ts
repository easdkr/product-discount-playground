import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const discountPolicies = await prisma.discountPolicy.createManyAndReturn({
    data: [
      {
        type: 'percentage',
        amount: 0.1,
      },
      {
        type: 'fixed',
        amount: 3000,
      },
    ],
  });

  console.log({ discountPolicies });
}

seed().finally(async () => {
  await prisma.$disconnect();
});
