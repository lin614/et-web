<template>
  <div class="order">
    <ul>
      <li>
        <span></span>
        <a @click="toTrade('et_usdt')">购买ET</a>
      </li>
      <li>
        <span>可用</span>
        <span @dblclick="dblclick">{{balance}} ET</span>
      </li>
      <li>
        <span>冻结</span>
        <span>{{freezeAmount}} ET</span>
      </li>
      <li>
        <v-text-field v-model="vol" label="数量"> </v-text-field>
      </li>
      <li>
        <v-slider v-model="vol" min="0" :max="balance" label="Duration" thumb-label></v-slider>
        <!-- <Slider
          @on-change="change"
          v-model="percent"
          :step="10"
          show-stops
          style="width:100%"
          :tip-format="tip"
        ></Slider> -->
      </li>
      <li>
        <v-btn class="btn" :color="sides === 1 ? 'success' : 'error'" :loading="loginLoading" @click="showModal=true">{{sides === 1 ? '看涨' : '看跌'}}</v-btn>
      </li>
    </ul>

    <v-dialog v-model="showModal" persistent max-width="600px" class="login">
      <v-card>
        <v-card-title>
          <span class="headline">下注确认</span>
        </v-card-title>

        <v-card-text>{{sides==1?'看涨':'看跌'}}：{{vol}} ET</v-card-text>
    
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="showModal = false">取消</v-btn>
          <v-btn color="blue darken-1" flat ref="loginBefore" :loading="loginLoading" @click="subOrder">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ax from "axios";
import cookie from "js-cookie";

export default {
  props: ["sides"],
  data() {
    return {
      vol: 0,
      percent: 10,
      time: false,
      sec: 0,
      showModal: false,
      balance: 0, //可用et
      freezeAmount: 0, //冻结et
      loginLoading: false
    };
  },
  methods: {
    dblclick() {
      this.vol = this.balance;
    },
    tip(val) {
      return `${val}% - ${val / 100 * this.balance} ET`;
    },
    change(val) {
      this.vol = val * 100;
    },
    getET() {
      let parms = {
        uid: cookie.get("uid", { domain: this.$store.state.api.domainName })
      };
      this.$store.dispatch('queryGuessSum', parms).then(res => {
        this.freezeAmount = parseInt(res.data.freezeAmount);
        this.balance = parseInt(res.data.balance);
      });
    },
    subOrder() {
      let vu = this;

      if (this.vol > this.balance) {
        alert("下注失败：余额不足！");
        return;
      }
      if (new Date().getHours() < 12) {
        alert("下注失败：请在12：00 - 24:00 下注！");
        return;
      }

      vu.time = true;
      vu.sec = 10;
      let timer = setInterval(() => {
        vu.sec--;

        if (vu.sec == 0) {
          clearInterval(timer);
          vu.time = false;
        }
      }, 1000);
      let parms = {
        amount: this.vol,
        sides: this.sides,
        uid: cookie.get("uid", { domain: this.$store.state.api.domainName })
      };
      this.loginLoading = true
      
      this.$store.dispatch('submitGuess', parms).then(res => {
        this.loginLoading = false
        if (res.meta.code == "0") {
          vu.$Message.success("下注成功");
          vu.freezeAmount = parseInt(res.data.freezeAmount);
          vu.balance = parseInt(res.data.balance);
          // bus.$emit("upInfo", res.data.data);
        } else {
          let code = res.meta.code;
          let msg = res.meta.message;
          msg = ["6", "7"].includes(code)
            ? "未登录！"
            : code == ""
            ? "超出投注时间范围！"
            : code == ""
            ? "投注数量"
            : "系统错误！";
          alert("下注错误:" + msg);
          if (["6", "7"].includes(code)) vu.$route.push("/login");
        }
      });
    }
  },
  created() {
    this.getET();
  },
  mounted() {
    let vu = this;
    // bus.$on("upInfo", () => {
    //   vu.getET();
    // });
  }
};
</script>
<style>
.ivu-input-number,
.ivu-btn {
  border-radius: 0px !important;
}
</style>

<style lang="less" scoped>
.order {
  width: 100%;
  padding: 0px 64px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    .btn {
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }
  .btn {
    width: 100%;
    line-height: 36px;
  }
}
</style>

