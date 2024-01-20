import * as geolib from 'geolib';

export const searchInsideRadius = (restaurants: any, coords: any) => {
    const { latFormated, lngFormated, radiusFormated } = coords

    let restaurantsInsideTheRadius: any = []
    let AverageRatingsInsideTheRadius = 0
    let TotalRatingsInsideTheRadius = 0

    restaurants.rows.forEach((restaurant: any) => {
        // Si un restaurante tiene latitud o longitud
        if (restaurant.lat !== null || restaurant.lng !== null) {

            // GeoLib cuya funcion devuelve true si cumple con el radio y las coordenadas
            const result = geolib.isPointWithinRadius(
                { latitude: restaurant.lat, longitude: restaurant.lng },
                { latitude: latFormated, longitude: lngFormated },
                radiusFormated
            )

            // Si es true la agregamos a los restaurantes dentro del radio
            if (result) restaurantsInsideTheRadius.push(restaurant)
        }
    })

    // Obtenemos el total de los ratings
    restaurantsInsideTheRadius.forEach((restaurant:any) => {
        TotalRatingsInsideTheRadius += restaurant.rating
    })

        // Calculamos la media de los restaurantes dentro del radio
    AverageRatingsInsideTheRadius = TotalRatingsInsideTheRadius / restaurantsInsideTheRadius.length

    return {
        count: restaurantsInsideTheRadius.length,
        avg: AverageRatingsInsideTheRadius,
    }
}