import * as geofire from "geofire-common";

import { ActiveUser, Location } from "../types";
import { isWithinRadiusMeters } from "./distance_check";

var SortedSet = require("collections/sorted-set");

// View distance in meters
export const viewDistanceMeters = 100;

// All active users are sorted into this regions map based on their geohash.
// SortedMap<string, { [uid: string]: ActiveUser }>
var regions = new SortedSet(
    null,
    function keysEqual(a: { key: any; }, b: { key: any; }) {
        return a.key === b.key;
    },
    function compareKeys(a: { key: string; }, b: { key: any; }) {
        return a.key.localeCompare(b.key);
    }
);

export const initRegions = () => {
    regions.clear();
}

export const setActiveUserRegion = (activeUser: ActiveUser, oldLocation: Location | undefined, newLocation: Location): void => {
    if (oldLocation !== undefined) {
        // Remove user from previous geohash
        delete regions[oldLocation.geohash][activeUser.uid];
    }
    regions[newLocation.geohash][activeUser.uid] = activeUser;
};

export const removeActiveUser = (activeUser: ActiveUser): void => {
    delete regions[activeUser.location.geohash][activeUser.uid];
}

export const getActiveUsersInView = function* (location: Location): Generator<ActiveUser, any, any> {
    // Geofire returns all geohashes overlapping the view circle.
    const geohashRanges = geofire.geohashQueryBounds(
        [location.lat, location.lon],
        viewDistanceMeters,
    );

    // For each geohash range, yield all active users contained in the regions
    for (var geohashRange of geohashRanges) {
        const leftBoundGeohash = geohashRange[0];
        const rightBoundGeohash = geohashRange[0];

        // Find bottom bound for geohashes that are actual in the map
        var geohash = regions.findLeastGreaterThanOrEqual({key: leftBoundGeohash, value: undefined});
        var index = regions.indexOf(geohash);

        while (geohash <= rightBoundGeohash) {
            const activeUsers = regions[index].value;
            for (const activeUser of activeUsers) {
                // Run distance check to ensure users are actually in view, since geofire output is liberal
                if (isWithinRadiusMeters(location, activeUser.location, viewDistanceMeters)) {
                    yield activeUser;
                }
            }

            if (index + 1 >= regions.length) break;
            geohash = regions[++index];
        }
    }
}