export interface Message {
    userId: string
    msgId: string
    msgContent: string
    lat: Number
    lon: Number
    geohash: string
    timeSent: Number
}
