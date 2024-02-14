export interface MessageType {
    uid: string
    authorName?: string // To be only used for display purposes (i.e. do not send to server)
    msgId: string
    msgContent: string
    timeSent: number // Unix timestamp; Date.now() returns a Number.
    location: {
        lat: number
        lon: number
        geohash?: string
    }
}
