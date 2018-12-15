<template>
  <div class="show">
    <v-hover>
      <!-- <v-card :style="`background:url('${imgET}')`" width="399" height="100" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple> -->
      <v-card width="399" height="100" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
        <!-- <img :url="imgET" /> -->
        <v-card-title>
          <div>
            <h3 class="display-1"><i class="iconfont icon-btc" style="font-size:32px"></i>&nbsp&nbsp{{et.etBtc}}</h3>
            <div class="d-flex">
              <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.currentDay') }}</span>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-0">
            <i class="iconfont  icon-bitcoin-1"></i>
          </v-btn>
        </v-card-title>
        <div v-show="false">
          <div id='chartET' ref="chartET" style="height:100px" />
        </div>
      </v-card>
    </v-hover>
    <v-hover>
      <v-card color=" " width="399" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
        <!-- <img class="timq" src='../assets/images/timq/2.jpg' /> -->
        <v-card-title>
          <div>
            <h3 class="display-1">{{et.volAll}}</h3>
            <div class="d-flex">
              <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.etCirculation') }}</span>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-0">
            <i class="iconfont  icon-coin"></i>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-hover>
    <v-hover>
      <v-card color=" " width="400" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
        <!-- <img class="timq" src='../assets/images/timq/5.jpg' /> -->
        <v-card-title>
          <div>
            <h3 class="display-1">{{dayNum}}&nbsp&nbsp{{ $t('index.txSumary.freeUnit') }}</h3>
            <div class="d-flex">
              <span class="body-1 mt-2 grey--text">{{ $t('index.txSumary.freeTitle') }}</span>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-0">
            <i class="iconfont  icon-Time"></i>
          </v-btn>

        </v-card-title>
      </v-card>
    </v-hover>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import opt from "@/components/js/chartShowOption.js";
import std from "svg-to-dataurl";
export default {
  data() {
    return {
      imgET: null
    };
  },
  computed: {
    ...mapState(["et"]),
    ...mapGetters(["dayNum"])
  },

  mounted() {
    // var datas = [
    //   66.3,
    //   96.4,
    //   97.5,
    //   95.6,
    //   98.1,
    //   94.8,
    //   89.6,
    //   94.1,
    //   80.1,
    //   52.4,
    //   75.8,
    //   94.7
    // ];
    // opt.series[0].data = datas;
    // let chart = this.$echarts.init(this.$refs.chartET, null, {
    //   renderer: "svg"
    // });
    // chart.setOption(opt);
    // debugger;
    // // this.imgET = encodeURI(chart.getDataURL());
    // this.imgET = std(chart.getDataURL());
    // // this.imgET=await this.$html2canvas(this.$refs.chartET, {
    // //     type: 'dataURL'
    // //   });
    // debugger;
  }
};
</script>

<style lang="stylus" scoped>
.show {
  display: flex;
  justify-content: space-between;

  .timq {
    width: 100%;
    height: 140px;
  }
}
</style>