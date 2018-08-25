
// this matches a Geocache.com input.
// example:N 37° 57.926 W 121° 58.667 
export const coordGeocacheDotComRegex = /^ *[NS] *\d{1,3}° \d{1,2}\.\d{1,3}'? [EW] \d{1,3}° \d{1,2}\.\d{1,3}'? *$/

export const coordDDRegex = /^ *-?\d{1,3}\.+\d{1,7} ?, ?-?\d{1,3}\.+\d{1,7} *$/

export const coordDMRegex = /^ *-?\d{1,3} \d{1,3}\.+\d{1,7} *, ?-?\d{1,3} \d{1,3}\.+\d{1,7} *$/

export const coordDMSRegex = /^ *-?\d{1,3} +\d{1,2} +\d{1,3}, ?-?\d{1,3} +\d{1,2} +\d{1,3} *$/

// responsible for determining if coordinates are in the correct format.
export const coordRegexMatcher = (v:any) => {
  if(coordGeocacheDotComRegex.test(v)) return true
  if(coordDDRegex.test(v)) return true
  if(coordDMRegex.test(v)) return true
  if(coordDMSRegex.test(v)) return true
  return 'input must be in a supported format.'
}

// parse the coordinates and pass the resulting ones into the callback.
// assembles the coodrinates into DD format if necessary.
export const parseLongLatDD = (coords: any, cb: Function) => {

  // Geocache.com format
  if(coordGeocacheDotComRegex.test(coords)) {
    const coordInfo = coords.split(' ')

    const longDirMultiplier = (coordInfo[0] === 'N') ? 1 : -1
    const longDeg = parseInt(coordInfo[1].split('°')[0], 10)
    const longMin = parseFloat(coordInfo[2])

    const latDirMultiplier = (coordInfo[3] === 'E') ? 1 : -1
    const latDeg = parseInt(coordInfo[4].split('°')[0], 10)
    const latMin = parseFloat(coordInfo[5])

    const longitudeDD = longDirMultiplier * (longDeg + (longMin / 60))
    const latitudeDD = latDirMultiplier * (latDeg + (latMin / 60))
    cb(longitudeDD, latitudeDD)

  // DD format
  } else if(coordDDRegex.test(coords)) {
    const coordInfo = coords.split(',')
    const longitudeDD = parseFloat(coordInfo[0])
    const latitudeDD = parseFloat(coordInfo[1])
    cb(longitudeDD, latitudeDD)

  // DM format
  } else if(coordDMRegex.test(coords)) {
    const coordInfo = coords.split(',')

    const coordLongInfo = coordInfo[0].split(' ')
    if(coordLongInfo[0] === '') coordLongInfo.shift()
    const longDegs = parseFloat(coordLongInfo[0])
    const longMins = parseFloat(coordLongInfo[1])
      const longitudeDD = longDegs + ((coordLongInfo[0][0] === '-') ? -1 : 1) * longMins / 60
    
    const coordLatInfo = coordInfo[1].split(' ')
    if(coordLatInfo[0] === '') coordLatInfo.shift()
    const latDegs = parseFloat(coordLatInfo[0])
    const latMins = parseFloat(coordLatInfo[1])
    const latitudeDD = latDegs + ((coordLatInfo[0][0] === '-') ? -1 : 1) * latMins / 60
    cb(longitudeDD, latitudeDD)

  // DMS format (essentially the same as DM)
  } else if (coordDMSRegex.test(coords)) {
    const coordInfo = coords.split(',')

    const coordLongInfo = coordInfo[0].split(' ')
    if(coordLongInfo[0] === '') coordLongInfo.shift()
    const longDegs = parseFloat(coordLongInfo[0])
    const longMins = parseFloat(coordLongInfo[1])
    const longSecs = parseFloat(coordLongInfo[2])
      const longitudeDD = longDegs + ((coordLongInfo[0][0] === '-') ? -1 : 1) * (longMins / 60 + longSecs / 3600)
    
    const coordLatInfo = coordInfo[1].split(' ')
    if(coordLatInfo[0] === '') coordLatInfo.shift()
    const latDegs = parseFloat(coordLatInfo[0])
    const latMins = parseFloat(coordLatInfo[1])
    const latSecs = parseFloat(coordLatInfo[2])
    const latitudeDD = latDegs + ((coordLatInfo[0][0] === '-') ? -1 : 1) * (latMins / 60 + latSecs / 3600)
    cb(longitudeDD, latitudeDD)
  }
}
