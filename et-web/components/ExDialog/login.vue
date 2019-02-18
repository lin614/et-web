<template>
  <v-dialog v-model="dialog" persistent max-width="600px" class="login">
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('userCenter.login.login') }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form class="form" ref="form">
              <v-flex xs12>
                <v-text-field v-model="email" :label="$t('userCenter.login.email')" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required> </v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="password" :label="$t('userCenter.login.password')" type="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" required> </v-text-field>
              </v-flex>
            </v-form>

            <v-flex xs12>
              <span class="fl">{{ $t('userCenter.login.isnotEXUser') }} ? <span class="highlight pointer" @click="toRegister">{{ $t('userCenter.login.signUp') }}</span></span>
              <span class="fr">{{ $t('userCenter.login.forgotPassword') }} ? <span class="highlight pointer" @click="toReSet">{{ $t('userCenter.login.resetPassword') }}</span></span>
            </v-flex>
          </v-layout>
        </v-container>

        <div>
          
          </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="setDialog">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="blue darken-1" flat ref="loginBefore" :loading="loginLoading">{{ $t('userCenter.login.login') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import cookie from 'js-cookie'
  import md5 from 'crypto-md5'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import {validateEmail, validatePassword} from '@/utils/validate'
  // import axios from 'axios'

  let instance = null

  export default {
    name: 'ExdialogLogin',
    props: ['dialog'],

    mixins: [validationMixin],

    validations: {
      email: {required, email},
      password: {required},
    },

    data: () => ({
      loginLoading: false,
      email: '',
      password: '',
      sense: null
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.required && errors.push(this.$t('errorMsg.EMAIL_BLANK'))
        !this.$v.email.email && errors.push(this.$t('errorMsg.EMAIL_ERR'))
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push(this.$t('errorMsg.PWD_BLANK'))
        !validatePassword(this.password) && errors.push(this.$t('errorMsg.PWD_LIMIT'))
        return errors
      }
    },

    created() {
      instance = this
    },

    mounted() {
      this.getGeetestData()
    },

    methods: {
      toReSet () {
        this.$emit('setDialog', {loginDialog: false, resetDialog: true});
      },
      toRegister () {
        this.$emit('setDialog', {loginDialog: false, registerDialog: true});
      },
      setDialog() {
        this.$emit('setDialog', {loginDialog: false, registerDialog: false});
      },
      /**
       * 获取极验验证码相关数据
       */
      getGeetestData() {
        let params = {type: this.$t('common.lang') === 'cn' ? 'dk-login' : 'dk-login-en'};

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
          this.$refs.loginBefore.$el.addEventListener('click', this.loginBefore);
          sense.setInfos(function () {
            return {
              interactive: 2  // 用户场景
            }
          }).onSuccess(data => {
            let params = {geetest_challenge: data.challenge}
            this.loginFn(params)
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
       * 渲染极验验证码
       * @param {object} data 极验验证码相关数据
       */
      loginBefore() {
        this.$v.$touch()
        if (this.loginLoading) {
          return
        }
        this.loginLoading = true
        if (!this.$v.$error) {
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

        this.$store.dispatch('login', params).then(res => {
          if (res.errorCode == 0) {
            
            if (res.result.pn) {
              // axios.defaults.headers.post['X-EXCHAIN-PN'] = res.result.pn
              cookie.set('PN', res.result.pn, {
                domain: 'exchain.com',
                expires: 0.08
              })
              cookie.set('email', this.email, {
                domain: 'exchain.com',
                expires: 0.08
              })
              cookie.set('uid', res.result.id, {
                domain: 'exchain.com',
                expires: 0.08
              })

              sessionStorage.setItem('PN', encodeURIComponent(res.result.pn))
              sessionStorage.setItem('uid', res.result.id)
              sessionStorage.setItem('email', res.result.email)
              
              this.getUserInfo();
            }
            this.loginLoading = false
            this.$emit('setDialog', {loginDialog: false, registerDialog: false});
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

      getUserInfo () {
        this.$store.dispatch('getUserInfo').then(res => {
          if (res.errorCode === 0) {
            sessionStorage.userInfo = JSON.stringify(res.result)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
// @import url(../assets/style/config.less);
  .v-form {
    width: 100%;
    display: inline-block;
  }
</style>


