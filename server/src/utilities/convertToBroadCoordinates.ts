export const convertToBroadCoordinates = (coords: Array<number>) => {
  let lat = coords[0]
  let lon = coords[1]

  // Digits is how many numbers behind the decimal point
  // Why did we choose 2? Refer to documentation! (I will write docs in a few weeks)
  let digits = 2

  let newLat = Math.trunc(lat*Math.pow(10, digits))/Math.pow(10, digits)
  let newLon = Math.trunc(lon*Math.pow(10, digits))/Math.pow(10, digits)

  // return truncated coordinates as an array
  return [newLat, newLon]
}
