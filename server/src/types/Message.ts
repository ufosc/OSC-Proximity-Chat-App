export interface Message {
    userId: string
    msgId: string
    msgContent: string
    lat: number
    lon: number
    geohash?: string
    timeSent: number
}
