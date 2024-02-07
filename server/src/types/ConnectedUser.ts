export interface ConnectedUser {
    uid: string
    socketid: string
    displayName: string
    userIcon: {
        foregroundImage: string
        backgroundImage: string
    }
    location: {
        lat: number
        lon: number
        geohash: string
    }
}
