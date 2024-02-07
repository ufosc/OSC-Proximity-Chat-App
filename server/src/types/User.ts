export interface UserConfig {
  uid: string
  isConnected: boolean
  lastConnectionTime: number
  blacklistedUids: Array<string>
  moderation: {
    muteTimeStart: number
    muteTimeEnd: number
    banTimeStart: number
    banTimeEnd: number
    isPermaBanned: boolean
    reason: string
  }
}

export interface ConnectedUser {
    uid: string
    socketId: string
    displayName: string
    userIcon?: {
        foregroundImage: string
        backgroundImage: string
    }
    location: {
        lat: number
        lon: number
        geohash: string
    }
}
