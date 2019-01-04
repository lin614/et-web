<template>
  <div class="btc-price">
    <div class="show">
        <v-hover>
          <v-card width="399" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
            <v-card-title>
              <div class="dash">
                <h3>BTC/USDT</h3>
                <span class="fr downColor">{{btcPrice}}</span>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>

        <v-hover>
          <v-card width="399" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
            <v-card-title>
              <div class="dash">
                <div class="item">
                  <h3>今日BTC价格</h3>
                  <span class="upColor">{{todayBtcPrice}}</span>
                </div>

                <div class="item">
                  <h3>昨日BTC价格</h3>
                  <span class="upColor">{{yesterdayBtcPrice}}</span>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>

        <v-hover>
          <v-card width="400" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
            <v-card-title>
              <div class="dash">
                <h3>涨跌幅</h3> <span :class="(todayBtcPrice - yesterdayBtcPrice) > 0 ? 'upColor fr' : 'downColor fr'">{{change}}</span>
              </div>
            </v-card-title>
          </v-card>
        </v-hover>
    </div>
  </div>
</template>
<script>
import cookie from "js-cookie";
export default {
  data() {
    return {
      channel: "huobi.market.btcusdt.kline.1day",
      btcPrice: 0
    };
  },
  props: ["todayBtcPrice", "yesterdayBtcPrice"],
  computed: {
    change() {
      let stPrice =
        new Date().getHours() >= 12
          ? this.todayBtcPrice
          : this.yesterdayBtcPrice;
      if (stPrice == 0) return '0%'
      let val = ((this.btcPrice - stPrice) / stPrice) * 100;
      if (!val) return "0 %";
      val = val.toFixed(2);
      return (val > 0 ? "+" : "") + val + "%";
    }
  },

  created() {
    this.getBtcPrice();
  },
  methods: {
    subQuo() {
      ws.postData({
        event: "sub",
        channel: this.channel
      });
    },
    getBtcPrice() {
      this.$store.dispatch('queryBTCPrice').then(res => {
        this.btcPrice = res.data;
      });
    }
  },

  mounted() {
    let vu = this;
    setInterval(() => {
      vu.getBtcPrice();
    }, 10000);
  }
};
</script>

<style lang="less" scoped>
.show {
  display: flex;
  width: 1200px;
  justify-content: space-between;

  .timq {
    width: 100%;
    height: 140px;
  }
}
.btc-price {
  width: 1200px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ivu-card-bordered {
    width: 33%;
  }
  .dash {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    align-items: center;
    h3 {
      font-size: 16px;
      font-weight: normal;
    }
    span {
      font-size: 20px;
      // color: #ff9c00;
    }
  }
  .upColor {
    color: #00c475;
  }
  .downColor {
    color: #e13737;
  }
}
.wap .btc-price {
  width: 100%;
}
</style>

