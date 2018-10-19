import Vue from 'vue';
import Vuex from 'vuex';

import { coordsIntoDD } from './coord-format-regexes'

Vue.use(Vuex);

const initialState = {
  longitudeDD: 0,
  latitudeDD: 0,
  inCali: null,
  county: null,
  locationState: null,
    // https://www.google.com/maps/search/?api=1&query=12.231, -12.231
  mapURL: '#',
  delormeData: {
    norcalPolys: [],
    page: null
  },
  httpErr: null
}

export default new Vuex.Store({
  state: JSON.parse(JSON.stringify(initialState)),
  mutations: {
    initDelormeData(state) {
      Vue.axios.get('NCalDeLormeGrids.txt').then((boundsData: any) => {
        let polys:any = boundsData.data.split('\n');
        state.delormeData.norcalPolys = []
        for(let i = 3; i < polys.length; i++) {
          let polyRawRow = polys[i].split('  ')
          let poly = []
          poly.push(parseFloat(polyRawRow[0]))
          poly.push(parseFloat(polyRawRow[1]))
          poly.push(parseFloat(polyRawRow[2]))
          poly.push(parseFloat(polyRawRow[3]))
          poly.push(polyRawRow[5].split(' ')[2])
          state.delormeData.norcalPolys.push(poly)
        }
      })
    },
    resetState(state) {
      state.county = null
      state.inCali = null
      state.locationState = null
      state.mapURL = '#'
    },
    // accepts the Geocache.com format for coordinates and pipes them to the information.
    tryCoordsGeocacheFormat(state, coords) {

      coordsIntoDD(coords, (longitudeDD: any, latitudeDD: any) => {
        state.longitudeDD = longitudeDD
        state.latitudeDD = latitudeDD

        // check the DeLorme boxes to see if there are any matches.
        let found = false
        for (var polyKey in state.delormeData.norcalPolys) {
          if (
            parseFloat(state.longitudeDD) <= state.delormeData.norcalPolys[polyKey][0]
            && parseFloat(state.longitudeDD) >= state.delormeData.norcalPolys[polyKey][1]
            && parseFloat(state.latitudeDD) <= state.delormeData.norcalPolys[polyKey][2]
            && parseFloat(state.latitudeDD) >= state.delormeData.norcalPolys[polyKey][3]
          ) {
            state.delormeData.page = state.delormeData.norcalPolys[polyKey][4]
            found = true
          }
        }
        if(!found) {
          state.delormeData.page = null
        }

        // make a request to Google maps developer API to get the county/state information, and the map url.
        // https://geo.fcc.gov/api/census/block/find?latitude=37.6867&longitude=-121.7067&format=json
        //`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.longitudeDD},${state.latitudeDD}&sensor=false`
        Vue.axios.get(`https://geo.fcc.gov/api/census/block/find?latitude=${(state.longitudeDD).toFixed(4)}&longitude=${(state.latitudeDD).toFixed(4)}&format=json`).then((res: any) => {
          // const address_components = res.data.results[0].address_components
          
          // console.log(res.data)
          // console.log(county)
          
          // const county = address_components.filter((component: any) => {
          //  return component.types.includes('administrative_area_level_2')
          // })[0].long_name
          const county = res.data.County["name"] || "unknown"
          state.county = county

          // const locationState = address_components.filter((component: any) => {
          //  return component.types.includes('administrative_area_level_1')
          // })[0].long_name

          const locationState = res.data.State["name"] || "NOT in the United States"
          state.locationState = locationState

          state.inCali = (locationState === 'California')
          // console.log(state.inCali)
          state.mapURL = `https://www.google.com/maps/search/?api=1&query=${state.longitudeDD},${state.latitudeDD}`
          state.httpErr = null

        }).catch(() => {state.httpErr = true})
      })
    }
  },
  actions: {
  },
});
