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
    await store.dispatch("initPairs");
    await store.dispatch("initPrices");
    await store.dispatch("upEt");
  }
};
</script>
<style lang="stylus" scoped>
.main {
  margin: 0 auto;
  width: 1200px;
  min-height: 800px;
}
</style>


