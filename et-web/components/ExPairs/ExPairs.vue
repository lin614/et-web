<template>
  <v-hover>
    <div slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`">
      <v-tabs style="background:none!important" v-model="active">
        <v-tab v-for='(p,n) in [" USDT", "BTC" , "ETH" ]' :key="n" ripple>
          {{p+'交易区'}}

        </v-tab>
        <v-spacer></v-spacer>
        <!-- <v-tab>
          
        </v-tab> -->
        <div ripple style="width:300px">
          <v-text-field class="ma-1" v-model="search" append-icon="search" label="Search" :dark="theme.dark" single-line hide-details></v-text-field>
        </div>
        <!-- <v-tab-item v-for='(p,n) in [" USDT", "BTC" , "ETH" ]' :key="p">
        </v-tab-item> -->
      </v-tabs>

      <div class="coinlist">
        <div v-show="active=='0'">
          <ex-pairs-table pair="USDT" />
          <ex-pairs-table pair="USDT" domain='inv' />
          <ex-pairs-table pair="USDT" domain='vc' />
        </div>
        <div v-show="active=='1'">
          <ex-pairs-table pair="BTC" />
          <ex-pairs-table pair="BTC" domain='inv' />
          <ex-pairs-table pair="BTC" domain='vc' />
        </div>
        <div v-show="active=='2'">
          <ex-pairs-table pair="ETH" />
          <ex-pairs-table pair="ETH" domain='inv' />
          <ex-pairs-table pair="ETH" domain='vc' />
        </div>
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
