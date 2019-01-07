<template>
  <div class="market">
    <div class="dash">
      <div class="regionMain">
        <ex-kline />
      </div>
      <div class="region1 " v-if="region1.status!=0">

        <component :is="region1.menu.component"></component>
      </div>
      <div class="region2 " :class="`${region2.status==2?'wideWidth':''}`" v-if="region2.status!=0">
        {{region2.status}}
        {{region2.menu.component}}
        <component :is="region2.menu.component"></component>
      </div>
    </div>
    <v-navigation-drawer mini-variant :mini-variant-width="50" right hide-overlay stateless absolute fixed permanent>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0 sideMenu">
          <v-list-tile v-for="menu in menu2s" :key="menu.id" @click="showMenu2(menu)" ripple>
            <v-list-tile-action>
              <v-tooltip left>

                <i class="iconfont" :class="menu.icon" :style="{fontSize:`${menu.size}px`}" slot="activator"></i>
                <span>{{menu.tip}}</span>
              </v-tooltip>
            </v-list-tile-action>

          </v-list-tile>
          <hr style="opacity:0.2" />
          <v-list-tile v-for="menu in menu1s" :key="menu.id" @click="showMenu1(menu)" ripple>
            <v-list-tile-action>
              <v-tooltip left>

                <i class="iconfont" :class="menu.icon" :style="{fontSize:`${menu.size}px`}" slot="activator"></i>
                <span>{{menu.tip}}</span>
              </v-tooltip>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ExKline from "@/components/ExKline";
import PairListMenu from "@/components/MarketMenus/PairListMenu";
export default {
  components: { ExKline, PairListMenu },
  async asyncData({ store }) {
    await store.dispatch("initBars");
  },
  layout: "marketLayout",
  data() {
    return {
      menu2s: [
        {
          id: "1",
          icon: "icon-order",
          size: "28",
          tip: "交易对",
          component: PairListMenu
        },
        {
          id: "2",
          icon: "icon-icon_Entrust",
          size: "30",
          tip: "委托管理"
        },
        {
          id: "3",
          icon: "icon-dashboard",
          size: "28",
          tip: "币价分析"
        },
        {
          id: "4",
          icon: "icon-news2",
          tip: "信息披露",
          size: "24"
        },
        {
          id: "5",
          icon: "icon-money",
          size: "28",
          tip: "我的资产"
        }
      ],
      menu1s: [
        {
          id: "6",
          icon: "icon-dom",
          tip: "DOM 订单",
          size: "24",
          region: 1
        }
      ],
      region2: {
        status: 1, //0，隐藏,1,正常,2,更宽,
        menu: null
      },
      region1: {
        status: 0, //0，隐藏,1,正常
        menu: null
      }
    };
  },
  methods: {
    showMenu2(menu) {
      let region = this.region2;
      region.status =
        region.menu && region.menu.id != menu.id ? 1 : (region.status + 1) % 3;
      region.menu = menu;
    },
    showMenu1(menu) {
      let region = this.region1;
      region.status =
        region.menu && region.menu.id != menu.id ? 1 : (region.status + 1) % 2;
      region.menu = menu;
    },
    toggleWidth(e) {
      this.infoWidth =
        this.infoWidth == this.infoWidthMin
          ? this.infoWidthMax
          : this.infoWidthMin;
    }
  },
  created() {
    this.region2.menu = this.menu2s[0];
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

    .regionMain {
      width: calc(100%);
      height: calc(100%);
    }

    .region2 {
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      height: calc(100%);
      background-color: $blue.base;
      margin-left: 4px;
    }

    .wideWidth {
      width: 450px !important;
      min-width: 450px !important;
      max-width: 450px !important;
    }

    .region1 {
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      height: calc(100%);
      background-color: $grey.base;
      margin-left: 4px;
    }
  }
}
</style>

