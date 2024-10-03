import { distanceBetween, geohashForLocation, geohashQueryBounds } from 'geofire-common'
import { connectedUsersCollection } from '../utilities/firebaseInit'

export const getConnectedUser = async (socketID: string) => {
  const user = await connectedUsersCollection.doc(socketID).get();
  return user.data();
}

export const findNearbyUsers = async (
  centerLat: number, centerLon: number, radius: number
) => {
  // Return an array of nearby userIds (which are also socket ids) given a center
  // latitude and longitude. Latitude and longitude values use degrees with the
  // same bounds as GeoPoints. Radius values use meters. Credit to
  // https://firebase.google.com/docs/firestore/solutions/geoqueries for doing
  // the heavy lifting for us. Additionally, GeoPoints and storing a 'center'
  // array leads to type issues, so similar GeoPoint checks are performed.

  if (centerLat < -90 || centerLat > 90)
    throw Error("centerLat does not fit GeoPoint bounds.");
  if (centerLon < -180 || centerLon > 180)
    throw Error("centerLon does not fit GeoPoint bounds.");

  const originHash = geohashForLocation([centerLat, centerLon]);
  const bounds = geohashQueryBounds([centerLat, centerLon], radius);
  const promises = [];

  for (const b of bounds) {
    const q = connectedUsersCollection
    .orderBy('location.geohash')
    .startAt(b[0])
    .endAt(b[1]);

    promises.push(q.get());
  }

  // Collect query results and append into a single array
  const snapshots = await Promise.all(promises);

  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat = doc.get('location.lat');
      const lon = doc.get('location.lon');

      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = distanceBetween([lat, lon], [centerLat, centerLon]);
      if (distanceInKm * 1000 <= radius) {
        matchingDocs.push(doc.get('socketId'));
      }
    }
  }

  console.log(`getNearbyUsers(): ${matchingDocs.length} users found within`,
              `${radius} meters of ${centerLat}, ${centerLon}`);
  console.log(matchingDocs);
  return matchingDocs;
}
