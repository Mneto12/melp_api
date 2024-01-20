/**
 * @author Miguel Coronel
 * @date 01-20-2024
 */
import repository from '../Repositories/RestaurantsRepository'
import { searchInsideRadius } from '../Utils/searchInsideRadius';

/**
   * Método para obtener todos los restaurantes
   * @returns {Promise<any>}
*/
const getAll = async (page: string | undefined): Promise<any> => {
    const restaurants = await repository.getAll('*')

    // Si no pasan un parametro para la paginacion
    let pageFormated = !page ? 1 : parseInt(page);

    /**
     * Numero total de paginas
     * Si la pagina no existe se coloca la ultima. Si no hay parametro, se coloca la primera.
    */ 
    const pageCount = Math.ceil(restaurants.rows.length / 10);
    if (!pageFormated) { pageFormated = 1}
    if (pageFormated > pageCount) {
        pageFormated = pageCount
    }
    
    return {
        restaurants: restaurants.rows.slice((pageFormated - 1) * 10, pageFormated * 10),
        currentPage: pageFormated,
        pageCount: pageCount,
    }
}

/**
   * Método para obtener un restaurante por su id
   * @returns {Promise<any>}
*/
const getById = async (id: string): Promise<any> => {
    const restaurant = await repository.getById(id)
    return restaurant.rows[0]
}

/**
   * Método para crear un restaurante
   * @returns {Promise<any>}
*/
const create = async (restaurant: any): Promise<any> => {
    const restaurantCreated = await repository.create(restaurant)
    return restaurantCreated.rows[0]
}

/**
   * Método para actualizar un restaurante por su id
   * @returns {Promise<any>}
*/
const update = async (restaurant: any, id: string): Promise<any> => {
    const restaurantUpdated = await repository.update(restaurant, id)
    return restaurantUpdated.rows[0]
}

/**
   * Método para eliminar un restaurante por su id
   * @returns {Promise<any>}
*/
const deleteRest = async (id: string): Promise<void> => {
    await repository.deleteRest(id)
}

/**
   * Método para buscar los restaurantes dentro de un radio
   * @returns {Promise<any>}
*/
const searchByGeographic = async (lat: string, lng: string, radius: string): Promise<any> => {
    let latFormated = parseFloat(lat)
    let lngFormated = parseFloat(lng)
    let radiusFormated = parseInt(radius)

    const restaurants = await repository.getAll('id, lat, lng, rating')

    if (!restaurants) return []

    // Funcion que saca el radio y devuelv la cantidad de restaurantes y promedio
    return searchInsideRadius(restaurants, {latFormated, lngFormated, radiusFormated})
}

export default module.exports = { 
    getAll,
    getById,
    create,
    update,
    deleteRest,
    searchByGeographic
}