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
  VTextField,
  VALERT,
  

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
    VTextField,
    VALERT
  }
})

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