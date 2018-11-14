<template>
    <div class="ExHead">
        <v-toolbar height="48" fixed app dark>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat>
                    <ex-logo />
                </v-btn>
                <v-btn flat>法币</v-btn>
                <v-btn flat>交易</v-btn>
                <v-btn flat>ET</v-btn>
                <v-btn flat>白皮书</v-btn>
                <v-btn flat>合作伙伴计划</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu offset-y left :open-on-hover="false">
                    <v-btn flat slot="activator" color="primary" dark>
                        <img src="https://cdn.vuetifyjs.com/images/flags/cn.png" v-if="$i18n.locale=='cn'">
                        <img src="https://cdn.vuetifyjs.com/images/flags/us.png" v-if="$i18n.locale=='en'">
                    </v-btn>
                    <v-list>
                        <v-list-tile @click="changeLan('cn')">
                            <img src="https://cdn.vuetifyjs.com/images/flags/cn.png">
                            <v-list-tile-title>&nbsp&nbsp 简体中文</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="changeLan('en')">
                            <img src="https://cdn.vuetifyjs.com/images/flags/us.png">
                            <v-list-tile-title>&nbsp&nbsp English</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-btn flat>登录</v-btn>
                <v-btn flat>注册</v-btn>

            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>
<script>
import ExLogo from './ExLogo'
import { mapMutations } from 'vuex'
export default {
  components: { ExLogo },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['set_lang']),
    changeLan(lan) {
      this.set_lang(lan)
      location.reload()
    }
  }
}
</script>

<style lang="stylus" scoped>
.ExHead {
    .v-btn {
        font-size: 16px;
    }
}
</style>
