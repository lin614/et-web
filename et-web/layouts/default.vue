<template>
  <v-app :dark="theme.dark">
    <ex-head></ex-head>
    <v-content>
      <!-- <v-container>
        <nuxt />
      </v-container> -->
      <nuxt />
    </v-content>

    <v-footer :fixed="false" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ExHead from "@/components/ExHead";
import { mapState } from "vuex";
export default {
  components: { ExHead },
  computed: {
    ...mapState(["theme"])
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      isdark: false
    };
  },
  created() {
    this.isdark = this.theme.dark;
  }
};
</script>
