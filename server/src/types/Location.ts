import * as geofire from "geofire-common";

interface ILocation {
    lat: number;
    lon: number;
    geohash: string;
}

export class Location {
    lat: number;
    lon: number;
    geohash: string;

    constructor(obj: ILocation)
    constructor(obj?: ILocation) {
        this.lat = obj?.lat ?? 0;
        this.lon = obj?.lon ?? 0;
        this.geohash = obj?.geohash ?? geofire.geohashForLocation([this.lat, this.lon]);
    }
}