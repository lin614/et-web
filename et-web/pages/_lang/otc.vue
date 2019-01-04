<template>
  <div>
    <div class="main">
      <ex-card class="progress">
        <span slot="title">USDT法币充值</span>

        <div class="card-cnt">
            <div class="team">
                <div class="block">
                    <div class="flag">
                        <h3>加商家</h3>
                    </div>
                </div>
                <div class="block">
                    <div class="flag">
                        <h3> 查价格</h3>
                    </div>
                </div>
                <div class="block">
                    <div class="flag">
                        <h3>付款</h3>
                    </div>
                </div>
                <div class="block">
                    <div class="flag">
                        <h3>发账号</h3>
                    </div>
                </div>
                <div class="block">
                    <div class="flag">
                        <h3> 查到账</h3>
                    </div>
                </div>
            </div>

            <div class="team">
                <div class="block">
                    <div class="circ ">
                        <div class="item ">扫描二维码<br />添加商家微信</div>
                    </div>
                </div>
                <div class="block">
                    <div class="circ">
                        <div class="item ">发送"USDT"<br />获取当前价格</div>
                    </div>
                </div>
                <div class="block">
                    <div class="circ">
                        <div class="item ">转账购买金额<br />(如:1000CNY)</div>
                    </div>
                </div>
                <div class="block">
                    <div class="circ">
                        <div class="item ">发送交易所账号<br />(如:***@qq.com)</div>
                    </div>
                </div>
                <div class="block">
                    <div class="item ">商家放币后<br />确认账户到账</div>
                </div>
            </div>
        </div>
      </ex-card>

      <ex-card class="otc-warn-tip">
        <span slot="title">认证商家（充值时间：GMT+8 10:00 —— 17:00）</span>

        <div class="card-cnt">
            <v-layout wrap>
                <v-flex xs4>
                    <img class="wx1" src="../../assets/images/wx-customer-service.png"/>
                </v-flex>
                <v-flex xs8>
                    <div class="desc">
                        <h3>说明: </h3>
                        <p>1、当前平台仅支持法币购买USDT，周末及法定假日无法充值<br />
                            2、如果遇到充值不到账的情况，请联系客服，客服微信: Exchain5<br />
                            3、请勿在非充值时间内付款，否则无法充值到账<br />
                            4、单笔限额不得小于50CNY，否则无法充值到账<br />
                            5、请勿在转账时添加任何备注
                        </p>
                    </div>
                </v-flex>
            </v-layout>
        </div>
      </ex-card>
    </div>
  </div>
</template>
<script>
  import ExCard from '@/components/ExCard'
import ExBanner from "@/components/ExBanner";
import ExShow from "@/components/ExShow";
import ExPairs from "@/components/ExPairs/ExPairs";
export default {
  components: { ExBanner, ExCard, ExShow, ExPairs },
  data() {
    var vu = this;
    return {
      // aa: setInterval(() => {
      //   this.$store.commit('setTime')
      // })
    };
  },
  mounted() {},
  async asyncData({ store }) {
    await store.dispatch("initPairs");
    await store.dispatch("initPrices");
    await store.dispatch("upEt");
  }
};
</script>
<style lang="less" scoped>
.main {
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  min-height: 800px;
}
.progress {
    .card-cnt {
        padding: 20px;
    }
    .team {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .block {
      min-width: 220px;
      max-width: 220px;
      margin-bottom: 32px;
    }

    .flag {
      width: 100px;
      height: 50px;
      background-image: url(../../assets/images/flag.png);
      background-position: left;
      background-size: 100%;
      background-repeat: no-repeat;
      text-align: center;
      padding-top: 10px;
      margin-bottom: -16px;
      margin-left: 15px;
      color: #fff;
    }

    .circ {
      width: 100%;
      background-image: url(../../assets/images/line2.png);
      background-position: 100px;
      background-size: 100px;
      background-repeat: no-repeat;
    }

    .item {
      width: 130px;
      height: 130px;
      padding: 10px;
      //   background-color: #2fa7fe;
      background-color: #2fa7fe;
      border-radius: 50%;
      color: white;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
.otc-warn-tip {
    .card-cnt {
        padding: 20px;
        .wx1 {
            width: 190px;
            height: 250px;
        }
        .desc {
            padding: 0px 50px;
        }
    }
}
</style>


