
<template>
  <v-dialog v-model="dialog" persistent max-width="600px" class="login">
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('reset.title') }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form class="form" ref="form">
              <v-flex xs12>
                <v-text-field v-model="email" :label="$t('register.email')" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <div class="email-code-wrap clearfix">
                  <v-text-field class="fl" v-model="emailcode" :label="$t('register.emailcode')" :error-messages="emailcodeErrors" @input="$v.emailcode.$touch()" @blur="$v.emailcode.$touch()" :placeholder="$t('register.pleaseIptEmailCode')" required> </v-text-field>
                  <v-btn class="fr" color="info" :loading="sendCodeLoading" ref="sendEmail">{{codeDownText}}</v-btn>
                </div>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="pwd" type="password" :label="$t('register.pwd')" :error-messages="pwdErrors" @input="$v.pwd.$touch()" @blur="$v.pwd.$touch()" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="pwd2" type="password" :label="$t('register.pwd2')" :error-messages="pwd2Errors" @input="$v.pwd2.$touch()" @blur="$v.pwd2.$touch()" required> </v-text-field>
              </v-flex>
              
              <v-flex xs12>{{ $t('reset.toLogin') }} <span class="highlight pointer" @click="toLogin">{{ $t('reset.login') }}</span></v-flex>

            </v-form>
          </v-layout>
        </v-container>

        
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="setDialog">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="blue darken-1" flat ref="reset" :loading="resetLoading">{{ $t('reset.resetBtn') }}</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

</template>

<script>
  import md5 from 'crypto-md5'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import {validateEmail, validatePassword, validateEmailCode} from '@/utils/validate'

export default {
  name: 'ExdialogReset',

  props: ['dialog'],

  mixins: [validationMixin],

  validations: {
    email: {required, email},
    emailcode: {required},
    pwd: {required},
    pwd2: {required},
    protocol: {}
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t('errorMsg.EMAIL_BLANK'));
      !this.$v.email.email && errors.push(this.$t('errorMsg.EMAIL_ERR'));
      return errors;
    },

    emailcodeErrors() {
      const errors = [];
      if (!this.$v.emailcode.$dirty) return errors;
      !this.$v.emailcode.required && errors.push(this.$t('errorMsg.EMAIL_CODE_BLANK'));
      this.emailcode.length > 20 && errors.push(this.$t('errorMsg.EMAIL_CODE_LIMIT_LENGTH'));
      !validateEmailCode(this.emailcode) && errors.push(this.$t('errorMsg.SYMBOL_ERR'))
      return errors;
    },

    pwdErrors() {
      const errors = [];
      if (!this.$v.pwd.$dirty) return errors;
      !this.$v.pwd.required && errors.push(this.$t('errorMsg.PWD_BLANK'));
      !validatePassword(this.pwd) && errors.push(this.$t('errorMsg.PWD_LIMIT'));
      return errors;
    },

    pwd2Errors() {
      const errors = [];
      if (!this.$v.pwd2.$dirty) return errors;
      !this.$v.pwd2.required && errors.push(this.$t('errorMsg.PWD2_BLANK'));
      !validatePassword(this.pwd2) && errors.push(this.$t('errorMsg.PWD_LIMIT'));
      this.pwd !== this.pwd2 && errors.push(this.$t('errorMsg.DIFFERENT_PASSWORD_IPT'));
      return errors;
    },
  },

  data() {
    return {
      email: '',
      emailcode: '',
      pwd: '',
      pwd2: '',

      resettoken: '',
      gtserver: '',
      resetLoading: false,
      
      codeDownText: this.$t('register.sendCode'),

      geettestFlag: '',

      codeDown: false,
      timer: null,
      sendCodeLoading: false,
    }
  },

  watch: {
    lang() {
      this.codeDownText = this.$t('register.sendCode')
    }
  },
  
  methods: {
    setDialog() {
      this.$emit('setDialog', {loginDialog: false, resetDialog: false});
    },
    toLogin() {
      this.$emit('setDialog', {loginDialog: true, resetDialog: false});
    },
    /**
     * 获取极验验证码相关数据
     */
    getGeetestData() {
      let params = {type: this.$t('common.lang') === 'cn' ? 'dk-reset' : 'dk-reset-en'};

      this.$store.dispatch('initCaptcha', params).then(res => {
        this.initSenseAction(res);
      })
    },
    /**
     * 唤起验证码（发送邮件）
     */
    sendemailBefore() {
      this.$v.email.$touch()
      if (this.$v.email.$error || this.sendCodeLoading) {
        return
      }

      this.sendCodeLoading = true
      this.geettestFlag = 'SEND_EMAIL_CODEA';
      this.sense.sense();
    },

    /**
     * 发送邮件（重置）
     * @param {object} params 入参
     */
    sendEmail (params) {
      let lang = this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'
      let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-reset' : 'dk-reset-en';

      params.email = this.email;
      params.language = lang;
      params.captcha_type = captcha_type;
      
      this.sendCodeLoading = true

      this.$store.dispatch('resetPassword', params).then(res => {
        this.sendCodeLoading = false

        if (res.errorCode == 0) {
          this.resettoken = res.result.token
          alert(this.$t('errorMsg.EMAIL_SEND_SUCC'));
          this.handleCodeDown();
        }
      })
      .catch((err) => {
        this.sendCodeLoading = false
        apiReqError(this, err);
      });
    },

    /**
     * 唤起验证码（重置）
     */
    resSetPwd() {
      this.$v.$touch()
      if (this.$v.$error || this.resetLoading) {
        return
      }

      this.resetLoading = true
      this.geettestFlag = 'SUBMIT_DATA';
      this.sense.sense();
    },

    /**
     * 重置密码
     * @param {object} params 入参
     */
    resSetPwdFn(params) {
      let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-reset' : 'dk-reset-en';

      params.email = this.email;
      params.code = this.emailcode;
      params.token = this.resettoken;
      params.password = md5(this.pwd);
      params.captcha_type = captcha_type;

      this.$store.dispatch('verifyResetPassword', params).then(res => {
        if (res.errorCode == 0) {
          alert(this.$t('errorMsg.RESET_SUCC'))
          this.$emit('setDialog', {loginDialog: true, resetDialog: false});
        } else {
          this.resetLoading = false
          // apiError(this, res);
        }
      })
      .catch((err) => {
        this.resetLoading = false
        // apiReqError(this, err);
      })
    },

    /**
     * 渲染极验验证码
     * @param {object} data 极验验证码相关数据
     */
    initSenseAction (data) {
      let vu = this;
      window.initSense({
        id: data.id,
        lang: vu.$t('common.lang') === 'cn' ? 'zh-cn' : 'en',
        onError:function(err){
            etLog('gt error', err)
        }
      }, sense => {
        vu.sense = sense;
        vu.$refs.sendEmail.$el.addEventListener('click', this.sendemailBefore);
        vu.$refs.reset.$el.addEventListener('click', this.resSetPwd);

        sense.setInfos(function () {
          return {
            interactive: 1  //用户场景
          }
        }).onSuccess(function (data) {
          if (vu.geettestFlag === 'SUBMIT_DATA') {
            let params = {geetest_challenge: data.challenge}
            vu.resSetPwdFn(params);
          } else {
            let params = {geetest_challenge: data.challenge}
            vu.sendEmail(params)
          }
        }).onClose(function(){
          etLog('close')
          vu.resetLoading = false
        }).onError(function(err){
          etLog(err);
          if(err && err.code === '1001'){
              submit({})
          }
        })
      });
    },

    /**
     * 倒计时
     */
    handleCodeDown () {
      var time = 60
      this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        time -= 1
        if (time <= 0) {
          this.codeDownText = this.$t('register.sendCode')
          clearInterval(this.timer)
        }
        this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      }, 1000)
    },

    onEnter (e) {
      if (e.keyCode === 13) {
        this.resSetPwd()
      }
    }
  },
  mounted() {
    this.getGeetestData()
    var vu = this
    
    window.addEventListener('keyup', this.onEnter)
  },
  destroyed () {
    clearInterval(this.timer)
    window.removeEventListener('keyup', this.onEnter)
  }
}
</script>

<style lang="less">
// @import url(./style/config.less);
// .reset {
//   .btn-large {
//     position: relative;
//   }
//   .ivu-input {
//     font-size: @font-text;
//   }
//   .ivu-btn {
//     width: 200px;
//     margin-right: 32px;
//   }
//   .content {
//     padding: 32px;
//     position: relative;

//     h1 {
//       color: @font-color-blue;
//       font-size: 20px;
//       font-weight: normal;
//     }
//     hr {
//       background-color: @hr-color;
//       border: none;
//       height: 1px;
//       margin: 32px auto;
//     }
//     .reset_form {
//       width: 520px;
//       label {
//         font-size: @font-text;
//       }
//       input {
//         font-size: @font-text;
//       }
//     }
//     .info {
//       background: @text-bg-color;
//       padding: 16px;
//       position: absolute;
//       top: 150px;
//       left: 650px;
//       line-height: 40px;
//     }
//   }
//   .send-code-down {
//     box-sizing: border-box;
//     min-width: 140px;
//     height: 40px;
//     line-height: 38px;
//     padding: 0 10px;
//     border: 1px solid #999;
//     color: #fff;
//     background-color: #999;
//     text-align: center;
//     border-radius: 0px;
//   }
//   .send-code-btn {
//     position: relative;
//     // display: inline-block;
//     box-sizing: border-box;
//     min-width: 140px;
//     height: 40px;
//     line-height: 40px;
//     border-radius: 0px;
//     padding: 0 10px;
//     border: 1px solid #419aec;
//     color: #419aec;
//     background-color: #fff;
//     text-align: center;
//     cursor: pointer;
//     &:hover {
//       background-color: #419aec;
//       color: #fff;
//     }
//   }
// }

.v-form {
  width: 100%;
  display: inline-block;
}
.email-code-wrap {
  display: flex;
  .fl {
    flex-grow: 1;
  }
}
</style>
