import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type WorldCity = {
  name: string;
  country: string;
  subCountry: string;
  geoNameId: number;
};

const readCsvFile = () => {
    // @ts-ignore
    const csvFilePath = path.resolve(__dirname, '../../src/file/restaurantes.csv');
  
    const headers = ['name', 'country', 'subCountry', 'geoNameId'];
    
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    parse(fileContent, {
      delimiter: ',',
      columns: true,
    }, (error, result: WorldCity[]) => {
      if (error) {
        console.error(error);
      }
      console.log("Result", result);
    });
}

readCsvFile()