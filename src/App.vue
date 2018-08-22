<template>
  <v-app>
    <v-toolbar
      class="primary white--text"
      app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <CoordTool/>
    </v-content>
    <v-footer app>
      <span>MIT Licensed. &copy; 2018</span>
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
  }
}
</script>
