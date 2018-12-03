<template>
  <v-container class="register">
    <div class="v-wrap">
      <ex-card>
        <span slot="title">{{ $t('register.title') }}</span>
        
        <div class="card-cnt">
          <v-form class="form" ref="form" v-model="valid">
            <div>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                :label="$t('register.email')"
                :placeholder="$t('register.pleaseIptEmail')"
                required>
              </v-text-field>
              <div>{{$t('register.emailTip')}}</div>
            </div>

            <div class="email-code-wrap clearfix">
              <v-text-field
                class="fl"
                v-model="form.emailcode"
                :rules="emailcodeRules"
                :label="$t('register.emailcode')"
                :placeholder="$t('register.pleaseIptEmailCode')"
                required>
              </v-text-field>
              <v-btn color="info" :loading="sendCodeLoading" ref="sendEmail">{{codeDownText}}</v-btn>
            </div>
            

            <v-text-field
              v-model="form.pwd"
              :rules="emailRules"
              :label="$t('register.pwd')"
              :placeholder="$t('register.pleaseIptPwd')"
              type="password"
              required>
            </v-text-field>

            <v-text-field
              v-model="form.pwd2"
              :rules="emailRules"
              :label="$t('register.pwd2')"
              :placeholder="$t('register.pleaseIptPwd')"
              type="password"
              required>
            </v-text-field>

            <v-text-field
              v-model="form.code"
              :rules="emailRules"
              :label="$t('register.code')"
              :placeholder="$t('register.pleaseIptPwd')"
              required>
            </v-text-field>

            <!-- <v-checkbox
              v-model="form.protocol"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            >
              {{$t('register.readed')}}
                    <router-link class="login" to="/cont" target="_blank">{{$t('register.protocol')}}</router-link>
            </v-checkbox> -->

            <v-btn
              :disabled="!valid"
              ref="regUser"
            >
              {{$t('register.registerBtn')}}
            </v-btn>
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
  import {validateEmail, validatePassword, validateEmailCode} from '@/utils/validate'
  import {register, verifyRegister, initCaptcha} from '@/api/user'

  let instance = null

export default {
  components: {
    ExCard
  },
  data() {
    return {
      valid: false,
      regtoken: '',
      gtserver: '',
      email: '',
      form: {
        email: '',
        emailcode: '',
        source: '',
        pwd: '',
        pwd2: '',
        code: '',
        protocol: false
      },
      emailRules: [
        v => !!v || instance.$t('errorMsg.EMAIL_BLANK'),
        v => v.length < 100 || instance.$t('errorMsg.EMAIL_LIMIT_LENGTH'),
        v => validateEmail(v) || instance.$t('errorMsg.EMAIL_ERR'),
      ],
      emailcodeRules: [
        v => !!v || instance.$t('errorMsg.EMAIL_CODE_BLANK'),
        v => v.length < 20 || instance.$t('errorMsg.EMAIL_CODE_LIMIT_LENGTH'),
        v => validateEmailCode(v) || instance.$t('errorMsg.SYMBOL_ERR'),
      ],
      pwdRules: [
        v => !!v || instance.$t('errorMsg.PWD_BLANK'),
        v => validatePassword(v) || instance.$t('errorMsg.PWD_LIMIT'),
      ],
      pwd2Rules: [
        v => !!v || instance.$t('errorMsg.PWD2_BLANK'),
        v => validatePassword(v) || instance.$t('errorMsg.PWD_LIMIT'),
        v => v !== instance.form.pwd || instance.$t('errorMsg.DIFFERENT_PASSWORD_IPT'),
      ],
      protocolRules: [
        v => !!v || instance.$t('errorMsg.PROTOCOL_BLANK'),
      ],
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
    activeLang() {
      return this.$store.state.activeLang
    }
  },
  created() {
    instance = this
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
            etLog('gt error', err)
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
          etLog('close')
          this.loginLoading = false
        }).onError(err => {
          etLog(err);
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

      params.email = this.form.email;
      params.code = this.form.emailcode;
      params.channel = this.form.source;
      params.inviteCode = this.form.code;
      params.token = this.regtoken;
      params.password = md5(this.form.pwd);
      params.captcha_type = captcha_type;

      verifyRegister(params).then(res => {
        if (res.data.errorCode == 0) {
          window.sessionStorage.removeItem('regSource');
          window.sessionStorage.removeItem('regInviteCode');

          alert(this.$t('errorMsg.REGISTER_SUCC'))

          this.$router.push('/login')
        } else {
          this.regLoading = false
          // apiError(this, res)
        }
      })
        .catch((err) => {
          this.regLoading = false
          // apiReqError(this, err)
        })
    },
    /**
     * 发送邮件
     * @param {object} params 入参
     */
    sendEmail (params) {
      let lang = this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'
      let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-register' : 'dk-register-en';
      
      params.email = this.form.email;
      params.language = lang;
      params.captcha_type = captcha_type;
      
      this.sendCodeLoading = true

      register(params).then(res => {
        this.sendCodeLoading = false
        if (res.data.errorCode == 0) {
          this.regtoken = res.data.result.token
          alert(this.$t('errorMsg.EMAIL_SEND_SUCC'))
          
          this.handleCodeDown();
        } else {
          // apiError(this, res);
        }
      })
      .catch((err) => {
        this.sendCodeLoading = false
        // apiReqError(this, err);
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
      this.$refs.form.$touch()
      if (this.sendCodeLoading) {
        return
      }

      if (this.$refs.form.validate('email')) {
        this.geettestFlag = 'SEND_EMAIL_CODEA';
        this.sense.sense();
      }
    },
    /**
     * 唤起验证码（注册用户）
     */
    regUser() {
      this.regLoading = true
      if (this.$refs.form.validate()) {
        this.geettestFlag = 'SUBMIT_DATA';
        this.sense.sense();
      }
    },
    /**
     * 邀请码和来源处理
     */
    init() {
      this.form.code = this.$route.params.code
      this.form.source = this.$route.query.source
      // 邀请码
      if (this.form.code) {
        window.sessionStorage.setItem('regInviteCode', this.form.code);
      } else {
        let regInviteCode = window.sessionStorage.getItem('regInviteCode');
        this.form.code = regInviteCode ? regInviteCode : '';
      }
      // 来源
      if (this.form.source) {
        window.sessionStorage.setItem('regSource', this.form.source);
      } else {
        let source = window.sessionStorage.getItem('regSource');
        this.form.source = source ? source : '';
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
    width: 400px;
  }
}
</style>
