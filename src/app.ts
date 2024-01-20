import express, {Application } from 'express';
import cors from 'cors';
import { configServices } from './Config/services';
import { router } from './Routes';
import morgan from 'morgan';
// Piscina para la conexion con la BDD
import { pool } from './db/connection';

const port = configServices.PORT;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Importamos el router dinamico
app.use(router);
app.listen(port, async () => {
  console.log(`Server is Running on Port:${port}`);
  await pool.query('SELECT NOW()');
});