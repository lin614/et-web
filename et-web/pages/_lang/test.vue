<template>
  <div>
    {{$store.getters.pairsStr}}
    {{$store.state.test.time}}
  </div>
</template>
<script>
export default {
  async asyncData({ store }) {
    await store.dispatch("InitPairs");
  }
};
</script>

