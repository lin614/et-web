import Vue from 'vue'
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
  VForm,
  VCheckbox,
  VInput,
  VALERT,
  VTabs,
  // VTab,
  // VTabItem,
  VBadge,
  VDataTable,
  VDialog,
  VSelect,
  VAutocomplete,
  VTextField,
  VSlider,
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
    VForm,
    VCheckbox,
    VInput,
    VALERT,
    VTabs,
    // VTab,
    // VTabItem,
    VBadge,
    VDataTable,
    VDialog,
    VSelect,
    VAutocomplete,
    VTextField,
    VSlider,
  }
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