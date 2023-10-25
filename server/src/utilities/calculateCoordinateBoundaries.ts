//Calculates latitude/longitude boundaries for who will appear in your messages
export const calculateCoordinateBoundaries = (latitude: number, longitude: number) => {

    //The radius of the earth, in meters. This isn't too important by itself but 
    //it's part of the meters to degree conversion.
    let radiusEarth = 6371000

    //This is a conversion formula between meters and degrees; helps us with locating positions on the globe given a relative distance.
    let metersPerDegree = 180/(1000 * Math.PI * radiusEarth)

    //The distance we want to set our boundaries at for coordinates.
    let radius = 200

    //coords[0] is south/west bound, coords[1] is north/east bound
    let coords = [[],[]]

    //For latitude, we multiply radius by the conversion in order to find the difference in latitude between 
    //user and south edge of their area, and then we subtract from user's latitude.
    coords[0][0] = latitude - (radius * metersPerDegree)
    //We do the same for the west edge but divide it by a scale factor so we account for longitude being -180 to 180 and not -90 to 90
    coords[0][1] = longitude - (radius * metersPerDegree)/Math.cos(latitude * Math.PI/180)

    //Same as above except we add the differences in lat/lon to find the north/east edges, respectively
    coords[1][0] = latitude + (radius * metersPerDegree)
    coords[1][1] = longitude + (radius * metersPerDegree)/Math.cos(latitude * Math.PI/180)

    return coords
}
