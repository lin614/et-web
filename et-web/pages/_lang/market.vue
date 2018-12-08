<template>
  <div>
    <ex-kline />
  </div>
</template>
<script>
import ExKline from "@/components/ExKline";
// import TVChartContainer from "@/components/TVChartContainer.vue";
export default {
  components: { ExKline },
  async asyncData({ store }) {
    
    await store.dispatch("initBars");
  }
};
</script>

