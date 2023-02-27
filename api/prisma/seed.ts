// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy articles
    const ingredient = await prisma.ingredient.upsert({
        where: { name: 'Reis' },
        update: {},
        create: {
            name: 'Reis',
            calories: 100,
            protein: 10,
            fat: 10,
            carbs: 10,
            calcium: 10,
            iron: 10,
            magnesium: 10,
        },
    });

    console.log({ ingredient });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
