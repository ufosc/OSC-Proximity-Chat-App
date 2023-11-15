export const getNearbyMessages = (userLat: string, userLon: string, broadMessageData) => {
    // console.log(broadMessageData)

    // TODO: Make radius a .env paramter
    // Radius is in meters
    const radiusEarth: number = 6371000
    const messageRadiusMeters: number = 200

    const nearbyMessageObjs = [];

    try {
        const userLatNum: number = Number(userLat)
        const userLonNum: number = Number(userLon)

        broadMessageData.forEach((message) => {
            const msgLat = message.specificLat
            const msgLon = message.specificLon
            const msgLatNum: number = Number(msgLat)
            const msgLonNum: number = Number(msgLon)

            console.log("Message data:")
            console.log(message)
            console.log("User specific coords:", userLatNum, userLonNum)
            console.log("Message specific coords:", msgLatNum, msgLonNum)

            // 1. Find distance of user from message via the Haversine Formula. Simple trig shouldn't be used since the Earth is a sphere.

            const distanceLat = (msgLatNum * Math.PI / 180) - (userLatNum * Math.PI / 180)
            const distanceLon = (msgLonNum * Math.PI / 180) - (userLonNum * Math.PI / 180)
            const a = Math.pow(Math.sin(distanceLat/2), 2) +
                Math.cos(msgLatNum * Math.PI / 180) * Math.cos(userLatNum * Math.PI / 180) * Math.pow(Math.sin(distanceLon/2), 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            const distance = Math.floor(radiusEarth * c)

            console.log("Distance:", distance)
            console.log("Seconds old:", Math.floor((Date.now()/1000) - message.timeSent))

            // 2. if distance is within the set radius, return
            if (distance <=  messageRadiusMeters) {
                nearbyMessageObjs.push(message)
            }
        })
        return nearbyMessageObjs
    } catch (e) {
        return false
    }
}
