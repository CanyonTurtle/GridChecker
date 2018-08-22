import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VTextField,
  VDataTable
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VTextField,
    VDataTable
  },
  theme: {
  primary: "#43A047",
  secondary: "#e57373",
  accent: "#00acc1",
  error: "#f44336",
  warning: "#ffeb3b",
  info: "#00acc1",
  success: "#4caf50"
}
})
