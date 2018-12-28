<template>
  <v-container class="register">
    <div class="v-wrap">
      <ex-card>
        <span slot="title">{{ $t('register.title') }}</span>
        
        <div class="card-cnt">
          <v-form class="form" ref="form">
            <div>
              <v-text-field
                v-model="email"
                :label="$t('register.email')"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required>
              </v-text-field>
              <div>{{$t('register.emailTip')}}</div>
            </div>

            <div class="email-code-wrap clearfix">
              <v-text-field
                class="fl"
                v-model="emailcode"
                :label="$t('register.emailcode')"
                :error-messages="emailcodeErrors"
                @input="$v.emailcode.$touch()"
                @blur="$v.emailcode.$touch()"
                :placeholder="$t('register.pleaseIptEmailCode')"
                required>
              </v-text-field>
              <v-btn color="info" :loading="sendCodeLoading" ref="sendEmail">{{codeDownText}}</v-btn>
            </div>
            

            <v-text-field
              v-model="pwd"
              :label="$t('register.pwd')"
              :error-messages="pwdErrors"
              @input="$v.pwd.$touch()"
              @blur="$v.pwd.$touch()"
              :placeholder="$t('register.pleaseIptPwd')"
              type="password"
              required>
            </v-text-field>

            <v-text-field
              v-model="pwd2"
              :label="$t('register.pwd2')"
              :error-messages="pwd2Errors"
              @input="$v.pwd2.$touch()"
              @blur="$v.pwd2.$touch()"
              :placeholder="$t('register.pleaseIptPwd')"
              type="password"
              required>
            </v-text-field>

            <v-text-field
              v-model="code"
              :label="$t('register.code')"
              :placeholder="$t('register.pleaseIptPwd')"
              required>
            </v-text-field>

            <div class="protocol">
              <v-checkbox
                v-model="protocol"
                :label="$t('register.readed')"
                :error-messages="protocolErrors"
                type="checkbox"
                @input="$v.protocol.$touch()"
                @blur="$v.protocol.$touch()"
                required>
                <router-link class="login" to="/cont" target="_blank">{{$t('register.protocol')}}</router-link>
              </v-checkbox>
            </div>

            <v-btn ref="regUser" :loading="regLoading">{{$t('register.registerBtn')}}</v-btn>

            {{$t('register.toLogin')}}
            <router-link class="login" to="/login">{{$t('register.login')}}</router-link>
          </v-form>

        </div>
      </ex-card>
    </div>
  </v-container>
</template>

<script>
  import cookie from 'js-cookie'
  import md5 from 'crypto-md5'
  import ExCard from '@/components/ExCard'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import {validateEmail, validatePassword, validateEmailCode} from '@/utils/validate'

  let instance = null

export default {
  components: {
    ExCard
  },

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
    // bus.$off('langChange');
    window.removeEventListener('keyup', this.onEnter)
  },
  methods: {
    /**
     * 获取极验验证码相关数据
     */
    getGeetestData() {
      let params = {type: this.$t('common.lang') === 'cn' ? 'dk-register' : 'dk-register-en'};

      this.$store.dispatch('initCaptcha', params).then(res => {
        this.initSenseAction(res);
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


      this.$store.dispatch('verifyRegister', params).then(res => {
        if (res.errorCode == 0) {
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

      this.$store.dispatch('register', params).then(res => {
        this.sendCodeLoading = false

        if (res.errorCode == 0) {
          this.regtoken = res.result.token
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
.register {
  .v-form {
    width: 520px;
    display: inline-block;
  }
  .msg {
    float: right;
    background: #f2f3f7;
    padding: 16px;
    line-height: 40px;
  }
  .email-code-wrap .v-input{
    width: 360px;
  }
  .email-code-wrap .v-btn{
    float: right;
  }
  .protocol {
    margin-bottom: 10px;
  }
}
</style>
