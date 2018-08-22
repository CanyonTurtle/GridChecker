
// this matches a Geocache.com input.
// example:N 37° 57.926 W 121° 58.667 
const coordRegex = /^ *[NS] *\d{1,3}° *\d{1,2}\.\d{1,3} *[EW] *\d{1,3}° *\d{1,2}\.\d{1,3} *$/

// responsible for determining if coordinates are in the correct format.
export const coordRegexMatcher = (v) => {
  if(coordRegex.test(v)) return true
  return 'not a geocache.com format.'
}
