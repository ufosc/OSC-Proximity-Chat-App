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
