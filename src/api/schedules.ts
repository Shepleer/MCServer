import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { ScheduleService } from "../services/orm/scheduleService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { ScheduleCreatePayload } from "./types/schedulePayload";

const schedulesRouter = Router();

schedulesRouter.get('/findOne/:scheduleId', async (req: Request, res) => {
    const scheduleId = Number(req.params.scheduleId);
    const schedule = await ScheduleService.getSchedule({ 
        id: scheduleId
    });

    const response = ResponseUtils.success(schedule);
    res.json(response);
});

schedulesRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const schedules = await ScheduleService.getSchedules({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(schedules);
    res.json(response);
});

schedulesRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as ScheduleCreatePayload;
    const schedule = await ScheduleService.createSchedule(payload);

    const response = ResponseUtils.success(schedule);
    res.json(response);
});

schedulesRouter.post('/update/:scheduleId', async (req, res) => {
    const scheduleId = Number(req.params.scheduleId);
    const payload = req.body.schedule as Prisma.ScheduleUpdateInput;
    const schedule = await ScheduleService.updateSchedule({
            id: scheduleId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(schedule);

    res.json(response);
});

schedulesRouter.delete('/delete/:scheduleId', async (req: Request, res) => {
    const scheduleId = Number(req.params.patientId);
    const schedule = await ScheduleService.deleteSchedule({
        id: scheduleId
    });

    const response = ResponseUtils.success(schedule);
    res.json(response);
});

export { schedulesRouter };