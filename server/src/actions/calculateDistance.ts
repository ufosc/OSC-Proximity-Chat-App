import { Location } from "../types/Location";

const degToRad = Math.PI / 180.0;
const radians = (degrees: number) => degrees * degToRad;

// Radius of Earth in meters
const radiusOfEarth = 6371000;

// Radius squared of Earth in square meters
const radiusOfEarthSqr = radiusOfEarth * radiusOfEarth;

export const isWithinRadiusMeters = (p1: Location, p2: Location, r: number): boolean => {
    // The equirectangular approximation becomes significantly inaccurate at distances about about 1.5 km 
    if (r > 1500.0) {
        return haversineDistanceCheck(p1, p2, r);
    } else {
        return equirectangularDistanceCheck(p1, p2, r);
    }
}

const getEquirectangularDistanceSqr = (p1: Location, p2: Location) => {
    // Calculate the difference in longitude, adjusting for the 180 deg wraparound
    var dLon = p2.lon - p1.lon;
    if (dLon > 180.0) dLon -= 360.0;
    if (dLon < -180.0) dLon += 360.0;

    const dx = radians(dLon) * Math.cos(radians(p2.lat + p1.lat) / 2.0);
    const dy = radians(p2.lat - p1.lat);

    return radiusOfEarthSqr * (dx * dx + dy * dy);
}

// An approximate distance check which maps spherical points onto a flat surface to quickly estimate distance
const equirectangularDistanceCheck = (p1: Location, p2: Location, r: number): boolean => {
    const rSqr = r * r;
    const distSqr = getEquirectangularDistanceSqr(p1, p2);

    return distSqr <= rSqr;
}

// A more accurate distance check for points on the surface of a sphere
const haversineDistanceCheck = (p1: Location, p2: Location, r: number): boolean => {
    const lat1 = radians(p1.lat);
    const lon1 = radians(p1.lon);
    const lat2 = radians(p2.lat);
    const lon2 = radians(p2.lon);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.pow(Math.sin(dLat / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2.0), 2);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return c * radiusOfEarth <= r;
}