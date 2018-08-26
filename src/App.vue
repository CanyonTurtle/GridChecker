<template>
  <v-app>
    <v-toolbar
    >
      <v-toolbar-title>DeLorme Page Tool</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <CoordTool/>
    </v-content>
    <v-footer app>
        <span>MIT Licensed. &copy; 2018. Please, Star on <a href="https://github.com/CanyonTurtle/DelormePageTool">GitHub</a> :)</span>
    </v-footer>
  </v-app>
</template>

<script>
import CoordTool from './components/CoordTool'

export default {
  name: 'App',
  components: {
    CoordTool
  },
  data() {
    return {
      rightDrawer: false,
      title: 'GeoCache Aid'
    }
  },
  created() {
    this.$store.commit('initDelormeData')
  }
}
</script>
