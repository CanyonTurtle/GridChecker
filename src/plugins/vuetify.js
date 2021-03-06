import Vue from 'vue'
import { createSimpleTransition } from 'vuetify/es5/util/helpers'
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
  VDataTable,
  VDialog,
  VCard,
  VDivider,
  VAlert
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
    VDataTable,
    VDialog,
    VCard,
    VDivider,
    VAlert
  },
  theme: {
  primary: "#43A047",
  secondary: "#e57373",
  accent: "#00acc1",
  error: "#f44336",
  warning: "#ddff00",
    //info: "#00acc1",
  info: "#78aceb",
  success: "#4caf50"
}
})

const noFadeoutTransition = createSimpleTransition('no-fadeout-transition')

Vue.component('no-fadeout-transition', noFadeoutTransition)
