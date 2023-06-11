import { Prisma } from "@prisma/client";
import prismaService from "./prismaService";

class ReportService {
    static async createReport(data: Prisma.ReportCreateInput) {
        return await prismaService.report.create({ data });
    }

    static async updateReport(where: Prisma.ReportWhereUniqueInput, data: Prisma.ReportUpdateInput) {
        return await prismaService.report.update({ data, where });
    }

    static async getReport(where: Prisma.ReportWhereUniqueInput) {
         return await prismaService.report.findUnique({ where });
    }

    static async getReports(payload: Prisma.ReportFindManyArgs) {
        return await prismaService.report.findMany(payload);
    }

    static async deleteReport(where: Prisma.ReportWhereUniqueInput) {
        return await prismaService.report.delete({ where });
    }
}

export { ReportService };