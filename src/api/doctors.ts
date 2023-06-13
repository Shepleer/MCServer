import { MedicineBranch, Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { DoctorService } from "../services/orm/doctorService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { DoctorCreatePayload } from "./types/doctorPayload";

const doctorsRouter = Router();

doctorsRouter.get('/findOne/:doctorId', async (req: Request, res) => {
    const doctorId = Number(req.params.doctorId);
    const doctor = await DoctorService.getDoctor({ 
        id: doctorId
    });

    const response = ResponseUtils.success(doctor);
    res.json(response);
});

doctorsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);
    const branch: MedicineBranch | undefined = req.query.branch as MedicineBranch;

    const doctors = await DoctorService.getDoctors({
        take: count,
        skip: offset,
        where: {
            branch
        }
    });

    const response = ResponseUtils.success(doctors);
    res.json(response);
});

doctorsRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as DoctorCreatePayload;

    const input: Prisma.DoctorCreateInput = {
        ...payload,
        schedule: {
            connect: {
                id: payload.scheduleId
            }
        },
        clinic: {
            connect: {
                id: payload.clinicId
            }
        }
    };

    const doctor = await DoctorService.createDoctor(input);

    const response = ResponseUtils.success(doctor);
    res.json(response);
});

doctorsRouter.post('/update/:doctorId', async (req, res) => {
    const doctorId = Number(req.params.doctorId);
    const payload = req.body.doctor as Prisma.DoctorUpdateInput;
    const doctor = await DoctorService.updateDoctor({
            id: doctorId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(doctor);

    res.json(response);
});

doctorsRouter.delete('/delete/:doctorId', async (req: Request, res) => {
    const doctorId = Number(req.params.patientId);
    const doctor = await DoctorService.deleteDoctor({
        id: doctorId
    });

    const response = ResponseUtils.success(doctor);
    res.json(response);
});

export { doctorsRouter };