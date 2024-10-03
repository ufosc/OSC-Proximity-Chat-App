import { geohashForLocation} from 'geofire-common'
import { connectedUsersCollection } from '../utilities/firebaseInit'

export const toggleUserConnectionStatus = async (socketID: string) => {
  let status = connectedUsersCollection.doc(socketID).isConnected;
  await connectedUsersCollection.doc(socketID).update({ isConnected: !status });
}

export const updateUserLocation = async (socketID: string, lat: number, lon: number) => {
  const newHash = geohashForLocation([lat, lon]);
  await connectedUsersCollection.doc(socketID).update({
    "location.lat": lat,
    "location.lon": lon,
    "location.geohash": newHash,
  });
}

export const updateUserDisplayName = async (socketID: string, displayName: string) => {
  await connectedUsersCollection.doc(socketID).update({ displayName: displayName });
}
