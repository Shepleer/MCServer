import express from "express";
import Jwt from "jsonwebtoken";
import { ResponseUtils } from "./utils/ResponseUtils";
import { IncomingHttpHeaders } from "http";
import { JwtSecurity } from "./utils/Security";
import { AuthPayload } from "./models/AuthPayload";

enum AuthError {
    InvalidToken = 'InvalidToken',
    TokenExpired = 'TokenExpired'
};

export type Request =
  express.Request & { auth?: AuthPayload };

export function jwtMiddleware() {
    const middleware = async (req: Request, res: express.Response, next: express.NextFunction) => {
        try {
            const token = parseToken(req.headers);
            try {
                const payload = await JwtSecurity.verifyAccessToken(token) as AuthPayload;
                req.auth = payload;
                return next();
            } catch (err) {
                if (err instanceof Jwt.TokenExpiredError) {
                    const error = ResponseUtils.error("Token expired", AuthError.TokenExpired);
                    res.status(401).json(error);
                    return;
                }
                const error = ResponseUtils.error("Invalid token", AuthError.InvalidToken);
                res.status(401).json(error);
                return
            }
        } catch (err) {
            const error = ResponseUtils.error((err as Error).message, AuthError.InvalidToken);
            res.status(401).json(error);
            return;
        }
    }

    return middleware;
}

function parseToken(headers?: IncomingHttpHeaders): string {
    if (!headers) {
        throw new Error("Headers is missing");
    }

    const authorizationHeader = headers && 'Authorization' in headers ? 'Authorization' : 'authorization';
    const authPayload = headers[authorizationHeader] as string | undefined;

    if (!(authPayload)) {
        throw new Error("Credentials bad format");
    }

    const parts = authPayload.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
    } else {
        throw new Error("Credentials bad format");
    }
}