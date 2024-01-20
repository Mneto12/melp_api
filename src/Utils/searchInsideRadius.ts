import * as geolib from 'geolib';

export const searchInsideRadius = (restaurants: any, coords: any) => {
    const { latFormated, lngFormated, radiusFormated } = coords
    let restaurantsInsideTheRadius: any = []
    let AverageRatingsInsideTheRadius = 0
    let TotalRatingsInsideTheRadius = 0
    
    restaurants.rows.forEach((restaurant: any) => {
        const result = geolib.isPointWithinRadius(
            { latitude: restaurant.lat, longitude: restaurant.lng },
            { latitude: latFormated, longitude: lngFormated },
            radiusFormated
        )
        
        if (result) restaurantsInsideTheRadius.push(restaurant)
        return restaurantsInsideTheRadius
    })

    restaurantsInsideTheRadius.forEach((restaurant:any) => {
        TotalRatingsInsideTheRadius += restaurant.rating
    })

    AverageRatingsInsideTheRadius = TotalRatingsInsideTheRadius / restaurantsInsideTheRadius.length

    return {
        count: restaurantsInsideTheRadius.length,
        avg: AverageRatingsInsideTheRadius,
    }
}