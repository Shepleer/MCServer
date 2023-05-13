import { PathLike, createReadStream } from "fs";
import { createInterface } from "readline";

type ParseLine<R> = (line: number, model: R) => R;

interface Decodable<R> {
    decode(decoder: CSVPropertyDecoder): R
}

class CSVPropertyDecoder {
    private codingKeys: string[];
    private values: string[];

    constructor(codingKeys: string[], values: string[]) {
        this.codingKeys = codingKeys;
        this.values = values;
    }

    getValue<T>(key: string): T {
        const index = this.codingKeys.findIndex((value) => {
            if (value === key) {
                return true;
            }
            return false;
        });

        if (index != -1) {
            return this.values[index] as T;
        } else {
            throw new Error(`Invalid key has been reached decoder, key: ${key}`);
        }
    }
}

class CSVReader {
    separator: string;

    constructor(separator: string = ";") {
        this.separator = separator;
    }

    async read<R, T extends Decodable<R>>({ filePath, type }: { filePath: PathLike, type: T }): Promise<R[]> {
        return new Promise<R[]>( (resolve) => {
            const readStream = createReadStream(filePath);
            const rl = createInterface({ input: readStream });

            let lineIndex = 0;
            let keys: string[];

            let results: R[] = [];

            rl.on('line', (line) => {
                if (lineIndex === 0) {
                    lineIndex++;
                    keys = line.split(this.separator).map(value => value.trim());
                    return;
                }
                const items = line.split(";");
                const decoder = new CSVPropertyDecoder(keys, items);

                const result = type.decode(decoder);
                results.push(result);
                lineIndex++;
            });

            rl.on('close', () => {
                resolve(results);
            });
        });
    }
}

export { CSVReader, CSVPropertyDecoder, Decodable, ParseLine };