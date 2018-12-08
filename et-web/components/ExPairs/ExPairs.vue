<template>
  <div>
    <v-hover>
      <v-tabs
        v-model="active"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 5: 1}`"
      >
        <v-tab
          v-for="n in 3"
          :key="n"
          ripple
        >
          {{['USDT 交易区','BTC 交易区','ETH 交易区'][n-1] }}

        </v-tab>
        <v-spacer></v-spacer>
        <v-tab>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            
          ></v-text-field>
        </v-tab>
        <v-tab-item
          v-for="n in 3"
          :key="n"
        >
          <!-- <div
          class="coinlist mt-3"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 5: 1}`"
        >

        </div> -->
        </v-tab-item>
      </v-tabs>
    </v-hover>
    <div class="coinlist">

      <div v-show="active==0">
        <ex-pairs-domain />
      </div>
      <div v-show="active==1">2</div>
      <div v-show="active==2">3</div>
    </div>

  </div>
</template>
<script>
import ExPairsDomain from "./ExPairsDomain";
export default {
  components: { ExPairsDomain },
  data() {
    return {
      active: 0,
      search: ""
    };
  }
};
</script>
<style lang="stylus" scoped>
.coinlist {
  display: flex;
  min-height:800px;
  justify-content: space-between;
}
</style>
