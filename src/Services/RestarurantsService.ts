/**
 * @author Miguel Coronel
 * @date 01-20-2024
 */
import repository from '../Repositories/RestaurantsRepository'

/**
   * Método para obtener todos los restaurantes
   * @returns {Promise<any>}
*/
const getAll = async (page: string | undefined): Promise<any> => {
    const restaurants = await repository.getAll()

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

const getById = async (id: string): Promise<any> => {
    const restaurant = await repository.getById(id)
    return restaurant.rows[0]
}

const create = async (restaurant: any): Promise<any> => {
    const restaurantCreated = await repository.create(restaurant)
    return restaurantCreated.rows[0]
}

const update = async (restaurant: any): Promise<any> => {
    const restaurantCreated = await repository.update(restaurant)
    return restaurantCreated.rows[0]
}

const deleteRest = async (id: string): Promise<void> => {
    await repository.deleteRest(id)
}

export default module.exports = { 
    getAll,
    getById,
    create,
    update,
    deleteRest
}