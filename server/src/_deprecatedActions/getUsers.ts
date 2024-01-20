import { doc, getDoc } from '@firebase/firestore'
import { users } from '../utilities/firebaseInit'
// import { calculateCoordinateBoundaries } from '../utilities/calculateCoordinateBoundaries'

export const getUserById = async (userId: string) => {
    const userRef = doc(users, userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
        return userDoc.data()
    } else {
        return
    }
}

// ## Work towards getting nearby messages ##
// export const getNearbyUsers = async (coords: Array<number>) => {
//     const lat = coords[0]
//     const lon = coords[1]
//     const coordBoundries = await calculateCoordinateBoundaries(lat, lon)
//
//     // Upper and Lower x bounds
//     const lowerX = coordBoundries[0][0]
//     const upperX = coordBoundries[1][0]
//
//     // Upper and Lower y bounds
//     const lowerY = coordBoundries[0][1]
//     const upperY = coordBoundries[1][1]
//
//     // ## Place Firebase Query HERE ##
//
//     // PLACEHOLDER RESPONSE
//     const response = `Looking in X range ${lowerX} to ${upperX} and Y range ${lowerY} to ${upperY}`
//
//     return response
// }
