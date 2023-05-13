import { Prisma, MedicineBranch, Gender } from "@prisma/client";
import path from "path";

import { CSVReader, CSVPropertyDecoder, Decodable, ParseLine } from './utils/CSVReader';

const filePath = path.resolve(__dirname, "csv_data", "data_doctors.csv");

type CSVDoctor = {
    email: string
    firstName: string
    lastName: string
    middleName: string
    gender: Gender
};

class DoctorDecoder implements Decodable<CSVDoctor> {
    decode(decoder: CSVPropertyDecoder): CSVDoctor {
        return {
            email: decoder.getValue<string>("email"),
            firstName: decoder.getValue<string>("firstName"),
            lastName: decoder.getValue<string>("lastName"),
            middleName: decoder.getValue<string>("middleName"),
            gender: decoder.getValue<Gender>("gender")
        };
    }
}

async function makeCSVDoctors() {
    const reader = new CSVReader();

    let result = await reader.read<CSVDoctor, DoctorDecoder>(
        {
            filePath: filePath, 
            type: new DoctorDecoder() 
        }
    );

    return result;
}

export { makeCSVDoctors };