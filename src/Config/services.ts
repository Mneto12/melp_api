// Credenciales para los servicios externos Apis, Bases de datos.
import dotenv from 'dotenv';
dotenv.config();
export const configServices = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
}