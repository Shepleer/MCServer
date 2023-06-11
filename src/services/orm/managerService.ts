import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class ManagerService {
    static async createManager(data: Prisma.ManagerCreateInput) {
        return await prismaService.manager.create({ data });
    }

    static async getManager(where: Prisma.ManagerWhereUniqueInput) {
        return await prismaService.manager.findUnique({ where });
    }

    static async updateManager(where: Prisma.ManagerWhereUniqueInput, data: Prisma.ManagerUpdateInput) {
        return await prismaService.manager.update({ data, where });
    }

    static async getManagers(payload: Prisma.ManagerFindManyArgs) {
        return await prismaService.manager.findMany(payload);
    }

    static async deleteManager(where: Prisma.ManagerWhereUniqueInput) {
        return await prismaService.manager.delete({ where });
    }
}

export { ManagerService };