import express, { Express, Router } from "express";
import { patientsRouter } from "./patients";
import { doctorsRouter } from "./doctors";
import { managersRouter } from "./managers";
import { appointmentsRouter } from "./appointment";
import { schedulesRouter } from "./schedules";
import { reportsRouter } from "./reports";
import { clinicsRouter } from "./clinics";

const apiRouter = Router();

apiRouter.use('/patients', patientsRouter);
apiRouter.use('/doctors', doctorsRouter);
apiRouter.use('/managers', managersRouter);
apiRouter.use('/appointments', appointmentsRouter);
apiRouter.use('/reports', reportsRouter);
apiRouter.use('/schedules', schedulesRouter);
apiRouter.use('/clinics', clinicsRouter);


export { apiRouter };