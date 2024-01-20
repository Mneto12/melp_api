import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { pool } from "../db/connection";
import format from 'pg-format';

type Restaurants = {
  id: string;
  rating: number;
  name: string;
  site: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
};

const readCsvFileAndInsertData = () => {

    // ruta del archivo csv que se va a leer y insertar en la base de datos
    const csvFilePath = path.resolve(__dirname, '../../src/file/restaurantes.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // parsear el archivo csv y insertar los datos en la base de datos
    parse(fileContent, {
      delimiter: ',',
      columns: true,
      cast: (columnValue, context) => {
        switch(context.column) {
          case 'rating':
            return parseInt(columnValue, 10);
          case 'lat':
            return parseFloat(columnValue)
          case 'lng':
            return parseFloat(columnValue);
          default:
            return columnValue;
        }
      }
    }, async (error, result: Restaurants[]) => {
      if (error) {
        console.error(error);
      }

      // formato de los datos a uno valido
      let formatResult = result.map(restaurant => {
        return [restaurant.id, restaurant.rating, restaurant.name, restaurant.site, restaurant.email, restaurant.phone, restaurant.street, restaurant.city, restaurant.state, restaurant.lat, restaurant.lng]
      })

      // TODO: Refactor table and add more rules
      await pool.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id TEXT PRIMARY KEY,
        rating INTEGER,
        name varchar,
        site varchar,
        email varchar,
        phone varchar,
        street varchar,
        city varchar,
        state varchar,
        lat FLOAT,
        lng FLOAT)
      `)

      // Insercion masiva de datos
      await pool.query(format('INSERT INTO restaurants (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES %L', formatResult),[], (err, result)=>{
          console.log(err);
          console.log(result);
      })
    });
}

readCsvFileAndInsertData()