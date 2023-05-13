import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class PatientService {
    static async createPatient(data: Prisma.PatientCreateInput) {
        return await prismaService.patient.create({ data });
    }

    static async updatePatient(where: Prisma.PatientWhereUniqueInput, data: Prisma.PatientUpdateInput) {
        return await prismaService.patient.update({ data, where });
    }

    static async getPatient(where: Prisma.PatientWhereUniqueInput) {
         return await prismaService.patient.findUnique({ where });
    }

    static async getPatients(payload: Prisma.PatientFindManyArgs) {
        return await prismaService.patient.findMany(payload);
    }

    static async deletePatient(where: Prisma.PatientWhereUniqueInput) {
        return await prismaService.patient.delete({ where });
    }
}

export { PatientService };