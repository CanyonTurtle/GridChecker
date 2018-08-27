<template>
  <v-container class="maincoordtool">
    <v-layout>
      <v-slide-y-transition>
      <v-flex class="text-xs-center" v-show="$store.state.county === null" key="1">
        <h2>Supply coordinates</h2>
        <p>Find coordinates from <a href="https://www.geocaching.com/play/search">Geocaching.com</a>, and paste them here.</p>
        <v-form ref="degreeinputform" v-model="valid" @submit.prevent="submit">
            <v-text-field
              v-model="coords"
              :rules="coordsRules"
              :counter="30"
              label="Coordinates"
            ></v-text-field>
          <v-btn
            class="warning black--text"
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
          <FormatInfo class="lineup"></FormatInfo>
        </v-form>
      </v-flex>
      </v-slide-y-transition>
      <v-slide-y-transition>
      <v-flex class="text-xs-center" v-show="$store.state.county !== null" key="2">
        <h2>Results</h2>
        <p>{{coords}}</p>
        <v-data-table
          class="text-xs-left"
          hide-actions
          hide-headers
          :items="infoTable"
        >
          <template slot="items" slot-scope="props">
            <td xs6 class="text-xs-right" v-html="props.item.name"></td>
            <td xs6 class="text-xs-left" v-html="props.item.val"></td>
          </template>
        </v-data-table>
        <v-btn @click="clear">Try Another Cache</v-btn>
        <v-btn :href="$store.state.mapURL" class="secondary">Google Maps</v-btn>
      </v-flex>
      </v-slide-y-transition>
    </v-layout>
  </v-container>
</template>

<script>

import { inputValidator } from '../coord-format-regexes'
import FormatInfo from './FormatInfo.vue'

export default {
  name: 'HelloWorld',
  components: {
    FormatInfo
  },
  data() {
    return {
      valid: false,
      coords: '',
      coordsRules: [
        inputValidator
      ]
    }
  },
  methods: {
    submit(event) {
      event.preventDefault()
      this.$store.commit('tryCoordsGeocacheFormat', this.coords)
    },
    clear() {
      this.$refs.degreeinputform.reset()
      this.$store.commit('resetState')
    }
  },
  computed: {
    infoTable: {
      get() {
        return [
          {
           value: false,
           name: 'Longitude (DD)',
           val: this.$store.state.longitudeDD.toFixed(4)
          },
          {
           value: false,
           name: 'Latitude (DD)',
           val: this.$store.state.latitudeDD.toFixed(4)
          },
          {
           value: false,
           name: 'County',
           val: this.$store.state.county
          },
          {
           value: false,
           name: 'State',
           val: this.$store.state.locationState
          },
          {
           value: false,
            name: '<a href="https://www.geocaching.com/geocache/GCHANH_california-delorme-challenge-northern?guid=0ed51790-46d9-4d27-bdec-c2893dc19174">California DeLorme<br/>Challenge (Northern)<br/> [GCHANH]</a> Page #',
           val: (!this.$store.state.inCali) ? 'Coordinates do not qualify, they are NOT in California.'
            : ((this.$store.state.delormeData.page !== null) ? this.$store.state.delormeData.page : 'Coordinates are NOT on any page.')
          }
        ]
      },
      set(val) {
        return null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* best line here */
.slide-y-transition-leave-to {
  transition: none !important;  
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.lineup {
  display: inline;
}
</style>
