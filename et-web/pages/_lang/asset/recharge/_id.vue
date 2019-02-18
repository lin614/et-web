<template>
  <div class="main">
    <ex-card class="page-asset">
      <span slot="title">{{ $t('userCenter.asset.transfer.deposit') }}</span>
      <div class="main-cnt">
        <v-flex xs12 class="side">
          <v-select :items="tokenList" item-text="token" item-value="token" v-model="token" :label="$t('userCenter.asset.recharge.form.coin')"></v-select>
        </v-flex>

        <div v-if="show === 1" class="encharge-main">
          <div>{{ $t('userCenter.depositBox.title') }}</div>
          <div class="addr-box clearfix">
            <div class="fl">
              <span class="addr-main">{{addr}}</span>
            </div>
            <div class="fl">
              <input type="hidden" v-model="addr" id="addr">

              <a class="copy-addr"  :data-clipboard-text="addr" @click="handleCopy">{{ $t('userCenter.depositBox.copy') }}</a>

              <div class="qrcode">
                <span class="highlight" @click="showQrCode">{{ $t('userCenter.depositBox.qrCode') }}</span>
                <div class="qrcode-img-wrap" v-if="qrCodeShow">
                  <img class="qrcode-img" :src="'data:image/png;base64,' + qrCode" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="friendly-notice">
            <p class="friendly-notice-title">{{ $t('userCenter.depositBox.tip') }}</p>
            <li class="friendly-notice-item">{{ $t('userCenter.depositBox.tipP1') }} {{token}} {{ $t('userCenter.depositBox.tipP2') }}</li>
            <li class="friendly-notice-item">{{ $t('userCenter.depositBox.tipP3') }} {{recharge_min}} {{token}}</li>
          </div>
        </div>
        <div v-if="show === 0" class="no-encharge">{{$t('errorMsg.NO_AVAILABLE_ENCHARGE_ADDR')}}</div>
      </div>
    </ex-card>
  </div>
</template>
<script>
import ExCard from "@/components/ExCard";
import ClipboardJS from 'clipboard'

export default {
  components: { ExCard },
  data() {
    return {
      token: '',
      show: -1,
      qrCodeShow: false,
      tokenList: [],
      recharge_min: '',
    }
  },

  watch: {
    token() {
      this.getAddress()
    }
  },
  
  mounted() {
    this.getAssetsList();
    this.initEvent();
    if(this.$route.params.id) {
      this.token = this.$route.params.id
    }
  },

  methods: {
    initEvent () {
      addEventListener('click', () => {
        this.qrCodeShow = false
      })
    },
    showQrCode (e) {
      e.stopPropagation()
      this.qrCodeShow = true
    },
    /**
     * 获取我的资产列表
     */
    getAssetsList() {
      var vu = this
      this.$store.dispatch('getAssetsList2', {}).then(res => {
          this.tokenList = res.result
      })
    },
    /**
     * 获取充值地址和二维码
     */
    getAddress () {
      this.$store.dispatch('getAddress', {token: this.token}).then(res => {
        if (res.errorCode == 0) {
          this.addr = res.result.address
          this.qrCode = res.result.qrcode
          this.show = 1
          this.selectdTokenObj = this.tokenList.filter(item => {
            return item.token === this.token
          })
          this.recharge_min = this.selectdTokenObj[0].recharge_min
        } else {
          this.show = 0
          apiError(this, res);
        }
      })
    },
    /**
     * 复制
     */
    handleCopy () {
      var clipboard = new ClipboardJS('.copy-addr')
      clipboard.on('success', e => {
        alert(this.$t('errorMsg.COPY_SUCCESS'))
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        alert(this.$t('errorMsg.BROWSER_COPY_LIMIT'))
        clipboard.destroy()
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.main {
  padding-top: 20px;
  min-height: 800px;
}
.copy-addr {
  margin: 0px 10px;
}
.qrcode {
  position: relative;
  display: inline-block;
  .qrcode-img-wrap {
    &:after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      border: 5px solid #fff;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right\-color: transparent;
      top: -10px;
      left: 50%;
      margin-left: -5px;
    }
    position: absolute;
    top: 30px;
    left: 50%;
    margin-left: -55px;
  }
}
</style>

