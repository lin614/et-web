<template>
  <div class="market">
    <ex-kline />
    <div style="width:400px;height:calc(100%-10px);background-color:red" v-show="v1">

    </div>
    <div style="width:400px;height:calc(100%-10px);background-color:yellow" v-show="v2">

    </div>
    <v-navigation-drawer :mini-variant="mini" :mini-variant-width="50" v-model="drawer" right hide-overlay stateless absolute>
      <!-- <v-toolbar flat class="transparent">s
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar> -->

      <v-list class="pt-0">

        <v-list-tile @click="v2=!v2">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="v1=!v1">
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ExKline from "@/components/ExKline";
// import TVChartContainer from "@/components/TVChartContainer.vue";
export default {
  components: { ExKline },
  async asyncData({ store }) {
    await store.dispatch("initBars");
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      mini: true,
      right: null,
      v1: false,
      v2: true
    };
  }
};
</script>
<style>
.v-list__tile {
  padding: 16px 2px !important;
}
</style>
<style lang="stylus" scoped>
.market {
  height: 100%;
  width: calc(100% - 46px);
  display: flex;
}
</style>

