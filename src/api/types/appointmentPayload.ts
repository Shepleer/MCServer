import { AppointmentStatus, AppointmentType } from "@prisma/client"

type AppointmentCreatePayload = {
    type?: AppointmentType
    status?: AppointmentStatus
    date: Date | string
    endDate: Date | string
    doctorId: number
    patientId: number
    location?: number | null
}

type AppointmentUpdatePayload = {
    type?: AppointmentType
    status?: AppointmentStatus
    date?: Date | string
    endDate?: Date | string
    doctorId?: number
    patientId?: number
    location?: number | null
}

export { AppointmentCreatePayload, AppointmentUpdatePayload };