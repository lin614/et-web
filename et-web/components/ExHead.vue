<template>
    <div class="ExHead">
        <v-toolbar fixed app :clipped-left="true" dark>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat> <img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/logo.png" class="logo" /></v-btn>
                <v-btn flat>法币</v-btn>
                <v-btn flat>交易</v-btn>
                <v-btn flat>ET</v-btn>
                <v-btn flat>白皮书</v-btn>
                <v-btn flat>合作伙伴计划</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu offset-y left :open-on-hover="true">
                    <v-btn flat slot="activator" color="primary" dark>
                        <img :src="items[lan].icon">
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="(item, index) in items" :key="index" @click="lan=index">
                            <img :src="items[index].icon">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
export default {
  //   asynData() {
  //     return {
  //       items: [
  //         { title: 'Click Me' },
  //         { title: 'Click Me' },
  //         { title: 'Click Me' },
  //         { title: 'Click Me 2' }
  //       ]
  //     }
  //   }
  data() {
    return {
      lan: 1,
      items: [
        {
          icon: 'https://cdn.vuetifyjs.com/images/flags/cn.png',
          lan: 'cn',
          title: '简体中文'
        },
        {
          icon: 'https://cdn.vuetifyjs.com/images/flags/us.png',
          lan: 'en',
          title: 'English'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.ExHead {
    .v-btn {
        font-size: 16px;
    }

    .logo {
        height: 32px;
    }
}
</style>
