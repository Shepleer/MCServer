import { Prisma } from "@prisma/client";

const clinicsPayload: Prisma.ClinicCreateManyInput[] = [
    {
        name: "Clinic #1",
        latitude: 53.859167971777595,
        longitude: 27.495343818317075,
        phoneNumber: "+375 11 111-11-11"
    },
    {
        name: "Clinic #2",
        latitude: 53.911803160090535,
        longitude: 27.540032994114476,
        phoneNumber: "+365 12 333-13-13"
    },
    {
        name: "Clinic #3",
        latitude: 53.942091289561596,
        longitude: 27.62947205067212,
        phoneNumber: "+365 12 333-13-13"
    }
];

export { clinicsPayload };