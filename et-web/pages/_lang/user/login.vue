<template>
  <v-container class="login">
    <div class="v-wrap">
      <ex-card>
        <span slot="title">{{ $t('userCenter.login.login') }}</span>

        <div class="card-cnt">
          
          <v-form class="form" ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :label="$t('userCenter.login.email')"
              required>
            </v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :label="$t('userCenter.login.password')"
              type="password"
              required>
            </v-text-field>

            <v-btn
              :disabled="!valid"
              ref="loginBefore"
            >
              submit
            </v-btn>
            
          </v-form>

          <div class="msg">
              <p>{{ $t('userCenter.login.isnotEXUser') }} ?</p>
              <p>{{ $t('userCenter.login.quickReg') }}</p>
              <router-link to="/reg">{{ $t('userCenter.login.signUp') }}</router-link>
            </div>
        </div>
      </ex-card>
      
    </div>
  </v-container>
</template>
<script>
  import cookie from 'js-cookie'
  import md5 from 'crypto-md5'
  import ExCard from '@/components/ExCard'
  import {validateEmail, validatePassword} from '@/utils/validate'
  import {login, initCaptcha} from '@/api/user'

  let instance = null

  export default {
    components: {
      ExCard
    },

    data: () => ({
      valid: false,
      loginLoading: false,
      email: '',
      emailRules: [
        v => !!v || instance.$t('errorMsg.EMAIL_BLANK'),
        v => validateEmail(v) || instance.$t('errorMsg.EMAIL_ERR'),
        v => v.length < 100 || instance.$t('errorMsg.EMAIL_LIMIT_LENGTH')
      ],
      password: '',
      passwordRules: [
        v => !!v || instance.$t('errorMsg.PWD_BLANK'),
        v => validatePassword(v) || instance.$t('errorMsg.PWD_LIMIT')
      ],
      sense: null
    }),

    created() {
      instance = this
    },

    mounted() {
      this.getGeetestData()
    },

    methods: {
      /**
       * 获取极验验证码相关数据
       */
      getGeetestData() {
        let params = {type: this.$t('common.lang') === 'cn' ? 'dk-login' : 'dk-login-en'};

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
          this.$refs.loginBefore.$el.addEventListener('click', this.loginBefore);
          sense.setInfos(function () {
            return {
              interactive: 2  //用户场景
            }
          }).onSuccess(data => {
            let params = {geetest_challenge: data.challenge}
            this.loginFn(params)
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
       * 渲染极验验证码
       * @param {object} data 极验验证码相关数据
       */
      loginBefore() {
        if (this.loginLoading) {
          return
        }
        this.loginLoading = true
        if (this.$refs.form.validate()) {
          this.sense.sense();
        } else {
          this.loginLoading = false
        }
      },

      loginFn(params) {
        let captcha_type = this.$t('common.lang') === 'cn' ? 'dk-login' : 'dk-login-en'

        params.email = this.email;
        params.password = md5(this.password)
        params.captcha_type = captcha_type

        login(params).then(res => {
          if (res.data.errorCode == 0) {
            this.$store.commit('setUserInfo', {
              email: res.data.result.email,
              mtime: res.data.result.mtime
            })

            if (res.data.result.pn) {
              // ax.defaults.headers.post['X-EXCHAIN-PN'] = res.data.result.pn
              cookie.set('PN', res.data.result.pn, {
                domain: 'exchain.com',
                expires: 0.08
              })
              cookie.set('email', this.email, {
                domain: 'exchain.com',
                expires: 0.08
              })
              cookie.set('uid', res.data.result.id, {
                domain: 'exchain.com',
                expires: 0.08
              })

              sessionStorage.setItem('PN', encodeURIComponent(res.data.result.pn))
              sessionStorage.setItem('uid', res.data.result.id)
              sessionStorage.setItem('email', res.data.result.email)
            }
            this.$router.push('/')
          } else {
            this.loginLoading = false
            // apiError(this, res);
          }
        })
        .catch(err => {
          this.loginLoading = false
          // this.geettest.reset()
          // apiReqError(this, err);
        })
      },
    }
  }
</script>
<style lang="less" scoped>
// @import url(../assets/style/config.less);
.login {
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
}
</style>


