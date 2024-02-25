export interface MessageType {
    author: {
        uid: string
        displayName?: string // To be only used for display purposes (do not send to server)
    }
    msgId: string
    msgContent: string
    timeSent: number // Unix timestamp; Date.now() returns a Number.
    location: {
        lat: number
        lon: number
        geohash?: string
    }
}
