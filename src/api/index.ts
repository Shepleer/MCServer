import express, { Express, Router } from "express";
import { patientsRouter } from "./patients";
import { uploadImageRouter } from "./imageUpload";

const apiRouter = Router();

apiRouter.use('/patients', patientsRouter);

export { apiRouter };