// the list of formats.
// add support for new formats by using this template:
// {
//   abbreviatedName: a 5-character-or-less ticker for the format.
//   example: a string that resembles an example input.
//   formatRegex: a regex that identifies whether or not a string is this type of format.
//   parseCoordsIntoDD: a function accepting the input coord string, and a callback for 
//   updating the store, and will parse out and/or convert to the decimal-degree form of the coordinates 
//   and call the callback with the two longitude/latitude DD coordinate values.
// }
export const formats = [
  // format like on geocache.com
  {
    abbreviatedName: 'GEO',
    example: 'N 37° 41.200 W 121° 42.400',
    formatRegex: /^ *[NS] \d{1,3}° \d{1,2}\.\d{1,3}'? [EW] \d{1,3}° \d{1,2}\.\d{1,3}'? *$/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
      const coordInfo = inputCoords.split(' ')

      const longDirMultiplier = (coordInfo[0] === 'N') ? 1 : -1
      const longDeg = parseInt(coordInfo[1].split('°')[0], 10)
      const longMin = parseFloat(coordInfo[2])

      const latDirMultiplier = (coordInfo[3] === 'E') ? 1 : -1
      const latDeg = parseInt(coordInfo[4].split('°')[0], 10)
      const latMin = parseFloat(coordInfo[5])

      const longitudeDD = longDirMultiplier * (longDeg + (longMin / 60))
      const latitudeDD = latDirMultiplier * (latDeg + (latMin / 60))
      storeUpdater(longitudeDD, latitudeDD)
    }
  },
  {
    abbreviatedName: 'MAP',
    example: '37°41\'12.0"N 121°42\'24.0"W',
    // todo figure out number of things for second place.
    formatRegex: /^\d{1,3}°\d{1,2}\'\d{1,3}\.\d\"[NS] *\d{1,3}°\d{1,2}\'\d{1,3}\.\d\"[EW] *$/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
      const coordInfo = inputCoords.split(' ')

      const longDirMultiplier = coordInfo[0].includes('N')? 1 : -1

      const longDeg = parseInt(coordInfo[0].split('°')[0], 10)
      let longMin = parseFloat(coordInfo[0].split('°')[1])
      longMin += parseFloat(coordInfo[0].split('\'')[1]) / 60

      console.log(longDeg)
      console.log(longMin)

      const latDirMultiplier = coordInfo[1].includes('E')? 1 : -1

      const latDeg = parseInt(coordInfo[1].split('°')[0], 10)
      let latMin = parseFloat(coordInfo[1].split('°')[1])
      latMin += parseFloat(coordInfo[1].split('\'')[1]) / 60

      console.log(latDeg)
      console.log(latMin)

      const longitudeDD = longDirMultiplier * (longDeg + (longMin / 60))
      const latitudeDD = latDirMultiplier * (latDeg + (latMin / 60))

      console.log(longitudeDD)
      console.log(latitudeDD)

      storeUpdater(longitudeDD,  latitudeDD);
    }
  },
  // Decimal-degree notation
  {
    abbreviatedName: 'DD',
    example: '37.6867, -121.7067',
    formatRegex: /^ *-?\d{1,3}\.+\d{1,7} ?, ?-?\d{1,3}\.+\d{1,7} *$/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
      const coordInfo = inputCoords.split(',')
      const longitudeDD = parseFloat(coordInfo[0])
      const latitudeDD = parseFloat(coordInfo[1])
      storeUpdater(longitudeDD, latitudeDD)
    }
  },
  // Degree ldecimal-minute notation
  {
    abbreviatedName: 'DMM',
    example: '37 41.202, -121 42.402',
    formatRegex: /^ *-?\d{1,3} *\d{1,3}\.+\d{1,7} *, *-?\d{1,3} *\d{1,3}\.+\d{1,7} *$/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
      const coordInfo = inputCoords.split(',')

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
      storeUpdater(longitudeDD, latitudeDD)

    }
  },
  // Degree minute second notation
  {
    abbreviatedName: 'DMS',
    example: '37 41 12, -121 42 24',
    formatRegex: /^ *-?\d{1,3} +\d{1,2} +\d{1,3}, *-?\d{1,3} +\d{1,2} +\d{1,3} *$/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
      const coordInfo = inputCoords.split(',')

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
      storeUpdater(longitudeDD, latitudeDD)
    }
  }
  /*
  ,
  {
    abbreviatedName: 'BETTER MAP',
    example: 'N37 12.345, W121 67.890',
    formatRegex: /^ *[NS] *\d{1,2}°? +\d{1,2}\.\d{0,3} +[EW] *\d{1,2}°? +\d{1,2}\.\d{0,3}/,
    parseCoordsIntoDD(inputCoords: string, storeUpdater: Function) {
    }
  }
   */
]

// given text input, return whether or not the input matches ANY of the coordinate forms.
export const inputValidator = (v: any) => {
  let isValidFormat = false
  formats.forEach((format: any) => {
    if(format.formatRegex.test(v)) isValidFormat = true
  })
  return isValidFormat || 'Coordinate format is not valid.'
}

// Use the provided formats and convert the coordinates to DD, and pass them into a callback
// which will update the store.
export const coordsIntoDD = (inputCoords: string, storeUpdater: Function) => {
  formats.forEach((format: any) => {
    if(format.formatRegex.test(inputCoords)) {
      format.parseCoordsIntoDD(inputCoords, storeUpdater)
    }
  })
}
