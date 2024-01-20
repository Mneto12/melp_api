import { Router } from "express";
import { readdirSync } from "fs";

/**
   * Enrutador dinamico dependiendo del nombre de archivo en Routes
   * users -> api/v1/ users
*/
const PATH_ROUTER = `${__dirname}`;
const router = Router();


/**
 * Obtenemos el archivo y eliminamos la extension .ts  
*/
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

/**
 * Si no es index, importamos el archivo e iniciamos un router 
*/
readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/api/v1/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };