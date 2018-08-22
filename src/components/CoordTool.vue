<template>
  <v-container>
    <v-layout>
      <v-flex class="text-xs-center" transition="slide-y-transition" v-show="$store.state.county === null">
        <h1>Paste coordinates to a cache: </h1>
        <v-form ref="degreeinputform" v-model="valid">
            <v-text-field
              v-model="coords"
              :rules="coordsRules"
              :counter="30"
              label="Coordinates (ex: )"
            ></v-text-field>
          <v-btn
            class="secondary"
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
      <v-flex class="text-xs-center" transition="slide-y-transition" v-show="$store.state.county !== null">
        <h1>Cache Info</h1>
        <v-data-table
          hide-actions
          hide-headers
          :items="infoTable"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.val}}</td>
          </template>
        </v-data-table>
        <v-btn @click="clear">Try Another Cache</v-btn>
        <v-btn :href="$store.state.mapURL" class="info">Google Maps</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { coordRegexMatcher } from '../coord-regex-matcher'
export default {
  name: 'HelloWorld',
  data() {
    return {
      valid: false,
      coords: '',
      coordsRules: [
        coordRegexMatcher
      ]
    }
  },
  methods: {
    submit() {
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
           name: 'Norcal DeLorme Challenge Page #',
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
</style>
