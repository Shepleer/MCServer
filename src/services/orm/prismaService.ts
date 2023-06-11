import { PrismaClient } from "@prisma/client";

const prismaService = new PrismaClient();

prismaService.$on('beforeExit', () => {
    console.log('Shut down prisma server');
});

export default prismaService;