import path from "path";
import { CSVReader, CSVPropertyDecoder, Decodable } from "./utils/CSVReader";


const filePath = path.resolve(__dirname, "csv_data", "data_managers.csv");

type CSVManager = {
    email: string
    passportId: string
    firstName: string
    lastName: string
    middleName: string
};

class ManagerDecoder implements Decodable<CSVManager> {
    decode(decoder: CSVPropertyDecoder): CSVManager {
        return {
            email: decoder.getValue<string>("email"),
            passportId: decoder.getValue<string>("passportId"),
            firstName: decoder.getValue<string>("firstName"),
            lastName: decoder.getValue<string>("lastName"),
            middleName: decoder.getValue<string>("middleName"),
        };
    }
}

async function makeCSVManagers() {
    const reader = new CSVReader();

    let result = await reader.read<CSVManager, ManagerDecoder>(
        {
            filePath: filePath, 
            type: new ManagerDecoder() 
        }
    );

    return result;
}

export { makeCSVManagers };