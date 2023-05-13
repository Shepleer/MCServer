import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class DoctorService {
    static async getDoctor(where: Prisma.DoctorWhereUniqueInput) {
        return await prismaService.doctor.findUnique({ where });
    }
}

export { DoctorService };