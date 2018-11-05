<template>
  <v-app>
    <ex-head></ex-head>
    <v-content>
      <!-- <v-container>
        <nuxt />
      </v-container> -->
      <nuxt />
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ExHead from '@/components/ExHead'
export default {
  components: { ExHead },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
