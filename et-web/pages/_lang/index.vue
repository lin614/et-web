<template>
  <div>
    <ex-banner></ex-banner>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <div class="text-xs-center">
          <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        </div>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto" width="344">
            <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
            <v-card-title>
              <div>
                <span class="headline">Cafe Badilico</span>
                <div class="d-flex">

                  <div class="ml-2 grey--text text--darken-2">
                    <span>1111</span>
                    <span>222</span>
                  </div>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-btn icon class="mr-0">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-hover>

        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
            <v-card-text>
              <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
              <p>For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>.</p>
              <p>If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>.</p>
              <p>Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
              <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
              <div class="text-xs-right">
                <em><small>&mdash; John Leider</small></em>
              </div>
              <hr class="my-3">
              <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
              <br>
              <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import ExBanner from '@/components/ExBanner'
import { mapActions } from 'vuex'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { ExBanner }
}
</script>

