// Credenciales para los servicios externos Apis, Bases de datos.
import dotenv from 'dotenv';
dotenv.config();
export const configServices = {
    PORT: process.env.PORT,
    TOKEN_GITHUB_API: process.env.TOKEN_GITHUB_API,
}