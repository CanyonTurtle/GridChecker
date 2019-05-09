import Vue from 'vue';
import Vuex from 'vuex';

import { coordsIntoDD } from './coord-format-regexes'

Vue.use(Vuex);

const initialState = {
  supportedGrids: [],
  isResultLoaded: false,
  //  longitudeDD: 0,
  //  latitudeDD: 0,
  //  locataionState: null,
  //  inCali: null,
  //  county: null,
  //  locationState: null,
  // https://www.google.com/maps/search/?api=1&query=12.231, -12.231
  mapURL: '#',
  grids: [
    {
      label: "dummy grid",
      link: "https://google.com",
      requiresState: "none",
      requiresCounty: "whodat",
      polys: [
        [0, 0, 1, 1, "memes"]
      ]
    }
  ],
  httpErr: null,
  infoTable: []
}

export default new Vuex.Store({
  state: JSON.parse(JSON.stringify(initialState)),
  mutations: {
    initGridData(state) {
      state.supportedGrids = []
      Vue.axios.get('grid-manifest.txt').then((manifest: any) => {
        let files = manifest.data.split('\n')
        for(let file of files) {
          Vue.axios.get("Grids/" + file).then((boundsData: any) => {
            let polys:any = boundsData.data.split('\n');

            let grid:any = {
              label: polys[0].split(',')[1],
              link: polys[1].split(',')[1],
              requiresState: polys[2].split(',')[1],
              requiresCounty: polys[3].split(',')[1],
              polys: []
            }

            state.supportedGrids.push(`<!--${grid.label}--><a href=${grid.link}>${grid.label}</a>`)

            // s l o w - O(n^3) - but needs to happen after all gets.
            state.supportedGrids.sort()

            // console.log(file)

            for(let i = 5; i < polys.length; i++) {
              let polyRawRow = polys[i].split(',')
              let poly = []
              poly.push(parseFloat(polyRawRow[0]))
              poly.push(parseFloat(polyRawRow[1]))
              poly.push(parseFloat(polyRawRow[2]))
              poly.push(parseFloat(polyRawRow[3]))
              poly.push(polyRawRow[4])
              grid.polys.push(poly)
            }
            state.grids.push(grid)
          })

        }

        // console.log(state.supportedGrids)
      })
    },
    resetState(state) {
      state.county = null
      state.locationState = null
      state.mapURL = '#'
      state.httpErr = null
      state.isResultLoaded =  false
      state.infoTable = []
    },
    // accepts the Geocache.com format for coordinates and pipes them to the information.
    tryCoordsGeocacheFormat(state, coords) {

      coordsIntoDD(coords, (longitudeDD: any, latitudeDD: any) => {

        // make a request to Google maps developer API to get the county/state information, and the map url.
        // https://geo.fcc.gov/api/census/block/find?latitude=37.6867&longitude=-121.7067&format=json
        //`https://maps.googleapis.com/maps/api/geocode/json?latlng=${longitudeDD},${latitudeDD}&sensor=false`
        let req = `https://geo.fcc.gov/api/census/block/find?latitude=${(longitudeDD).toFixed(4)}&longitude=${(latitudeDD).toFixed(4)}&format=json`
        // console.log(req)
        Vue.axios.get(req).then((res: any) => {
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
          state.mapURL = `https://www.google.com/maps/search/?api=1&query=${longitudeDD},${latitudeDD}`
          state.httpErr = null



          state.infoTable.push({
            value: false,
            name: 'Longitude (DD)',
            val: longitudeDD.toFixed(4)
          })
          state.infoTable.push({
            value: false,
            name: 'Latitude (DD)',
            val: latitudeDD.toFixed(4)
          })
          state.infoTable.push({
            value: false,
            name: 'County',
            val: county
          })
          state.infoTable.push({
            value: false,
            name: 'State',
            val: locationState
          })


          // check the DeLorme boxes to see if there are any matches.
          let found = false
          for(let grid of state.grids) {
            for(let poly of grid.polys) {
              if (
                parseFloat(longitudeDD) <= poly[0]
                && parseFloat(longitudeDD) >= poly[1]
                && parseFloat(latitudeDD) <= poly[2]
                && parseFloat(latitudeDD) >= poly[3]
              ) {
                if(grid.requiresCounty != "none" && grid.requiresCounty != county) {
                  continue
                }
                if(grid.requiresState != "none" && grid.requiresState != locationState) {
                  continue
                }
                found = true
                state.infoTable.push({
                  value: false,
                  name: `<a href=${grid.link}>${grid.label}</a>`,
                  val: poly[4]
                })
              }

            }
          }
          //         for (var polyKey in state.delormeData.polys) {
          //           if (
          //             parseFloat(longitudeDD) <= state.delormeData.polys[polyKey][0]
          //             && parseFloat(longitudeDD) >= state.delormeData.polys[polyKey][1]
          //             && parseFloat(latitudeDD) <= state.delormeData.polys[polyKey][2]
          //             && parseFloat(latitudeDD) >= state.delormeData.polys[polyKey][3]
          //           ) {
          //             state.delormeData.page = state.delormeData.polys[polyKey][4]
          //             found = true
          //           }
          //         }


          if(!found) {
            state.infoTable.push({
              value: false,
              name: "results",
              val: "There are no matches from any supported grids for this cache."
            })
          }

          state.isResultLoaded = true;
        }).catch((err:any) => {console.log(err);state.httpErr = true})
      })
    }
  },
  actions: {
  },
});
