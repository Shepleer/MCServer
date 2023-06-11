import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { DoctorService } from "../services/orm/doctorService";
import { ResponseUtils } from "../utils/ResponseUtils";

const doctorsRouter = Router();

doctorsRouter.get('/findOne/:doctorId', async (req: Request, res) => {
    const patientId = Number(req.params.patientId);
    const patient = await DoctorService.getDoctor({ 
        id: patientId
    });

    const response = ResponseUtils.success(patient);
    res.json(response);
});

doctorsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const doctors = await DoctorService.getDoctors({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(doctors);
    res.json(response);
});

doctorsRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as Prisma.DoctorCreateInput;
    const patient = await DoctorService.createDoctor(payload);

    const response = ResponseUtils.success(patient);
    res.json(response);
});

doctorsRouter.post('/update/:doctorId', async (req, res) => {
    const doctorId = Number(req.params.doctorId);
    const payload = req.body.patient as Prisma.DoctorUpdateInput;
    const patient = await DoctorService.updateDoctor({
            id: doctorId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(patient);

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