import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class AppointmentService {
    static async createAppointment(data: Prisma.AppointmentCreateInput) {
        return await prismaService.appointment.create({ data });
    }

    static async updateAppointment(where: Prisma.AppointmentWhereUniqueInput, data: Prisma.AppointmentUpdateInput) {
        return await prismaService.appointment.update({ data, where });
    }

    static async getAppointment(where: Prisma.AppointmentWhereUniqueInput) {
         return await prismaService.appointment.findUnique({ where });
    }

    static async getAppointments(payload: Prisma.AppointmentFindManyArgs) {
        return await prismaService.appointment.findMany(payload);
    }

    static async deleteAppointment(where: Prisma.AppointmentWhereUniqueInput) {
        return await prismaService.appointment.delete({ where });
    }
}

export { AppointmentService };