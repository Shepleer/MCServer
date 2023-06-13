import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Patient } from "@prisma/client";
import { Request } from "../jwtMiddleware";
import { PatientService } from "../services/orm/patientService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { UserKind } from "../models/AuthPayload";
import { PatientCreatePayload, PatientUpdatePayload } from "./types/patientPayload";
import { validatePassword } from "../utils/PasswordUtils";
import { ApiErrorType } from "../utils/ResponseUtils";

const patientsRouter = Router();

patientsRouter.get('/findOne/:patientId', async (req: Request, res) => {
    const patientId = Number(req.params.patientId);
    const patient = await PatientService.getPatient({ 
        id: patientId
    });

    const response = ResponseUtils.success(patient);
    res.json(response);
});

patientsRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    let patients: Patient[] = [];

    switch (req.auth?.kind) {
        case UserKind.DOCTOR:
            patients = await PatientService.getPatients({
                take: count,
                skip: offset,
                where: {
                    appointments: {
                        some: {
                            doctorId: req.auth?.id
                        }
                    }
                }
            });
            break;
        case UserKind.MANAGER:
            patients = await PatientService.getPatients({
                take: count,
                skip: offset,
            });
            break;
        default:
            break;
    }

    const response = ResponseUtils.success(patients);

    res.json(response);
});

patientsRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as PatientCreatePayload;

    if (validatePassword(payload.password)) {
        const response = ResponseUtils.error("Invalid password", ApiErrorType.ApiError);
        res.json(response);
        return;
    }

    const patient = await PatientService.createPatient(payload);
    const response = ResponseUtils.success(patient);

    res.json(response);
});

patientsRouter.post('/update/:patientId', async (req: Request, res) => {
    const patientId = Number(req.params.patientId);
    const payload = req.body.patient as PatientUpdatePayload;

    if (payload.password && validatePassword(payload.password)) {
        const response = ResponseUtils.error("Invalid password", ApiErrorType.ApiError);
        res.json(response);
        return;
    }

    const patient = await PatientService.updatePatient({
            id: patientId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(patient);

    res.json(response);
});

patientsRouter.delete('/delete/:patientId', async (req: Request, res) => {
    const patientId = Number(req.params.patientId);
    const patient = await PatientService.deletePatient({
        id: patientId
    });

    const response = ResponseUtils.success(patient);
    res.json(response);
});

export { patientsRouter };