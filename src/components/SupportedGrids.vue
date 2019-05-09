<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        flat
        slot="activator"
      >
        Supported Grids
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        Supported Grids
        </v-card-title>

        <v-card-text>


        <div class="text-xs-center">
        
          <p>For more information, choose one of the grids.</p>
          <v-data-table
            class="text-xs-left"
            hide-actions
            hide-headers
            :items="$store.state.supportedGrids"
          >
            <template slot="items" slot-scope="props">
              <td xs6 class="text-xs-center" v-html="props.item"></td>
            </template>
          </v-data-table>
        </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
          Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { formats } from '../coord-format-regexes.ts'

  export default {
    name: 'SupportedGrids',
    data () {
      return {
        dialog: false,
      }
    }
  }
</script>
