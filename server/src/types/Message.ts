export interface Message {
    uid: string
    msgId: string
    msgContent: string
    timeSent: number
    location: {
        lat: number
        lon: number
        geohash?: string
    }
}
