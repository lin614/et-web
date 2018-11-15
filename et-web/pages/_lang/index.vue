<template>
  <div>
    <ex-banner></ex-banner>
    <div class="et-show mt-3">
      <ex-show />
    </div>

  </div>
</template>
<script>
import ExBanner from '@/components/ExBanner'
import ExShow from '@/components/ExShow'
export default {
  components: { ExBanner, ExShow }

  // async asyncData({ app, store }) {
  //   let i18n = app.i18n.getLocaleMessage(app.i18n.locale)
  //   let list = i18n.static.banner
  //   for (let ban of list) {
  //     ban.bg_dataurl = await app.dataurl(ban.bgUrl)
  //     ban.img_dataurl = await app.dataurl(ban.imgUrl)
  //   }
  //   return { banner: list }
  // }
}
</script>
<style lang="stylus" scoped>
.et-show {
  margin: 0 auto;
  width: 1200px;
  height: 380px;
}
</style>


