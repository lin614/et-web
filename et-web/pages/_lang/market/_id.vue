<template>
  <div class="market">
    <ex-kline :symbol="symbol"/>
  </div>
</template>
<script>
import {formatSymbol} from '@/js/utils/symbol'
import ExKline from "@/components/ExKline";

export default {
  components: { ExKline },
  data() {
    return {
      symbol: formatSymbol(this.$route.params.id) || 'BTC/USDT',
    }
  },
  async asyncData({ store }) {
    await store.dispatch("initBars");
  },
  mounted() {
    
  }
};
</script>
<style lang="stylus" scoped>
.market {
  min-height: 800px;
}
</style>

