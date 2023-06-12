import { Router } from "express";
import { DoctorService } from "../services/orm/doctorService";
import { ManagerService } from "../services/orm/managerService";
import { PatientService } from "../services/orm/patientService";
import { ResponseUtils } from "../utils/ResponseUtils";
import { comparePassword } from "../utils/PasswordUtils";
import { JwtSecurity } from "../utils/Security";
import { Doctor, Manager, Patient } from "@prisma/client";
import { UserKind } from "../models/AuthPayload";

enum AuthError {
    InvalidCredentials = 'InvalidCredentials'
}

const authRouter = Router();

authRouter.post('/auth', async (req, res) => {
    const kind: UserKind = req.body.kind;
    const email: string = req.body.email;
    const password: string =  req.body.password;

    const payload = { email };

    let user: Doctor | Patient | Manager | null;

    switch (kind) {
    case UserKind.DOCTOR:
        const doctor = await DoctorService.getDoctor(payload);
        console.log(doctor);
        user = doctor;
        break;
    case UserKind.MANAGER:
        const manager = await ManagerService.getManager(payload);
        user = manager;
        break;
    case UserKind.PATIENT:
        const patient = await PatientService.getPatient(payload);
        user = patient
        break;
    }

    if (!user) {
        const errorResponse = ResponseUtils.error("Invalid email", AuthError.InvalidCredentials);
        res.json(errorResponse);
        return;
    }

    if (!comparePassword(password, user.password)) {
        const errorResponse = ResponseUtils.error("Invalid password", AuthError.InvalidCredentials);
        res.json(errorResponse);
        return;
    }

    const credentials = await JwtSecurity.generateTokens({
        id: user.id,
        kind,
        email
    });

    const response = ResponseUtils.success(credentials);
    res.json(response);
});

export { authRouter };