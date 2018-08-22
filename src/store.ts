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
      let coordInfo = coords.split(' ')

      let longDirMultiplier = (coordInfo[0] == 'N') ? 1 : -1
      let longDegComponent = parseInt(coordInfo[1].split('°')[0], 10)
      let longMinComponent = parseFloat(coordInfo[2])
      state.longitudeDD = longDirMultiplier * (longDegComponent + (longMinComponent / 60))

      let latDirMultiplier = (coordInfo[3] == 'E') ? 1 : -1
      let latDegComponent = parseInt(coordInfo[4].split('°')[0], 10)
      let latMinComponent = parseFloat(coordInfo[5])
      state.latitudeDD = latDirMultiplier * (latDegComponent + (latMinComponent / 60))
      //'http://maps.googleapis.com/maps/api/geocode/json?latlng=40.5059667,-124.1310000&sensor=false'
      Vue.axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${state.longitudeDD},${state.latitudeDD}&sensor=false`).then((res) => {
        let address_components = res.data.results[0].address_components
        let county = address_components.filter(component => {
         return component.types.includes('administrative_area_level_2')
        })[0].long_name
        state.county = county

        let locationState = address_components.filter(component => {
         return component.types.includes('administrative_area_level_1')
        })[0].long_name
        state.inCali = (locationState === 'California')

      })
    }
  },
  actions: {
  },
});
