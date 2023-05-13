import express, { Router } from "express";
import path from "path";
import { uploadImageRouter } from "./api/imageUpload";
import { apiRouter } from "./api";
import { authRouter } from "./api/auth";
import { jwtMiddleware } from "./jwtMiddleware";

const mainRouter = Router();
const secureRouter = Router();

const publicPath = path.resolve('public');

mainRouter.use('/static', express.static(publicPath));
mainRouter.use(authRouter);
mainRouter.use(secureRouter);

secureRouter.use(jwtMiddleware());
secureRouter.use('/upload', uploadImageRouter);
secureRouter.use('/api', apiRouter);

export { mainRouter };