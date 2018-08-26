<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        class="info"
      >
        Formats
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        Coordinate Formats
        </v-card-title>

        <v-card-text>
        <div class="text-xs-center">
        
          <p>Note: longitude preceeds latitude.</p>
          <v-data-table
            class="text-xs-left"
            hide-actions
            hide-headers
            :items="formatTable"
          >
            <template slot="items" slot-scope="props">
              <td xs6 class="text-xs-right" v-html="props.item.name"></td>
              <td xs6 class="text-xs-left" v-html="props.item.val"></td>
            </template>
          </v-data-table>
          <p><a href="https://www.ubergizmo.com/how-to/read-gps-coordinates/">How to read GPS Coordinates</a></p>
        </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
          Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { formats } from '../coord-format-regexes.ts'

  export default {
    name: 'FormatInfo',
    data () {
      return {
        dialog: false,
        formatTable: formats.map(format => ({
          value: false,
          name: format.abbreviatedName,
          val: format.example
        }))
      }
    }
  }
</script>
