<template>
  <v-container lg8>
    <v-layout>
      <v-flex transition="slide-y-transition" v-show="$store.state.county === null">
        <v-form ref="degreeinputform" v-model="valid">
            <v-text-field
              v-model="coords"
              :rules="coordsRules"
              :counter="20"
              label="Coordinates (ex: )"
            ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
      <v-flex transition="slide-y-transition" v-show="$store.state.county !== null">
        <v-data-table
          hide-actions
          hide-headers
          :items="infoTable"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.county}}</td>
          </template>
        </v-data-table>
        <v-btn @click="clear">Try Another Cache</v-btn>
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
           name: 'longitude (DD)',
           county: this.$store.state.longitudeDD
          },
          {
           value: false,
           name: 'latitude (DD)',
           county: this.$store.state.latitudeDD
          },
          {
           value: false,
           name: 'county',
           county: this.$store.state.county
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
