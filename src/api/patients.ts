import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { PatientService } from "../services/orm/patientService";
import { ResponseUtils } from "../utils/ResponseUtils";

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

    const patients = await PatientService.getPatients({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(patients);

    res.json(response);
});

patientsRouter.post('/create', (req, res) => {
    
});

patientsRouter.put('/update', (req, res) => {

});

patientsRouter.delete('/delete', () => {

});

export { patientsRouter };