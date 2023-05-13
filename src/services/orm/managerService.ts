import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class ManagerService {
    static async getManager(where: Prisma.ManagerWhereUniqueInput) {
        return await prismaService.manager.findUnique({ where });
    }
}

export { ManagerService };