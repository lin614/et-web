<template>
  <div class="market">
    <div class="dash">
      <div class="panel1">
        <ex-kline />
      </div>
      <div class="panel2" v-show="v1">

      </div>
      <div class="panel3" v-show="v2">

      </div>
    </div>
    <!-- <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md7>
          <v-card color="purple" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
          </v-card>
        </v-flex>
       
        <v-flex d-flex xs12 sm6 md2 child-flex v-show="v2">
          <v-card color="green lighten-2" dark>
            <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 v-show="v1">
          <v-card color="blue lighten-2" dark>
            <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->
    <!-- <ex-kline />
    <div class="orderPanel" :style="`width:${orderWidth}px`" v-show="v1">

    </div>
    <div class="infoPanel" :style="`width:${infoWidth}px`" v-show="v2">
      <div class="infoPanel_region">

      </div>

    </div> -->
    <v-navigation-drawer :mini-variant="mini" :mini-variant-width="50" v-model="drawer" right hide-overlay stateless absolute fixed permanent>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0 sideMenu">

          <v-list-tile @click="v2=!v2">
            <v-list-tile-action>
              <!-- <v-icon>dashboard</v-icon> -->
              <i class="iconfont icon-news3"></i>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="v1=!v1">
            <v-list-tile-action>
              <!-- <v-icon>question_answer</v-icon> -->
              <i class="iconfont icon-anniu" />
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ExKline from "@/components/ExKline";
export default {
  components: { ExKline },
  async asyncData({ store }) {
    await store.dispatch("initBars");
  },
  layout: "marketLayout",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      mini: true,
      right: null,
      v1: true,
      v2: true,
      infoWidth: 600,
      infoWidthMin: 600,
      infoWidthMax: 800,
      orderWidth: 300,
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    };
  },
  methods: {
    toggleWidth(e) {
      this.infoWidth =
        this.infoWidth == this.infoWidthMin
          ? this.infoWidthMax
          : this.infoWidthMin;
      // if (e.x) {
      //   // let x = window.innerWidth - e.x - 50;
      //   // this.infoWidth =
      //   //   x > this.infoWidthMax
      //   //     ? this.infoWidthMax
      //   //     : x < this.infoWidthMin
      //   //     ? this.infoWidthMin
      //   //     : x;

      // }
      // debugger;
    }
  }
};
</script>
<style >
.v-list__tile {
  padding: 16px 2px;
}
.container {
  padding: 0;
}
</style>
<style lang="stylus" scoped>
@require '~vuetify/src/stylus/settings/_colors';

.market {
  height: calc(100%);

  .dash {
    height: 100%;
    width: calc(100% - 46px);
    display: flex;

    .panel1 {
      width: calc(100%);
      height: calc(100%);
    }

    .panel3 {
      width: 400px;
      min-width: 400px;
      max-width: 400px;
      height: calc(100%);
      background-color: $blue.base;
      margin-left: 4px;
    }

    .panel2 {
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      height: calc(100%);
      background-color: $grey.base;
      margin-left: 4px;
    }
  }

  // .orderPanel {
  // height: calc(100%);
  // background-color: red;
  // margin-top: 100px;
  // }

  // .infoPanel {
  // height: calc(100%);
  // border-left: 2px solid grey;

  // // cursor: w-resize;
  // // cursor: pointer;
  // .infoPanel_region {
  // width: 100%;
  // height: calc(100%);
  // background-color: yellow;
  // cursor: default;
  // }
  // }
  .sideMenu {
    & i {
      font-size: 24px;
    }
  }
}
</style>

