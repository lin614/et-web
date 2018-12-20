<template>
  <div class="ExHead grey--text">
    <v-toolbar height="40" fixed app dark>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="$router.push('/')">
          <ex-logo />
        </v-btn>
        <v-btn flat>法币</v-btn>
        <v-btn flat @click="$router.push('/market')">交易</v-btn>
        <v-btn flat>ET</v-btn>
        <v-btn flat>白皮书</v-btn>
        <v-btn flat>合作伙伴计划</v-btn>
        <v-btn flat>
          <v-badge color="none">
            <i slot="badge" class="iconfont icon-new1"></i>
            <span>竞猜看涨跌</span>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-menu offset-y left :open-on-hover="true">
          <v-btn flat slot="activator" color="primary">
            <i class="iconfont" :class="$store.state.lang.locale=='cn'?'icon-CN':'icon-EN'" :style="{color:'white'}"></i>
          </v-btn>
          <v-list>
            <v-list-tile @click="changeLan('cn')">
              <v-list-tile-title> <i class="iconfont icon-CN"></i></v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="changeLan('en')">
              <v-list-tile-title> <i class="iconfont icon-EN"></i></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu> -->

        <v-btn flat @click="loginDialog = true" v-if="!user.email">登录</v-btn>
        <v-btn flat @click="registerDialog = true" v-if="!user.email">注册</v-btn>

        <v-menu offset-y v-if="user.email">
          <v-btn slot="activator" color="primary" dark>{{email}}</v-btn>

          <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index" @click="setMenu(index)">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>


        <v-btn flat slot="activator" color="primary" @click="changeLan($store.state.lang.locale=='cn'?'en':'cn')">
          <i class="iconfont" :class="$store.state.lang.locale=='cn'?'icon-CN':'icon-EN'"></i>
        </v-btn>
        <v-btn flat slot="activator" color="primary" @click="changeTheme()">
          <i class="iconfont icon-theme1"></i>
        </v-btn>
      </v-toolbar-items>

      <!-- 登录 -->
      <ExdialogLogin :dialog="loginDialog" @setDialog="setLoginDialog"></ExdialogLogin>
      <!-- 注册 -->
      <ExdialogRegister :dialog="registerDialog" @setDialog="setRegisterDialog"></ExdialogRegister>
      <!-- 重置 -->
      <ExdialogReset :dialog="resetDialog" @setDialog="setResetDialog"></ExdialogReset>
    </v-toolbar>
  </div>
</template>
<script>
import ExLogo from "./ExLogo";
import ExdialogLogin from "./ExDialog/login";
import ExdialogRegister from "./ExDialog/register";
import ExdialogReset from "./ExDialog/reset";
import { mapMutations, mapState } from "vuex";
export default {
  components: { ExLogo, ExdialogLogin, ExdialogRegister, ExdialogReset },
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
      resetDialog: false,
      items: [
        { title: this.$t("header.userCenter"), url: '/usercenter' },
        { title: this.$t("header.promiseManage"), url: '/usercenter/entrust' },
        { title: this.$t("header.partner"), url: '/bonus' },
        { title: this.$t("header.api"), url: '/api' },
        { title: this.$t("header.logout"), url: '' }
      ]
    };
  },
  computed: {
    ...mapState(["user", "theme"]),
    email() {
      var info = this.user.email;
      let pre = '';
      if (!info) {
        this.isLogin = false;
        return "";
      }
      var emailArr = info.split("@");
      if (emailArr[0].length > 4) {
        pre = emailArr[0].slice(0, 4) + "...";
      }

      let domainArr = info.split('.');
      let domain = '';
      if (info.length - domainArr[domainArr.length -1].length - emailArr[0].length -2 > 4) {
        domain = emailArr[1].slice(0, 4) + "...";
        return pre + "@" + domain + '.' + domainArr[domainArr.length -1];
      } else {
        return pre + "@" + emailArr[1];
      }
    },
  },
  methods: {
    ...mapMutations(["set_lang", "set_dark"]),
    changeLan(lang) {
      this.set_lang(lang);
      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${lang}`
      });
      //   location.reload()
    },
    changeTheme() {
      let dark = !this.$store.state.theme.dark;
      this.set_dark(dark);
    },
    setLoginDialog(data) {
      this.loginDialog = data.loginDialog;
      typeof data.registerDialog !== 'undefined' && (this.registerDialog = data.registerDialog)
      typeof data.resetDialog !== 'undefined' && (this.resetDialog = data.resetDialog)
    },
    setRegisterDialog(data) {
      this.loginDialog = data.loginDialog;
      this.registerDialog = data.registerDialog;
    },
    setResetDialog(data) {
      this.loginDialog = data.loginDialog;
      this.resetDialog = data.resetDialog;
    },
    setMenu(e) {
      this.$router.push(this.items[e].url);
    }
  },
  mounted() {
  }
};
</script>

<style lang="stylus" scoped>
@require '~vuetify/src/stylus/settings/_colors';

.ExHead {
  font-size: 12px;
  font-weight: lighter;

  .v-btn {
    padding-left: w = 15px;
    padding-right: w;
  }

  .v-btn, i {
    border-radius: 0;
    min-width: 0px;
    color: $grey.lighten-1 !important;
    font-size: 14px;

    &:hover {
      // color: $grey.lighten-5 !important;
      color: white !important;
      // color: #82b1ff !important;
    }
  }
}
</style>
