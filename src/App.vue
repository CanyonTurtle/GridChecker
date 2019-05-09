<template>
  <v-app>
    <v-toolbar
        class="warning"
    >
      <v-layout justify-space-between fill-height/>
        <v-flex xs6>
          <v-toolbar-title class="text-xs-left">Grid Checker</v-toolbar-title>
        </v-flex>
        <v-spacer>
        </v-spacer>
        <v-flex xs6 class="text-xs-right">
          <SupportedGrids class="lineup"></SupportedGrids>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <CoordTool/>
    </v-content>
    <v-footer app>
        <span>MIT Licensed. &copy; 2019. Please, Star on <a href="https://github.com/CanyonTurtle/DelormePageTool">GitHub</a> :)</span>
    </v-footer>
  </v-app>
</template>

<script>
import CoordTool from './components/CoordTool'
import SupportedGrids from './components/SupportedGrids.vue'

export default {
  name: 'App',
  components: {
    CoordTool,
    SupportedGrids
  },
  data() {
    return {
      rightDrawer: false,
      title: 'GeoCache Aid'
    }
  },
  created() {
    this.$store.commit('initGridData')
  }
}
</script>
<style scoped>
.lineup {
  display: inline;
}
</style>
