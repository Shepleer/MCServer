import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class ScheduleService {
    static async createSchedule(data: Prisma.ScheduleCreateInput) {
        return await prismaService.schedule.create({ data });
    }

    static async updateSchedule(where: Prisma.ScheduleWhereUniqueInput, data: Prisma.ScheduleUpdateInput) {
        return await prismaService.schedule.update({ data, where });
    }

    static async getSchedule(where: Prisma.ScheduleWhereUniqueInput) {
         return await prismaService.schedule.findUnique({ where });
    }

    static async getSchedules(payload: Prisma.ScheduleFindManyArgs) {
        return await prismaService.schedule.findMany(payload);
    }

    static async deleteSchedule(where: Prisma.ScheduleWhereUniqueInput) {
        return await prismaService.schedule.delete({ where });
    }
}

export { ScheduleService };