import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import theme from './theme'
import {
  Vuetify,
  VApp,
  VCard,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VImg,
  VMenu,
  VHover,
  VCarousel,
  VDivider,
  VTabs,
  VBadge,
  VDataTable,
  VTextField,
  VTooltip
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VImg,
    VMenu,
    VHover,
    VCarousel,
    VDivider,
    VTabs,
    VBadge,
    VDataTable,
    VTextField,
    VTooltip
  },
  theme: theme
})

// import ExHover from '../components/common/ExHover.vue'
// Vue.component('ex-hover', ExHover)

export default async ({
  app,
  store
}) => {

  if (process.client) {
    // //默认主题
    // let dark = localStorage.getItem('dark')

    // store.commit('set_dark_theme', dark)
  }
}