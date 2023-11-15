export const convertToBroadCoordinates = (specificLat: string, specificLon: string) => {
  // Digits is how many numbers behind the decimal point
  // Why did we choose 2? Refer to documentation! (I will write docs in a few weeks)
  
  // The number of characters after the decimal point we wish to keep
  const digits = 2
  // The number of characters before the decimal point, including a character for the decimal point
  let baseLat = 3
  let baseLon = 3

  // Increase if a negative sign is found
  if (specificLon[0] == "-") baseLon++;
  if (specificLat[0] == "-") baseLat++;
  
  // Get truncated string
  let broadLat = specificLat.substring(0, baseLat + digits);
  let broadLon = specificLon.substring(0, baseLon + digits);

  // return truncated coordinates as an array
  return [broadLat, broadLon]
}
