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
        <span>数量</span>
        <InputNumber
          :max="10000"
          :min="100"
          v-model="vol"
          style="width:300px;"
        ></InputNumber>
      </li>
      <li>
        <Slider
          @on-change="change"
          v-model="percent"
          :step="10"
          show-stops
          style="width:100%"
          :tip-format="tip"
        ></Slider>
      </li>
      <li>
        <Button
          :loading='time'
          @click="showModal=true"
          class="btn"
          :type="`${sides==1?'success':'error'}`"
          long
        >{{sides==1?'看涨':'看跌'}}<span v-if="time">({{sec}})</span></Button>

      </li>
    </ul>
    <Modal
      v-model="showModal"
      title="下注确认"
      @on-ok="subOrder"
    >
      <h3>{{sides==1?'看涨':'看跌'}}：{{vol}} ET</h3>
    </Modal>
  </div>
</template>
<script>
import ax from "axios";
import config from "../../config/config.js";
import cookie from "js-cookie";
ax.defaults.headers.post["X-EXCHAIN-PN"] = cookie.get("PN", {
  domain: config.url.domain
});
export default {
  props: ["sides"],
  data() {
    return {
      vol: 1000,
      percent: 10,
      time: false,
      sec: 0,
      showModal: false,
      balance: 0, //可用et
      freezeAmount: 0 //冻结et
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
      let vu = this;
      let parms = {
        uid: cookie.get("uid", { domain: config.url.domain })
      };
      ax.post(config.url.guess + "/api/guess/queryGuessSum", parms).then(
        res => {
          if (res.status == "200") {
            vu.freezeAmount = parseInt(res.data.data.freezeAmount);
            vu.balance = parseInt(res.data.data.balance);
          }
          // vu.time = false
        }
      );
    },
    subOrder() {
      let vu = this;

      if (this.vol > this.balance) {
        vu.$Message.error("下注失败：余额不足！");
        return;
      }
      if (new Date().getHours() < 12) {
        vu.$Message.error("下注失败：请在12：00 - 24:00 下注！");
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
        uid: cookie.get("uid", { domain: config.url.domain })
      };

      ax.post(config.url.guess + "/api/guess/submit", parms).then(res => {
        if (res.status == "200") {
          if (res.data.meta.code == "0") {
            vu.$Message.success("下注成功");
            vu.freezeAmount = parseInt(res.data.data.freezeAmount);
            vu.balance = parseInt(res.data.data.balance);
            bus.$emit("upInfo", res.data.data);
          } else {
            // vu.$Message.error(res.data.meta.message);
            let msg = ["6", "7"].includes(code)
              ? "未登录！"
              : code == ""
              ? "超出投注时间范围！"
              : code == ""
              ? "投注数量"
              : "系统错误！";
            vu.$Message.error("下注错误:" + msg);
            if (["6", "7"].includes(code)) vu.$route.push("/login");
          }
        }
      });
    }
  },
  created() {
    this.getET();
  },
  mounted() {
    let vu = this;
    bus.$on("upInfo", () => {
      vu.getET();
    });
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
}
</style>

