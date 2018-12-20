<template>
  <v-dialog v-model="dialog" persistent max-width="600px" class="login">
    <v-card>

      <v-card-title>
        <span class="headline">{{ $t('register.title') }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form class="form" ref="form">
              <v-flex xs12>
                <v-text-field v-model="email" :label="$t('register.email')" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required> </v-text-field>
                <div>{{$t('register.emailTip')}}</div>
              </v-flex>

              <v-flex xs12>
                <div class="email-code-wrap clearfix">
                  <v-text-field class="fl" v-model="emailcode" :label="$t('register.emailcode')" :error-messages="emailcodeErrors" @input="$v.emailcode.$touch()" @blur="$v.emailcode.$touch()" :placeholder="$t('register.pleaseIptEmailCode')" required> </v-text-field>
                  <v-btn class="fr" color="info" :loading="sendCodeLoading" ref="sendEmail">{{codeDownText}}</v-btn>
                </div>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="pwd" :label="$t('register.pwd')" :error-messages="pwdErrors" @input="$v.pwd.$touch()" @blur="$v.pwd.$touch()" :placeholder="$t('register.pleaseIptPwd')" type="password" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="pwd2" :label="$t('register.pwd2')" :error-messages="pwd2Errors" @input="$v.pwd2.$touch()" @blur="$v.pwd2.$touch()" :placeholder="$t('register.pleaseIptPwd')" type="password" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="code" :label="$t('register.code')" :placeholder="$t('register.pleaseIptPwd')" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-checkbox class="fl" v-model="protocol" :label="$t('register.readed')" :error-messages="protocolErrors" type="checkbox" @input="$v.protocol.$touch()" @blur="$v.protocol.$touch()" required>
                  <router-link slot="append" class="protocol" to="/cont" target="_blank">{{$t('register.protocol')}}</router-link>
                </v-checkbox>

                <span class="to-login fr">{{$t('register.toLogin')}} <span class="highlight pointer" @click="toLogin">{{ $t('register.login') }}</span></span>
              </v-flex>

            </v-form>
          </v-layout>
        </v-container>

      </v-card-text>
            
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="setDialog">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="blue darken-1" flat ref="regUser" :loading="regLoading">{{ $t('register.registerBtn') }}</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
  import cookie from 'js-cookie'
  import md5 from 'crypto-md5'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import {validateEmail, validatePassword, validateEmailCode} from '@/utils/validate'
  import {register, verifyRegister, initCaptcha} from '@/api/user'

  let instance = null

export default {
  name: 'ExdialogRegister',
  props: ['dialog'],

  mixins: [validationMixin],

  validations: {
    email: {required, email},
    emailcode: {required},
    pwd: {required},
    pwd2: {required},
    protocol: {}
  },

  data() {
    return {
      regtoken: '',
      gtserver: '',
      email: '',
      emailcode: '',
      source: '',
      pwd: '',
      pwd2: '',
      code: '',
      protocol: false,
      
      sense: null,
      geettestFlag: '',
      regLoading: false,
      codeDownText: this.$t('register.sendCode'),
      timer: null,
      geettest: null,
      geetOnReady: false,
      sendCodeLoading: false
    }
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

    protocolErrors() {
      const errors = [];
      if (!this.$v.protocol.$dirty) return errors;
      !this.protocol && errors.push(this.$t('errorMsg.PROTOCOL_BLANK'));
      return errors;
    },

    lang() {
      return this.$store.state.lang.locale
    }
  },
  created() {
    instance = this
  },

  watch: {
    lang() {
      this.codeDownText = this.$t('register.sendCode')
    }
  },

  mounted() {
    // 邀请码和来源处理
    this.init();
    this.getGeetestData()
    window.addEventListener('keyup', this.onEnter)
  },
  destroyed () {
    clearInterval(this.timer)
    window.removeEventListener('keyup', this.onEnter)
  },
  methods: {
    setDialog() {
      this.$emit('setDialog', {loginDialog: false, registerDialog: false});
    },
    toLogin() {
      this.$emit('setDialog', {loginDialog: true, registerDialog: false});
    },
    /**
     * 获取极验验证码相关数据
     */
    getGeetestData() {
      let params = {type: this.$t('common.lang') === 'cn' ? 'dk-register' : 'dk-register-en'};

      initCaptcha(params).then(res => {
        this.initSenseAction(res.data);
      })
    },

    /**
     * 渲染极验验证码
     * @param {object} data 极验验证码相关数据
     */
    initSenseAction (data) {
      window.initSense({
        id: data.id,
        lang: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en',     
        onError:function(err){
            this.etLog('gt error', err)
        }
      }, sense => {
        this.sense = sense;
        this.$refs.sendEmail.$el.addEventListener('click', this.sendemailBefore);
        this.$refs.regUser.$el.addEventListener('click', this.regUser);
        sense.setInfos(function () {
          return {
            interactive: 1  //用户场景
          }
        }).onSuccess(data => {
          if (this.geettestFlag === 'SUBMIT_DATA') {
            let params = {geetest_challenge: data.challenge}
            this.regUserFn(params);
          } else {
            let params = {geetest_challenge: data.challenge}
            this.sendEmail(params)
          }
        }).onClose(() => {
          this.etLog('close')
          this.loginLoading = false
        }).onError(err => {
          this.etLog(err);
          if(err && err.code === '1001'){
              submit({})
          }
        })
      });
    },

    /**
     * 注册用户
     * @param {object} params 入参
     */
    regUserFn(params) {
      let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-register' : 'dk-register-en';

      params.email = this.email;
      params.code = this.emailcode;
      params.channel = this.source;
      params.inviteCode = this.code;
      params.token = this.regtoken;
      params.password = md5(this.pwd);
      params.captcha_type = captcha_type;

      verifyRegister(params).then(res => {
        if (res.data.errorCode == 0) {
          window.sessionStorage.removeItem('regSource');
          window.sessionStorage.removeItem('regInviteCode');

          alert(this.$t('errorMsg.REGISTER_SUCC'))

          this.$router.push('/login')
        } else {
          this.regLoading = false
        }
      })
        .catch((err) => {
          this.regLoading = false
        })
    },
    /**
     * 发送邮件
     * @param {object} params 入参
     */
    sendEmail (params) {
      let lang = this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'
      let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-register' : 'dk-register-en';
      
      params.email = this.email;
      params.language = lang;
      params.captcha_type = captcha_type;
      
      this.sendCodeLoading = true

      register(params).then(res => {
        this.sendCodeLoading = false

        if (res.data.errorCode == 0) {
          this.regtoken = res.data.result.token
          alert(this.$t('errorMsg.EMAIL_SEND_SUCC'))
          this.handleCodeDown();
        }
      })
      .catch((err) => {
        this.sendCodeLoading = false
      })
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
    /**
     * 回车
     */
    onEnter (e) {
      if (e.keyCode === 13) {
        this.regUser()
      }
    },
    /**
     * 唤起验证码（发送邮件）
     */
    sendemailBefore() {
      this.$v.email.$touch()
      if (this.$v.email.$error || this.sendCodeLoading) {
        return
      }

      this.geettestFlag = 'SEND_EMAIL_CODEA';
      this.sense.sense();
    },
    /**
     * 唤起验证码（注册用户）
     */
    regUser() {
      this.$v.$touch()
      if (this.$v.$error || this.regLoading) {
        return
      }
      this.regLoading = true
      this.geettestFlag = 'SUBMIT_DATA';
      this.sense.sense();
    },
    /**
     * 邀请码和来源处理
     */
    init() {
      this.code = this.$route.params.code
      this.source = this.$route.query.source
      // 邀请码
      if (this.code) {
        window.sessionStorage.setItem('regInviteCode', this.code);
      } else {
        let regInviteCode = window.sessionStorage.getItem('regInviteCode');
        this.code = regInviteCode ? regInviteCode : '';
      }
      // 来源
      if (this.source) {
        window.sessionStorage.setItem('regSource', this.source);
      } else {
        let source = window.sessionStorage.getItem('regSource');
        this.source = source ? source : '';
      }
    }
  }
}
</script>

<style lang="less" scoped>
// @import url(./style/config.less);
.protocol {
  margin-top: 4px;
}
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
.to-login {
  margin-top: 22px;
}
</style>
