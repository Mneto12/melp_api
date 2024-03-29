/**
 * @author Miguel Coronel
 * @date 01-19-2024
 */
import { Request, Response, query } from "express";
import service from "../Services/RestarurantsService";

const getAll = async ({ query }: Request, res: Response) => {
   const { page } = query;
   try {
        // @ts-ignore
        const result = await service.getAll(page);
        return res.status(200).json({
            restaurants: result.restaurants,
            page: result.currentPage,
            pageCount: result.pageCount,
        });
   } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
   }
}

const getById = async ({ params }: Request, res: Response) => {
    const { id } = params;
    try {
         const result = await service.getById(id);
         if (!result) return res.status(404).json({message: "Restaurant not found"})
         return res.status(200).json(result);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
    }
}

const create = async ({ body }: Request, res: Response) => {
    try {
        const result = await service.create(body);
        return res.status(200).json({
            restaurant: result,
            message: "Restaurant created successfully"
        });
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
    }
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req;
    try {
        const result = await service.update(body, id);
        return res.status(200).json({
            restaurant: result,
            message: "Restaurant updated successfully"
        });
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
    }
}

const deleteRest = async ({ params }: Request, res: Response) => {
    const { id } = params
    try {
        await service.deleteRest(id);
        return res.status(200).json({
            restaurantDeleted: true,
            message: "Restaurant delete successfully"
        });
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
    }
}

const stadistics = async ({ query }: Request, res: Response) => {
    const { lat, lng, radius } = query
    try {
        // @ts-ignore
        const result = await service.searchByGeographic(lat, lng, radius)
        return res.status(200).json({
            restaurants: result,
        })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({message: e.message})
        }
    }
}



export default module.exports = { 
    getAll,
    getById,
    create,
    update,
    deleteRest,
    stadistics
}
