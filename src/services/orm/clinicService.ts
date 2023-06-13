import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class ClinicService {
    static async createClinic(data: Prisma.ClinicCreateInput) {
        return await prismaService.clinic.create({ data });
    }

    static async updateClinic(where: Prisma.ClinicWhereUniqueInput, data: Prisma.ClinicUpdateInput) {
        return await prismaService.clinic.update({ data, where });
    }

    static async getClinic(where: Prisma.ClinicWhereUniqueInput) {
         return await prismaService.clinic.findUnique({ where });
    }

    static async getClinics(payload: Prisma.ClinicFindManyArgs) {
        return await prismaService.clinic.findMany(payload);
    }

    static async deleteClinic(where: Prisma.ClinicWhereUniqueInput) {
        return await prismaService.clinic.delete({ where });
    }
}

export { ClinicService };