import { Gender, MedicineBranch } from "@prisma/client"

type DoctorCreatePayload = {
    profilePicture?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    middleName: string
    gender: Gender
    branch: MedicineBranch
    scheduleId: number
    clinicId: number
}

type DoctorUpdatePayload = {
    profilePicture?: string | null
    email: string | undefined
    password: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    middleName: string | undefined
    gender: Gender | undefined
    branch: MedicineBranch | undefined
    scheduleId: number | undefined
    clinicId: number | undefined
}

export { DoctorCreatePayload, DoctorUpdatePayload };