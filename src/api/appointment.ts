import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { AppointmentService } from "../services/orm/appointmentService";
import { ResponseUtils } from "../utils/ResponseUtils";

const appointmentsRouter = Router();

appointmentsRouter.get('/findOne/:appointmentId', async (req: Request, res) => {
    const appointmentId = Number(req.params.appointmentId);
    const appointment = await AppointmentService.getAppointment({ 
        id: appointmentId
    });

    const response = ResponseUtils.success(appointment);
    res.json(response);
});

appointmentsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const appointments = await AppointmentService.getAppointments({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(appointments);
    res.json(response);
});

appointmentsRouter.post('/create', async (req, res) => {
    const payload = req.body.appointment as Prisma.AppointmentCreateInput;
    const appointment = await AppointmentService.createAppointment(payload);

    const response = ResponseUtils.success(appointment);
    res.json(response);
});

appointmentsRouter.post('/update/:appointmentId', async (req, res) => {
    const appointmentId = Number(req.params.appointmentId);
    const payload = req.body.appointment as Prisma.AppointmentUpdateInput;
    const appointment = await AppointmentService.updateAppointment({
            id: appointmentId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(appointment);

    res.json(response);
});

appointmentsRouter.delete('/delete/:appointmentId', async (req: Request, res) => {
    const appointmentId = Number(req.params.appointmentId);
    const appointment = await AppointmentService.deleteAppointment({
        id: appointmentId
    });

    const response = ResponseUtils.success(appointment);
    res.json(response);
});

export { appointmentsRouter };