import fs from 'fs';
import path from 'path';
import Jwt from 'jsonwebtoken';

const ACCESS_PRIVATE_KEY_SECRET_PATH = path.resolve('secrets/access.key');
const REFRESH_PRIVATE_KEY_SECRET_PATH = path.resolve('secrets/refresh.key');
const ACCESS_PUBLIC_KEY_SECRET_PATH = path.resolve('secrets/access.public.key');
const REFRESH_PUBLIC_KEY_SECRET_PATH = path.resolve('secrets/refresh.public.key');

class JwtSecurity {
    static async generateTokens(payload: Object) {
        const result = await Promise.all([this.generateAccessToken(payload), this.generateRefreshToken(payload)]);
        return {
            accessToken: result[0],
            refreshToken: result[1]
        };
    }

    static async generateAccessToken(payload: Object) {
        const data = fs.readFileSync(ACCESS_PRIVATE_KEY_SECRET_PATH);
        return Jwt.sign(payload, data, { algorithm: 'RS256' });
    }

    static async generateRefreshToken(payload: Object) {
        const data = fs.readFileSync(REFRESH_PRIVATE_KEY_SECRET_PATH);
        return Jwt.sign(payload, data, { algorithm: 'RS256' });
    }

    static async verifyAccessToken(token: string) {
        const data = fs.readFileSync(ACCESS_PUBLIC_KEY_SECRET_PATH);
        return Jwt.verify(token, data, { algorithms: ['RS256'] });
    }

    static async verifyRefreshToken(token: string) {
        const data = fs.readFileSync(REFRESH_PUBLIC_KEY_SECRET_PATH);
        return Jwt.verify(token, data, { algorithms: ['RS256'] });
    }
}

export { JwtSecurity };