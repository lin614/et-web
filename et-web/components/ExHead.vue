<template>
  <div class="ExHead">
    <v-toolbar
      height="40"
      fixed
      app
      dark
    >
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>
          <ex-logo />
        </v-btn>
        <v-btn flat>法币</v-btn>
        <v-btn flat>交易</v-btn>
        <v-btn flat>ET</v-btn>
        <v-btn flat>白皮书</v-btn>
        <v-btn flat>合作伙伴计划</v-btn>
        <v-btn flat>
          <v-badge color="none">
            <i
              slot="badge"
              class="iconfont icon-new1"
            ></i>
            <span>竞猜看涨跌</span>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu
          offset-y
          left
          :open-on-hover="true"
        >
          <v-btn
            flat
            slot="activator"
            color="primary"
          >
            <!-- <i
              class="iconfont"
              :class="$store.state.lang.locale=='cn'?'icon-CN':'icon-EN'"
              :style="{color:($store.state.theme.dark?'white':'black')}"
            ></i> -->
            <i
              class="iconfont"
              :class="$store.state.lang.locale=='cn'?'icon-CN':'icon-EN'"
              :style="{color:'white'}"
            ></i>
          </v-btn>
          <v-list>
            <v-list-tile @click="changeLan('cn')">
              <v-list-tile-title> <i class="iconfont icon-CN"></i></v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="changeLan('en')">
              <v-list-tile-title> <i class="iconfont icon-EN"></i></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          flat
          slot="activator"
          color="primary"
          @click="changeTheme()"
        >
          <!-- <i
            class="iconfont icon-theme1"
            :style="{color:($store.state.theme.dark?'white':'black')}"
          ></i> -->
          <i
            class="iconfont icon-theme1"
            :style="{color:'white'}"
          ></i>
        </v-btn>

        <v-btn flat>登录</v-btn>
        <v-btn flat>注册</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
import ExLogo from "./ExLogo";
import { mapMutations, mapState } from "vuex";
export default {
  components: { ExLogo },
  data() {
    return {};
  },
  computed: {
    ...mapState(["theme"])
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
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.ExHead {
  .v-btn {
    border-radius: 0;
    min-width: 0px;
    padding-left: w = 15px;
    padding-right: w;
    // font-size: 16px;
  }
}
</style>
