import { doc, endAt, getDocs, orderBy, query, startAt } from 'firebase/firestore'
import { users } from '../utilities/firebaseInit'
import { distanceBetween, geohashForLocation, geohashQueryBounds } from 'geofire-common'

export const findNearbyUsers = async (centerLat: number, centerLon: number, radius: number) => {
// Return an array of nearby userIds (which are also socket ids) given a center latitude and longitude.
// Latitude and longitude values use degrees with the same bounds as GeoPoints. Radius values use meters.
// Credit to https://firebase.google.com/docs/firestore/solutions/geoqueries for doing the heavy lifting for us.

// Additionally, GeoPoints and storing a 'center' array leads to type issues, so similar GeoPoint checks are performed.

 try {
   console.log(`getNeabyUsers(): centerLat: ${centerLat}, centerLon: ${centerLon}, radius (meters): ${radius}`)
   if (centerLat < -90 || centerLat > 90) throw Error("centerLat does not fit GeoPoint bounds.")
   if (centerLon < -180 || centerLon > 180) throw Error("centerLon does not fit GeoPoint bounds.")

   const originHash = geohashForLocation([centerLat, centerLon])
   const bounds = geohashQueryBounds([centerLat, centerLon], radius)
   const promises = []

   for (const b of bounds) {
    const q = query(
     users,
     orderBy('geohash'),
     startAt(b[0]),
     endAt(b[1])
    )

    promises.push(getDocs(q))
   }

   // Collect query results and append into a single array
   const snapshots = await Promise.all(promises)

   const matchingDocs = []
   for (const snap of snapshots) {
    for (const doc of snap.docs) {
     const lat = doc.get('lat')
     const lon = doc.get('lon')

     // We have to filter out a few false positives due to GeoHash
     // accuracy, but most will match
     const distanceInKm = distanceBetween([lat, lon], [centerLat, centerLon])
     const distanceInM = distanceInKm * 1000
     if (distanceInM <= radius) {
      matchingDocs.push(doc)
     }
    }
   }

   // Extract userIds from matched documents
   const userIds = []
   for (const doc of matchingDocs) {
    userIds.push(doc.data()['userId'])
   }
   console.log(`getNearbyUsers(): ${userIds.length} users found within ${radius} meters of ${centerLat}, ${centerLon}`)
   return userIds
 } catch (error) {
   console.error("getNearbyUsers() failed.", error.message)
 }
}
