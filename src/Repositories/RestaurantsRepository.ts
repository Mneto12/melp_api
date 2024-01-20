/**
 * @author Miguel Coronel
 * @date 01-20-2024
 */
import { pool } from "../db/connection"
import { v4 as uuidv4 } from 'uuid';

const getAll = async (): Promise<any> => {
    try {
        pool.connect()
        const data = await pool.query('SELECT * FROM restaurants')
        return data
    } catch (e: any) {
        pool.end()
        console.error(e)
        throw new Error(e)
    }
}

const getById = async (id: string): Promise<any> => {
    try {
        pool.connect()
        const data = await pool.query(`SELECT * FROM restaurants WHERE id ='${id}'`)
        return data
    } catch (e: any) {
        pool.end()
        console.error(e)
        throw new Error(e)
    }
}

const create = async (data: any): Promise<any> => {
    const { name, rating, site, email, phone, street, city, state, lat, lng } = data
    const id = uuidv4()
    try {
        pool.connect()
        const operation = await pool.query(`
            INSERT INTO restaurants (
                id, name, rating, site, email, phone, street, city, state, lat, lng
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
            [id, name, rating, site, email, phone, street, city, state, lat, lng ]
        )
        return operation
    } catch (e: any) {
        pool.end()
        console.error(e)
        throw new Error(e)
    }
}

const update = async (data: any): Promise<any> => {
    const { name, rating, site, email, phone, street, city, state, lat, lng } = data
    const id = uuidv4()
    try {
        pool.connect()
        const operation = await pool.query(`
            INSERT INTO restaurants (
                id, name, rating, site, email, phone, street, city, state, lat, lng
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
            [id, name, rating, site, email, phone, street, city, state, lat, lng ]
        )
        return operation
    } catch (e: any) {
        pool.end()
        console.error(e)
        throw new Error(e)
    }
}

const deleteRest = async (id: string): Promise<void> => {
    try {
        pool.connect()
        await pool.query(`DELETE FROM restaurants WHERE 'id' ='${id}'`);
    } catch (e: any) {
        pool.end()
        console.error(e)
        throw new Error(e)
    }
}


export default module.exports = { 
    getAll,
    getById,
    create,
    update,
    deleteRest
}