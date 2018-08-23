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

        <v-card-text class="text-xs-center">
        <span>(Longitude always preceeds latitude.)</span>
        <div class="text-xs-left">
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
  export default {
    name: 'FormatInfo',
    data () {
      return {
        dialog: false,
        formatTable: [
          {
            value: false,
            name: 'DIR',
            val: 'N 37° 41.200 W 121° 42.400'
          },
          {
            value: false,
            name: 'DD',
            val: '37.6867, -121.7067'
          },
          {
            value: false,
            name: 'DM',
            val: '37 41.202, -121 42.402'
          },
          {
            value: false,
            name: 'DMS',
            val: '37 41 12, -121 42 24'
          },
        ]
      }
    }
  }
</script>
