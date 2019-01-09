<template>
  <v-tabs style="background:none!important" v-model="active">
    <v-tab v-for='(p,n) in [" USDT", "BTC" , "ETH" ]' :key="n" ripple>
      {{p}}

    </v-tab>
    <v-tab-item v-for='(p,n) in ["USDT", "BTC" , "ETH" ]' :key="p">
      <div class="coinlist">
        <ul>
          <li>

          </li>
          <li v-for="item in market.groups[p]['main']">

          </li>
        </ul>
        <!-- <v-data-table :headers="headers" :items="market.groups['USDT']['main']" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name.split('/')[0] }}</td>
            <td>{{ props.item.priceData?props.item.priceData.close:'-' }}</td>
            <td>{{ props.item.priceData?props.item.priceData.priceChange:'-' }}</td>
          </template>
        </v-data-table> -->
      </div>
    </v-tab-item>

    </div>

  </v-tabs>
  <!-- <v-card flat height="100%">
    <div class="pa-2 elevation-1" style="height:40px;border-bottom:1px solid #82b1ff">
      交易对
    </div>
   
  </v-card> -->
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PairListMenu",
  computed: {
    ...mapState(["market"])
  },
  data() {
    return {
      active: 0,
      headers: [
        {
          text: "交易对",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "最新价格", value: "close" },
        { text: "涨跌", value: "priceChange" }
      ]
    };
  }
};
</script>

