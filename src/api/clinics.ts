import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { ClinicService } from "../services/orm/clinicService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { ClinicCreatePayload } from "./types/clinicPayload";

const clinicsRouter = Router();

clinicsRouter.get('/findOne/:clinicId', async (req: Request, res) => {
    const clinicId = Number(req.params.clinicId);
    const clinic = await ClinicService.getClinic({ 
        id: clinicId
    });

    const response = ResponseUtils.success(clinic);
    res.json(response);
});

clinicsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const clinics = await ClinicService.getClinics({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(clinics);
    res.json(response);
});

clinicsRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as ClinicCreatePayload;
    const clinic = await ClinicService.createClinic(payload);

    const response = ResponseUtils.success(clinic);
    res.json(response);
});

clinicsRouter.post('/update/:clinicId', async (req, res) => {
    const clinicId = Number(req.params.clinicId);
    const payload = req.body.clinic as Prisma.ClinicUpdateInput;
    const clinic = await ClinicService.updateClinic({
            id: clinicId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(clinic);

    res.json(response);
});

clinicsRouter.delete('/delete/:clinicId', async (req: Request, res) => {
    const clinicId = Number(req.params.patientId);
    const clinic = await ClinicService.deleteClinic({
        id: clinicId
    });

    const response = ResponseUtils.success(clinic);
    res.json(response);
});

export { clinicsRouter };