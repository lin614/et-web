<template>
  <div>
    <ex-banner></ex-banner>
    <div class="main">
      <div class="mt-2">
        <ex-show />
      </div>
      <div class="mt-2">
        <ex-pairs />
      </div>
      <div class="mt-2">

      </div>
    </div>

  </div>
</template>
<script>
import ExBanner from "@/components/ExBanner";
import ExShow from "@/components/ExShow";
import ExPairs from "@/components/ExPairs/ExPairs";
export default {
  components: { ExBanner, ExShow, ExPairs },
  data() {
    var vu = this;
    return {
      // aa: setInterval(() => {
      //   this.$store.commit('setTime')
      // })
    };
  },
  mounted() {},
  async asyncData({ store }) {
    // await store.dispatch("initPairs");
    // await store.dispatch("initPrices");
  }
  // asyncData({ store }) {
  //   let aa = setInterval(() => {
  //     // store.commit('setTime')
  //   }, 10000)
  //   return { aa }
  // }
  // async asyncData({ app, store }) {
  //   let i18n = app.i18n.getLocaleMessage(app.i18n.locale)
  //   let list = i18n.static.banner
  //   for (let ban of list) {
  //     ban.bg_dataurl = await app.dataurl(ban.bgUrl)
  //     ban.img_dataurl = await app.dataurl(ban.imgUrl)
  //   }
  //   return { banner: list }
  // }
};
</script>
<style lang="stylus" scoped>
.main {
  margin: 0 auto;
  width: 1200px;
}
</style>


