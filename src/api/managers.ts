import { Prisma } from "@prisma/client";
import express, { Express, Router } from "express";
import { Request } from "../jwtMiddleware";
import { ManagerService } from "../services/orm/managerService";
import { ResponseUtils } from "../utils/ResponseUtils";

const managersRouter = Router();

managersRouter.get('/findOne/:managerId', async (req: Request, res) => {
    const managerId = Number(req.params.managerId);
    const manager = await ManagerService.getManager({ 
        id: managerId
    });

    const response = ResponseUtils.success(manager);
    res.json(response);
});

managersRouter.get('/findMany', async (req: Request, res) => {
    const offset = Number(req.query.offset);
    const count = Number(req.query.count);

    const managers = await ManagerService.getManagers({
        take: count,
        skip: offset,
    });

    const response = ResponseUtils.success(managers);
    res.json(response);
});

managersRouter.post('/create', async (req, res) => {
    const payload = req.body.patient as Prisma.ManagerCreateInput;
    const manager = await ManagerService.createManager(payload);

    const response = ResponseUtils.success(manager);
    res.json(response);
});

managersRouter.post('/update/:managerId', async (req, res) => {
    const managerId = Number(req.params.managerId);
    const payload = req.body.patient as Prisma.ManagerUpdateInput;
    const manager = await ManagerService.updateManager({
            id: managerId
        },
        {
            ...payload,
        },
    );

    const response = ResponseUtils.success(manager);

    res.json(response);
});

managersRouter.delete('/delete/:managerId', async (req: Request, res) => {
    const managerId = Number(req.params.managerId);
    const manager = await ManagerService.deleteManager({
        id: managerId
    });

    const response = ResponseUtils.success(manager);
    res.json(response);
});

export { managersRouter };