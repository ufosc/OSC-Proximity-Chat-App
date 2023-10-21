
//Calculates latitude/longitude for who will appear in your messages
export const calculateBroadCoordinates = (latitude: number, longitude: number) => {
    let radiusEarth = 6371000
    let metersPerDegree = 180/(1000 * Math.PI * radiusEarth)
    let radius = 200
    let coords = [[],[]]

    //coords[0] is south/west bound, coords[1] is north/east bound
    coords[0][0] = latitude - (radius * metersPerDegree)
    coords[0][1] = longitude - (radius * metersPerDegree)/Math.cos(latitude * Math.PI/180)
    
    coords[1][0] = latitude + (radius * metersPerDegree)
    coords[1][1] = longitude + (radius * metersPerDegree)/Math.cos(latitude * Math.PI/180)

    return coords
}