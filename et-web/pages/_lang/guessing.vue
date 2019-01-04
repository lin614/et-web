<template>
    <div class="page-guessing">
        <div class="banner">
            <div class="text"><img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/guesing_text.png"></div>
          </div>

          <div><pkprice :btcPrice="infos.btcPrice" :yesterdayBtcPrice="infos.yesterdayBtcPrice" :todayBtcPrice="infos.todayBtcPrice"></pkprice></div>

          <div class="main guessing">
            <ex-card class="white-paper">
              <span slot="title">今日竞猜情况<span class="sub-title">竞猜开放时间：每日的12:00 - 24:00</span></span>

              <div class="card-cnt">
                <v-layout wrap>
                    <v-flex xs3 class="btc-today">
                        <div class="item">
                          <span class="tit">当前ET奖池总量 </span>
                          <span class="val" style="color:black">{{infos.upET+infos.downET}} ET</span>
                        </div>

                        <div class="item">
                          <div>
                            <span class="tit">看涨人次 </span>
                            <span class="val upColor">{{infos.upUsersNum}} 人</span>
                          </div>
                          <div>
                            <span class="tit">看跌人次 </span>
                            <span class="val downColor">{{infos.downUsersNum}} 人</span>
                          </div>
                        </div>

                        <div class="item">
                          <div>
                            <span class="tit">看涨预期收益率 </span>
                            <span class="val upColor">{{infos.upET?((infos.downET/infos.upET)*100).toFixed(2):0}}% </span>
                          </div>
                          <div>
                            <span class="tit">看跌预期收益率 </span>
                            <span class="val downColor">{{infos.downET?((infos.upET/infos.downET)*100).toFixed(2):0}}%</span>
                          </div>
                        </div>

                        <div class="item">
                          <div>
                            <span class="tit">看涨竞猜金额 </span>
                            <span class="val upColor">{{infos.upET}} ET </span>
                          </div>
                          <div>
                            <span class="tit">看跌竞猜金额 </span>
                            <span class="val downColor">{{infos.downET}} ET </span>
                          </div>
                        </div>
                    </v-flex>

                    <v-flex xs5>
                        <pkchart v-bind:v1="infos.upET" v-bind:v2="infos.downET"></pkchart>
                    </v-flex>

                    <v-flex xs4>
                        <pkrank></pkrank>
                    </v-flex>
                </v-layout>
              </div>
            </ex-card>
          </div>

          <ex-card class="main white-paper">
            <span slot="title">竞猜下注</span>

            <div class="card-cnt">
              <v-layout wrap>
                <v-flex xs6>
                  <!-- <pkorder :sides="1"></pkorder> -->
                </v-flex>

                <v-flex xs6>
                  <!-- <pkorder :sides="-1"></pkorder> -->
                </v-flex>
              </v-layout>
            </div>
          </ex-card>
          <!-- <div>
            <ExCard slot="inner">
              <span
                slot="title"
              >我的竞猜 </span>
              <router-link
                class="more"
                slot="more"
                target="_blank"
                to="/guessdetail"
              >查看更多 >></router-link>
              <pklist></pklist>
            </ExCard>
          </div>
          <div>
            <ExCard slot="inner">
              <span slot="title">投注ET规则 </span>
              <div class="btc-rule">

                <ol>
                  <li>1、投注：平台默认单次最低投注数量100ET,单次最高投注数量10000ET</li>
                  <li>2、输赢规则：若中奖，返还投注本金，并按赢方本金占比去分取输方的所有投注ET；
                    若未中奖，失去所有投注本金；平台不收取任何费用</li>
                  <li>3、如何计算：每局以每天中午12点BTC价格对比第二天中午12点BTC价格计算涨／跌。</li>
                  <li>4、竞猜开放时间：用户可在每天中午12点至晚上24点进行投注，竞猜当天中午12点至第二天中午12点的BTC价格涨跌。</li>
                  <li>5、平台奖励发放：每日的18:00前发放上一日投注结果的奖励</li>
                  <li>6、用于投注的ET，将从充提账户ET余额中的扣除，如ET资产存放在币币账户中，需将ET划转至充提账户。</li>
                </ol>
              </div>
            </ExCard>
          </div>
          <div>
            <ExCard slot="inner">
              <span slot="title">获得ET的方法 </span>
              <div class="btc-rule">

                <h3>通过 “交易即挖矿” 获得ET</h3>
                <ol>
                  <li>
                    1、只要产生交易，即可按交易额占比100% 返还ET的方式获取

                  </li>
                  <li>2、通过“合作伙伴”模式，邀请好友注册并交易的方式获取</li>
                </ol>
                <br />
                <h3>交易购买ET</h3>
                <ol>
                  <li>
                    1、通过币币交易的形式，购买并持有ET
                  </li>
                </ol>
              </div>
            </ExCard>
          </div> -->
        </div>
    </div>
</template>

<script>
import ExCard from '@/components/ExCard'
import pkchart from "@/components/guessing/pkchart";
// import pkorder from "@/components/guessing/pkorder";
// import pklist from "@/components/guessing/pklist";
import pkprice from "@/components/guessing/pkprice";
import pkrank from "@/components/guessing/pkrank";
export default {
  components: { pkprice, ExCard, pkchart, pkrank}, //ExCard, , pkorder, pklist, pkprice, pkrank },
  data() {
    return {
      infos: {
        upET: 0,
        upUsersNum: 0,
        downET: 0,
        downUsersNum: 0,
        todayBtcPrice: 0,
        yesterdayBtcPrice: 0
      }
    };
  },
  methods: {
    upInfo(info) {
      let vu = this;
      vu.infos.upET = info.upET;
      vu.infos.upUsersNum = info.upUsersNum;
      vu.infos.downET = info.downET;
      vu.infos.downUsersNum = info.downUsersNum;
      vu.infos.todayBtcPrice = info.todayBtcPrice;
      vu.infos.yesterdayBtcPrice = info.yesterdayBtcPrice;
    },

    getGuessInfo() {
      let vu = this;
      this.$store.dispatch('queryGuessInfo').then(res => {
        this.upInfo(res.data);
      });
    }
  },
  created() {
    this.getGuessInfo();
  },
  mounted() {
    var vu = this;
    // bus.$on("upInfo", info => {
    //   this.upInfo(info);
    // })
      setInterval(() => {
        vu.getGuessInfo();
      }, 10000);
  }
}
</script>

<style lang="less">
@import url(../../assets/style/config.less);
.banner {
  height: 380px;
  width: 100%;
  background-image: url(https://d3bcj1iwrh8aaw.cloudfront.net/imgs/gussing_bg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  .text {
    width: 1200px;
    margin: 0 auto;
    padding-top: 90px;
    img {
      height: 190px;
      //   margin-top:100px;
    }
  }
}



.guessing {
  margin-top: 16px;
  //   padding-bottom: 32px;
  .sub-title {
    font-size: 14px;
    margin-left: 32px;
    color: blueviolet;
  }
}
.btc-today {
  padding-bottom: 16px;
  .item {
    // border-bottom: 1px solid lightgray;

    padding-top: 16px;
    padding-left: 32px;
    .tit {
      line-height: 28px;
      font-size: 14px;
    }
    .val {
      font-size: 20px;
      //   color: orange;
    }
  }
}

.btc-rule {
  padding: 32px;
  li {
    line-height: 40px;
  }
}
.more {
  font-size: 14px;
  color: blueviolet;
}
.upColor {
  color: #00c475;
}
.downColor {
  color: #e13737;
}
</style>