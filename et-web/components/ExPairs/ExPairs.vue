<template>
  <v-hover>
    <div slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`">
      <v-tabs v-model="active">
        <v-tab v-for="n in 3" :key="n" ripple>
          {{['USDT 交易区','BTC 交易区','ETH 交易区'][n-1] }}

        </v-tab>
        <v-spacer></v-spacer>
        <v-tab>
          <v-text-field v-model="search" append-icon="search" label="Search" :dark="theme.dark" single-line hide-details></v-text-field>
        </v-tab>
        <v-tab-item v-for="n in 3" :key="n">
        </v-tab-item>
      </v-tabs>

      <div class="coinlist">
        <div v-show="active==0">
          <ex-pairs-table />
          <ex-pairs-table domain='inv' />
          <ex-pairs-table domain='vc' />
        </div>
        <div v-show="active==1">
          <ex-pairs-table />
          <ex-pairs-table domain='inv' />
          <ex-pairs-table domain='vc' />
        </div>
        <div v-show="active==2">3</div>
      </div>
    </div>
  </v-hover>

</template>
<script>
import ExPairsTable from "./ExPairsTable";
import { mapState } from "vuex";
export default {
  components: { ExPairsTable },
  data() {
    return {
      active: 0,
      search: ""
    };
  },
  computed: {
    ...mapState(["theme"])
  }
};
</script>
<style lang="stylus" scoped>
@require '~vuetify/src/stylus/settings/_colors';

.coinlist {
  display: flex;
  // min-height: 400px;
  justify-content: space-between;
}
</style>
