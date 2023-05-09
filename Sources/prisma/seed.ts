import {PrismaClient, Gender, MedicineBranch } from "@prisma/client";
import { schedules } from "./seed/schedules";
import { clinicsPayload } from "./seed/clinics";
import { makeCSVDoctors } from "./seed/doctors";
import { makeCSVManagers } from "./seed/managers";
import { makeCSVPatients } from "./seed/patients";
import { generatePassword, validatePassword } from "./seed/utils/PasswordUtils";
import { assert } from "console";
import { medicineBranchFromRawValue } from "./seed/utils/MedicineBranch+rawValue";

const DEFAULT_AVATAR_FEMALE = "default_female_avatar.jpeg"
const DEFAULT_AVATAR_MALE = "default_male_avatar.jpeg"

const prisma = new PrismaClient();

async function eraseDatabase() {
    await prisma.$transaction([
        prisma.patient.deleteMany(),
        prisma.manager.deleteMany(),
        prisma.appointment.deleteMany(),
        prisma.doctor.deleteMany(),
        prisma.clinic.deleteMany(),
        prisma.schedule.deleteMany(),
    ]);
}

async function main() {
    console.log(`Start seeding ...`);
    await eraseDatabase();

    const schedulesCount = (await prisma.schedule.createMany({data: schedules})).count;
    console.log(`Schedules created, count: [${schedulesCount}]`);

    const clinicsCount = (await prisma.clinic.createMany({ data: clinicsPayload })).count;
    console.log(`Clinics created, count: [${clinicsCount}]`);

    const medicineBranchesCount = Object.entries(MedicineBranch).length;

    const password = generatePassword();    
    console.log(`Password for users: ${password}`);

    const allSchedules = await prisma.schedule.findMany();
    const allClinics = await prisma.clinic.findMany();

    assert(validatePassword(password), "Invalid password");

    console.log(allSchedules);
    console.log(allClinics);

    const doctorsPayload = await makeCSVDoctors();

    doctorsPayload.forEach(async (payload, index) => {
        const { email, firstName, lastName, middleName, gender } = payload;
        const profilePicture = gender === Gender.FEMALE ? DEFAULT_AVATAR_FEMALE : DEFAULT_AVATAR_MALE;
        const clinicGroupNumber = (index + 1) % clinicsCount;
        const scheduleGroupNumber = (index + 1) % schedulesCount;
        const medicineBranch = medicineBranchFromRawValue(index % medicineBranchesCount);

        const scheduleId = allSchedules[scheduleGroupNumber].id;
        const clinicId = allClinics[clinicGroupNumber].id

        let result = await prisma.doctor.create({
            data: {
                profilePicture: profilePicture,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                gender: gender,
                branch: medicineBranch,
                schedule: {
                    connect: {
                        id: scheduleId
                    }
                },
                clinic: {
                    connect: {
                        id: clinicId
                    }
                }
            }
        });

        console.log(result);
    });

    const patientsPayload = await makeCSVPatients();

    patientsPayload.forEach(async (payload) => {
        const { email, passportId, firstName, lastName, middleName, phoneNumber, age, gender } = payload;

        const result = await prisma.patient.create({
            data: {
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                passportId: passportId,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                gender: gender,
                age: age,
            }
        });

        console.log(result);
    }); 

    const managersPayload = await makeCSVManagers();

    managersPayload.forEach(async (payload, index) => {
        const { email, passportId, firstName, lastName, middleName } = payload;

        const clinicGroupNumber = (index + 1) % clinicsCount;
        const clinicId = allClinics[clinicGroupNumber].id

        const result = await prisma.manager.create({
            data: {
                email: email,
                password: password,
                passportId: passportId,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                clinic: {
                    connect: {
                        id: clinicId
                    }
                }
            }
        });

        console.log(result);
    });
}

main()
    .then( async () => {
        await prisma.$disconnect();
    })
    .catch( async (e) => {
        console.log("error");
        console.log(e);
        await prisma.$disconnect();
        process.exit;
    });