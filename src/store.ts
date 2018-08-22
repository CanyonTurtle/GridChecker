import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = {
  longitudeDD: 0,
  latitudeDD: 0,
  inCali: null,
  county: null
}

export default new Vuex.Store({
  state: JSON.parse(JSON.stringify(initialState)),
  mutations: {
    resetState(state) {
      state.county = null
      state.inCali = null
    },
    // accepts the Geocache.com format for coordinates and pipes them to the information.
    tryCoordsGeocacheFormat(state, coords) {
      const coordInfo = coords.split(' ')

      const longDirMultiplier = (coordInfo[0] === 'N') ? 1 : -1
      const longDeg = parseInt(coordInfo[1].split('°')[0], 10)
      const longMin = parseFloat(coordInfo[2])
      state.longitudeDD = longDirMultiplier * (longDeg + (longMin / 60))

      const latDirMultiplier = (coordInfo[3] === 'E') ? 1 : -1
      const latDeg = parseInt(coordInfo[4].split('°')[0], 10)
      const latMin = parseFloat(coordInfo[5])
      state.latitudeDD = latDirMultiplier * (latDeg + (latMin / 60))
      // 'http://maps.googleapis.com/maps/api/geocode/json?latlng=40.5059667,-124.1310000&sensor=false'
      // tslint:disable-next-line
      Vue.axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.longitudeDD},${state.latitudeDD}&sensor=false`).then((res: any) => {
        const address_components = res.data.results[0].address_components
        const county = address_components.filter((component: any) => {
         return component.types.includes('administrative_area_level_2')
        })[0].long_name
        state.county = county

        const locationState = address_components.filter((component: any) => {
         return component.types.includes('administrative_area_level_1')
        })[0].long_name
        state.inCali = (locationState === 'California')

      })
    }
  },
  actions: {
  },
});
