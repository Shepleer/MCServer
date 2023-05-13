import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import * as process from "process";
import bodyParser from "body-parser";
import path from "path";
import { uploadImageRouter } from "./api/imageUpload";
import { apiRouter } from "./api";
import { mainRouter } from "./routing";

dotenv.config();

const app: Express = express();

const corsOptions: CorsOptions = {
    origin: process.env.ORIGIN?.split(','),
    credentials: true
};

const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(mainRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
