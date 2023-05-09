import path from "path";
import { CSVReader, CSVPropertyDecoder, Decodable } from "./utils/CSVReader";
import { Gender } from "@prisma/client";

const filePath = path.resolve(__dirname, "csv_data", "data_patients.csv");

type CSVPatient = {
    email: string
    phoneNumber: string
    passportId: string
    firstName: string
    lastName: string
    middleName: string
    age: number
    gender: Gender
};

class PatientDecoder implements Decodable<CSVPatient> {
    decode(decoder: CSVPropertyDecoder): CSVPatient {
        return {
            email: decoder.getValue<string>("email"),
            phoneNumber: decoder.getValue<string>("phoneNumber"),
            passportId: decoder.getValue<string>("passportId"),
            firstName: decoder.getValue<string>("firstName"),
            lastName: decoder.getValue<string>("lastName"),
            middleName: decoder.getValue<string>("middleName"),
            age: Number(decoder.getValue<number>("age")),
            gender: decoder.getValue<Gender>("gender")
        };
    }
}

async function makeCSVPatients() {
    const reader = new CSVReader();

    let result = await reader.read<CSVPatient, PatientDecoder>(
        {
            filePath: filePath, 
            type: new PatientDecoder() 
        }
    );

    return result;
}

export { makeCSVPatients };