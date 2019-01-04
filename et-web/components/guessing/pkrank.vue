<template>
  <div class="btc-rank">
    <h3>昨日竞猜排行榜</h3>
    <ul>
      <li v-for="(item,i) in tops" :key="i" class="liRank">
        <v-layout wrap justify="space-between">
          <v-flex xs2 class="btc-today">
            第{{['一','二','三','四','五','六','七','八','九','十'][i]}}名
          </v-flex>

          <v-flex xs6 class="btc-today">
            {{item.email.split('@')[0].slice(0,4)+'***@'+item.email.split('@')[1]}}
          </v-flex>

          <v-flex xs4 class="btc-today">
            获得 {{item.amount}} ET
          </v-flex>
        </v-layout>
      </li>
      <li v-if="tops.length==0">
        <span>暂无数据</span>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tops: []
    };
  },
  methods: {
    getTops() {
      this.$store.dispatch('queryLastGuessTops').then(res => {
        this.tops = res.data;
      });
    }
  },
  created() {
    this.getTops();
  },
  mounted() {
    let vu = this;
    // bus.$on("upInfo", () => {
    //   vu.getTops();
    // });
  }
};
</script>

<style lang="less" scoped>
.btc-rank {
  ul {
    padding: 16px;
    margin: 16px;
    border: 1px solid lightgray;
  }
  h3 {
    text-align: center;
    margin-top: 16px;
  }
  li {
    p {
      word-wrap: break-word;
      overflow-wrap: break-word;
      padding: 0 5px;
    }
  }
}
</style>

