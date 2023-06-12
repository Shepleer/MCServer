import { JwtPayload } from "jsonwebtoken";

enum UserKind {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    MANAGER = 'MANAGER'
}

type AuthPayload = {
    id: number
    email: string
    kind: UserKind
} & JwtPayload;

export { UserKind, AuthPayload };