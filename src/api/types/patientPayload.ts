import { Gender } from "@prisma/client"

type PatientCreatePayload = {
    profilePicture: string | null
    email: string
    password: string
    phoneNumber: string
    passportId: string
    firstName: string
    lastName: string
    middleName: string
    gender: Gender
    age: number
  }

  type PatientUpdatePayload = {
    profilePicture: string | null | undefined
    email: string | undefined
    password: string | undefined
    phoneNumber: string | undefined
    passportId: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    middleName: string | undefined
    gender: Gender | undefined
    age: number | undefined
  }
  
  export { PatientCreatePayload, PatientUpdatePayload };