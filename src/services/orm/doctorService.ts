import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class DoctorService {
    static async createDoctor(data: Prisma.DoctorCreateInput) {
        return await prismaService.doctor.create({ data });
    }

    static async updateDoctor(where: Prisma.DoctorWhereUniqueInput, data: Prisma.DoctorUpdateInput) {
        return await prismaService.doctor.update({ data, where });
    }

    static async getDoctor(where: Prisma.DoctorWhereUniqueInput) {
         return await prismaService.doctor.findUnique({ where });
    }

    static async getDoctors(payload: Prisma.DoctorFindManyArgs) {
        return await prismaService.doctor.findMany(payload);
    }

    static async deleteDoctor(where: Prisma.DoctorWhereUniqueInput) {
        return await prismaService.doctor.delete({ where });
    }
}

export { DoctorService };