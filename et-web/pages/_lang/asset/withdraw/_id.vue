<template>
  <div class="main">
    <ex-card class="page-asset">
      <span slot="title">{{ $t('userCenter.asset.transfer.withdraw') }}</span>
      <div class="main-cnt">
        <v-flex xs12 class="side">
          <v-select :items="tokenList" item-text="token" item-value="token" v-model="token" :label="$t('userCenter.asset.recharge.form.coin')"></v-select>
        </v-flex>

        <div v-if="token !== ''" class="encharge-main">
          <v-form class="form" ref="form">
            <v-flex xs12>
              <v-text-field v-model="destAddr" :label="$t('userCenter.withdrawBox.title')" :error-messages="destAddrErrors" @input="$v.destAddr.$touch()" @blur="$v.destAddr.$touch()" required></v-text-field>
            </v-flex>

            <v-flex xs12 class="pr">
              <v-text-field v-model="amount" :label="$t('userCenter.withdrawBox.amount')" :error-messages="amountErrors" @input="$v.amount.$touch()" @blur="$v.amount.$touch()" required>
                
              </v-text-field>
              <span class="available-amount">{{ $t('userCenter.withdrawBox.balance') }} {{selectdTokenObj.account_available}} {{selectdTokenObj.token}}</span>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="selectdTokenObj.withdraw_fee" :label="$t('userCenter.withdrawBox.fees')" disabled></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="actualAmount" :label="$t('userCenter.withdrawBox.receiveAmount')" required disabled></v-text-field>
            </v-flex>

            <div class="tip-intro">
              <p class="friendly-notice-title">{{ $t('userCenter.withdrawBox.tip') }}</p>
              <li class="friendly-notice-item">{{$t('errorMsg.DECIMAL_LIMIT')}} {{selectdTokenObj.decimal}} {{$t('errorMsg.DECIMAL_UNIT')}}</li>
              <li class="friendly-notice-item">{{ $t('userCenter.withdrawBox.tipP1') }} : {{selectdTokenObj.withdraw_min}} {{selectdTokenObj.token}}</li>
              <li class="friendly-notice-item">{{ $t('userCenter.withdrawBox.tipP2') }} : {{selectdTokenObj.withdraw_max}} {{selectdTokenObj.token}}</li>
            </div>

            <v-btn color="blue darken-1" @click="openSecurityModal">{{ $t('userCenter.withdrawBox.withdraw') }}</v-btn>
          </v-form>

          <v-dialog v-model="securityModalShow" persistent max-width="600px" class="transfer-modal">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('userCenter.asset.withdrawModal.title') }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-form class="form" ref="securityModal">
                      <v-flex xs12>
                        <v-text-field v-model="phone" :label="$t('userCenter.asset.withdrawModal.phone')" disabled> </v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <div class="email-code-wrap clearfix">
                          <v-text-field class="fl" v-model="phoneCode" :label="$t('userCenter.asset.withdrawModal.phoneCode')" :error-messages="phoneCodeErrors" @input="$v.phoneCode.$touch()" @blur="$v.phoneCode.$touch()" required> </v-text-field>
                          <v-btn class="fr" color="info" :loading="phoneCodeLoading" :disabled="phoneCodeTimer !== 0" @click="sendPhoneCode">{{phoneCodeDownText}}</v-btn>
                        </div>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field v-model="email" :label="$t('userCenter.asset.withdrawModal.email')" disabled> </v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <div class="email-code-wrap clearfix">
                          <v-text-field class="fl" v-model="emailCode" :label="$t('userCenter.asset.withdrawModal.emailCode')" :error-messages="emailCodeErrors" @input="$v.emailCode.$touch()" @blur="$v.emailCode.$touch()" required> </v-text-field>
                          <v-btn class="fr" color="info" :loading="emailCodeLoading" :disabled="emailCodeTimer !== 0" @click="sendEmailCode">{{emailCodeDownText}}</v-btn>
                        </div>
                      </v-flex>

                    </v-form>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat>{{ $t('common.cancel') }}</v-btn>
                <v-btn color="blue darken-1" flat :loading="transferLoading" :disabled="transferLoading" @click="transfer">{{ $t('common.confirm') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </ex-card>
  </div>
</template>
<script>
import ExCard from "@/components/ExCard";
import ClipboardJS from 'clipboard';
import NP from 'number-precision';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  components: { ExCard },

  mixins: [validationMixin],

  validations: {
    destAddr: {required},
    amount: {required},
    phoneCode: {},
    emailCode: {}
  },

  data() {
    return {
      token: '',
      destAddr: '',
      amount: '',
      fee: '',
      actualAmount: '',
      tokenList: [],
      recharge_min: '',
      selectdTokenObj: {
        decimal: '',
        withdraw_fee: '',
      },
      phone: '',
      email: '',
      phoneCode: '',
      emailCode: '',
      securityModalShow: false,
      phoneCodeLoading: false,
      phoneToken: '',
      emailToken: '',
      phoneCodeLoading: false,
      emailCodeLoading: false,
      emailCodeTimer: 0,
      emailCodeDownText: this.$t('register.sendCode'),
      phoneCodeTimer: 0,
      phoneCodeDownText: this.$t('register.sendCode'),
      transferLoading: false,
      idCardStatus: '',
    }
  },

  computed: {
    destAddrErrors () {
      const errors = []
      if (!this.$v.destAddr.$dirty) return errors
      !this.$v.destAddr.required && errors.push(this.$t('errorMsg.ADDR_BLANK'))
      if (this.destAddr.length > 100) {
        errors.push(this.$t('errorMsg.ADDR_LIMIT'))
      }
      return errors
    },
    amountErrors () {
      const errors = []
      if (!this.$v.amount.$dirty) return errors
      !this.$v.amount.required && errors.push(this.$t('errorMsg.AMOUNT_BLANK'))

      let decimal = this.selectdTokenObj.decimal
      let reg = RegExp('^[0-9]{0,8}(\\.[0-9]{0,' + decimal + '})?$');
      if (!/^\d+(\.\d+)?$/.test(this.amount)) {
        errors.push(this.$t('errorMsg.FORMATTING_INCORRECT'))
      } else if (parseFloat(this.amount) > parseFloat(this.selectdTokenObj.withdraw_max)) {
        errors.push(this.$t('errorMsg.AMOUNT_LESS_MAX_WITHDRAW'))
      } else if (parseFloat(this.amount) < parseFloat(this.selectdTokenObj.withdraw_min)) {
        errors.push(this.$t('errorMsg.AMOUNT_LESS_MIN_WITHDRAW'))
      } else if (!reg.test(this.amount)) {
        errors.push(this.$t('errorMsg.DECIMAL_LIMIT') + decimal + this.$t('errorMsg.DECIMAL_UNIT'))
      } else if (parseFloat(this.amount) > parseFloat(this.selectdTokenObj.account_available)) {
        errors.push(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
      } else if (parseFloat(this.amount) < parseFloat(this.fee)) {
        errors.push(this.$t('errorMsg.AMOUNT_LESS_FEE'))
      }
      return errors
    },
    phoneCodeErrors () {
      const errors = []
      if (!this.$v.phoneCode.$dirty) return errors
      if (this.phoneCode === '') {
        errors.push(this.$t('errorMsg.PHONE_CODE_BLANK'))
      } else if (this.phoneCode.length > 20) {
        errors.push(this.$t('errorMsg.PHONE_CODE_LIMIT_LENGTH'))
      }
      return errors
    },
    emailCodeErrors () {
      const errors = []
      if (!this.$v.emailCode.$dirty) return errors
      if (this.emailCode === '') {
        errors.push(this.$t('errorMsg.EMAIL_CODE_BLANK'))
      } else if (this.emailCode.length > 20) {
        errors.push(this.$t('errorMsg.EMAIL_CODE_LIMIT_LENGTH'))
      }
      return errors
    }
  },

  watch: {
    token() {
      let selectdTokenObj = this.tokenList.filter(item => {
        return item.token === this.token
      })
      this.selectdTokenObj = selectdTokenObj[0]
    },
    amount() {
      if (!isNaN(this.amount)) {
        let actualAmount = NP.minus(parseFloat(this.amount), parseFloat(this.selectdTokenObj.withdraw_fee))
        this.actualAmount = (!isNaN(actualAmount) && actualAmount > 0) ? actualAmount : ''
      }
    }
    
  },
  
  mounted() {
    this.getUserInfo();
    this.getAssetsList();
  },

  methods: {
    transfer () {
      this.$v.phoneCode.$touch()
      this.$v.emailCode.$touch()
      if (!this.$v.phoneCode.$error && !this.$v.emailCode.$error) {
        this.securityModalLoading = true
        let params = {
          type: this.token,
          outer_address: this.destAddr,
          balance: this.amount,
          emailCode: this.emailCode,
          emailToken: this.emailToken,
          phoneCode: this.phoneCode,
          phoneToken: this.phoneToken,
          language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'
        }
        this.$store.dispatch('withdraw', params).then(res => {
          if (res.errorCode == 0) {
            this.securityModalShow = false
            this.securityModalLoading = false
            this.$v.$reset()
            alert(this.$t('errorMsg.WITHDRAW_REQ_SUBMIT'))
          } else if (res.errorCode == 219) {
            apiError(this, res);
            this.$router.push('/usercenter/kyc')
          } else {
            this.securityModalLoading = false
            apiError(this, res);
          }
        })
      }
    },
    getUserInfo () {
      let userInfo = JSON.parse(sessionStorage.userInfo)
      this.idCardStatus = userInfo.idCardStatus
      this.email = userInfo.email
      this.phone = userInfo.phone.number
    },
    showQrCode (e) {
      e.stopPropagation()
      this.qrCodeShow = true
    },
    /**
     * 获取我的资产列表
     */
    getAssetsList() {
      this.$store.dispatch('getAssetsList2', {}).then(res => {
          this.tokenList = res.result
          if(this.$route.params.id) {
            this.token = this.$route.params.id
          }
      })
    },
    /**
     * 打开安全验证模态框
     */
    openSecurityModal () {
      this.$v.$reset()
      // this.$v.destAddr.$touch()
      // this.$v.amount.$touch()
      // if (!this.$v.destAddr.$error && !this.$v.amount.$error) {
      //   // 验证是否kyc
      //   if (this.idCardStatus === '0') {
      //     alert(this.$t(`ApiError.219`));
      //     this.$router.push('/usercenter/kyc')
      //     return;
      //   } else if (this.idCardStatus === '1') {
      //     alert(this.$t(`ApiError.218`));
      //     return;
      //   } else if (this.idCardStatus === '3') {
      //     alert(this.$t(`ApiError.218`));
      //     this.$router.push('/usercenter/kyc')
      //     return;
      //   } 

      //   // 验证是否绑定手机号
      //   if (this.phone === '') {
      //     alert(this.$t(`ApiError.711`));
      //     this.$router.push('/usercenter/bind');
      //     return;
      //   }
      //   // 验证是否绑定邮箱
      //   if (this.email === '') {
      //     alert(this.$t(`ApiError.tmp711`));
      //     this.$router.push('/usercenter/bindEmail');
      //     return;
      //   }
      //   this.securityModalShow = true;
      // }
    },
    /**
     * 发送短信验证码
     */
    sendPhoneCode () {
      this.phoneCodeLoading = true

      let params = {language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'}

      this.$store.dispatch('getPhoneCode', params).then(res => {
        if (res.errorCode == 0) {
          this.phoneToken = res.result
          alert(this.$t('errorMsg.PHONE_SEND_SUCC'))
          this.handleCodeDown('phoneCodeTimer', 'phoneCodeDownText');
        } else if (res.errorCode == 711) {
          apiError(this, res);
          this.$router.push('/usercenter/bind')
        } else {
          apiError(this, res);
        }
        this.phoneCodeLoading = false
      })
    },

    /**
     * 发送邮件验证码
     */
    sendEmailCode () {
      this.emailCodeLoading = true

      let params = {language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'}

      this.$store.dispatch('getEmailCode', params).then(res => {
        if (res.errorCode == 0) {
          this.emailToken = res.result
          alert(this.$t('errorMsg.EMAIL_SEND_SUCC'))
          this.handleCodeDown('emailCodeTimer', 'emailCodeDownText');
        } else if (res.errorCode == 711) {
          apiError(this, res);
          this.$router.push('/usercenter/bind')
        } else {
          apiError(this, res);
        }
        this.emailCodeLoading = false
      })
    },
    /**
     * 倒计时
     */
    handleCodeDown (timer, btnText) {
      var time = 60
      this[btnText] = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this[timer])
      this[timer] = setInterval(() => {
        time -= 1
        this[btnText] = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
        if (time <= 0) {
          this[btnText] = this.$t('register.sendCode')
          clearInterval(this[timer])
          this[timer] = 0
        }
        
      }, 1000)
    },
  }
};
</script>
<style lang="stylus" scoped>
.main {
  padding-top: 20px;
  min-height: 800px;
}
.tip-intro {
  margin-bottom 10px;
}
.available-amount {
  position: absolute;
  bottom: 25px;
  right: 0;
}
</style>

