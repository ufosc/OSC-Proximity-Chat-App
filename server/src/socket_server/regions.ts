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
        return b.key === a.key;
    },
    function compareKeys(a: { key: string; }, b: { key: any; }) {
        return b.key.localeCompare(a.key);
    }
);

export const initRegions = () => {
    regions.clear();
}

export const setActiveUserRegion = (activeUser: ActiveUser, oldLocation: Location | undefined, newLocation: Location): void => {
    if (oldLocation !== undefined) {
        // Remove user from previous geohash
        delete regions.get({ key: oldLocation.geohash, value: undefined }).value[activeUser.uid];
    }
    if (!regions.has({ key: newLocation.geohash, value: undefined })) {
        regions.push({ key: newLocation.geohash, value: {} })
    }
    regions.get({ key: newLocation.geohash, value: undefined }).value[activeUser.uid] = activeUser;
};

export const removeActiveUser = (activeUser: ActiveUser): void => {
    if (activeUser.location.geohash == "") return; // User never sent an updateLocation message so they are not in the regions map
    //if (!regions.has({ key: activeUser.location.geohash, value: undefined })) return;
    delete regions.get({ key: activeUser.location.geohash, value: undefined }).value[activeUser.uid];
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
        const rightBoundGeohash = geohashRange[1];

        // Find bottom bound for geohashes that are actual in the map
        var node = regions.findLeastGreaterThanOrEqual({ key: leftBoundGeohash, value: undefined });
        if (node === undefined) continue;

        var index = node.index;
        var geohash = node.value.key;

        if (geohash > rightBoundGeohash) continue;

        regions.splayIndex(index);
        while (geohash <= rightBoundGeohash) {
            const activeUsers = Object.values<any>(regions.root.value.value);
            for (const activeUser of activeUsers) {
                // Run distance check to ensure users are actually in view, since geofire output is liberal
                if (isWithinRadiusMeters(location, activeUser.location, viewDistanceMeters)) {
                    yield activeUser;
                }
            }

            if (index + 1 >= regions.length) break;
            regions.splayIndex(++index);
            geohash = regions.root.value.key;
        }
    }
}