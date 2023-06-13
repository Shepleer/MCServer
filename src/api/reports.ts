import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { ReportService } from "../services/orm/reportService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { ReportCreatePayload } from "./types/reportPayload";

const reportsRouter = Router();

reportsRouter.get('/findOne/:reportId', async (req: Request, res) => {
    const reportId = Number(req.params.reportId);
    const report = await ReportService.getReport({ 
        id: reportId
    });

    const response = ResponseUtils.success(report);
    res.json(response);
});

reportsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const reports = await ReportService.getReports({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(reports);
    res.json(response);
});

reportsRouter.post('/linkReport', async (req, res) => {
    const payload = req.body.patient as ReportCreatePayload;
    const date = new Date();

    const report = await ReportService.createReport({
        ...payload,
        date,
        appointment: {
            connect: {
                id: payload.appointmentId
            }
        }
    });

    const response = ResponseUtils.success(report);
    res.json(response);
});

reportsRouter.post('/update/:reportId', async (req, res) => {
    const reportId = Number(req.params.reportId);
    const payload = req.body.report as Prisma.ReportUpdateInput;
    const report = await ReportService.updateReport({
            id: reportId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(report);

    res.json(response);
});

reportsRouter.delete('/delete/:reportId', async (req: Request, res) => {
    const reportId = Number(req.params.patientId);
    const report = await ReportService.deleteReport({
        id: reportId
    });

    const response = ResponseUtils.success(report);
    res.json(response);
});

export { reportsRouter };