<template>
    <div class="notice">
        <v-list two-line>
            <template v-for="(item, index) in $t('static.notice')">
                <v-list-tile :key="index" avatar ripple @click="">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subTitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < $t('static.notice').length" :key="`divider-${index}`"></v-divider>
            </template>
        </v-list>
    </div>

</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: '最新公告',
          subTitle: 'Exchain交易所法币充值功能上线',
          url:
            'https://support.exchain.com/hc/zh-cn/articles/360018368511-Exchain%E4%BA%A4%E6%98%93%E6%89%80%E6%B3%95%E5%B8%81%E5%85%85%E5%80%BC%E5%8A%9F%E8%83%BD%E4%B8%8A%E7%BA%BF'
        },
        {
          title: 'Exchain听你说',
          subTitle: '第二期上线，有颜、有料、有建议',
          url: '/sound/2'
        },
        {
          title: 'KYC教学',
          subTitle: '如何快速通过KYC',
          url:
            'https://support.exchain.com/hc/zh-cn/articles/360017845732-KYC%E6%95%99%E5%AD%A6-%E5%9B%BE%E6%96%87%E6%8C%87%E5%AF%BCExchain-KYC-%E8%AE%A4%E8%AF%81%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B'
        },
        {
          title: 'KYC教学',
          subTitle: '如何快速通过KYC',
          url:
            'https://support.exchain.com/hc/zh-cn/articles/360017845732-KYC%E6%95%99%E5%AD%A6-%E5%9B%BE%E6%96%87%E6%8C%87%E5%AF%BCExchain-KYC-%E8%AE%A4%E8%AF%81%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.notice {
    position: absolute;
    width: 390px;
    // height: 380px;
    float: right;
    right: calc(50% - 600px);
    top: 30px;

    &:hover {
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    }
}
</style>
