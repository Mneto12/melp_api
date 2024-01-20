/**
 * @author Miguel Coronel
 * @date 01-19-2024
 */
import { Request, Response, query } from "express";
// import service from "../Services/GithubApiService";
import { pool } from "../db/connection";

/**
   * Método para obtener todos los commits
*/
const getAll = async (req: Request, res: Response) => {
   try {
    const result = await pool.query('SELECT * FROM restaurants');
    await pool.end()
    return res.status(200).json({data: result})
   } catch (error) {
    
   }
}

export default module.exports = { 
    getAll,
    // getById,
    // create,
    // update,
    // delete
}
