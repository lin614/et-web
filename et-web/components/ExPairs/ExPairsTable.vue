<template>
  <div class="pairstable" v-show="market.groups[pair][domain]">
    <v-card width="1200" flat>
      <v-card-title>
        <span class="subheading mb-0">
          <v-icon>domain</v-icon>
          {{domain=='main'?'主区':domain=='inv'?'创新区':domain=='vc'?'创投区':'天使轮'}}
        </span>

      </v-card-title>
      <v-card-text class="pa-0">
        <v-data-table :headers="headers" :items="market.groups[pair][domain]" hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.priceData.close }}</td>
            <td>{{ props.item.priceData.priceChange }}</td>
            <td>{{ props.item.priceData.high }}</td>
            <td>{{ props.item.priceData.low }}</td>
            <td>{{ props.item.priceData.volume }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    pair: { default: "USDT" },
    domain: { default: "main" }
  },
  computed: {
    ...mapState(["market"])
  },
  mounted() {
    console.log(this.market.groups[this.pair][this.domain]);
  },
  data() {
    return {
      headers: [
        {
          text: "交易对",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "最新价格", value: "close" },
        { text: "24小时波动", value: "priceChange" },
        { text: "24h高点", value: "high" },
        { text: "24h低点", value: "low" },
        { text: "24h交易量", value: "volume" }
      ],
      desserts: [
        {
          value: false,
          name: "Frozen Yogurt",
          close: 159,
          priceChange: 6.0,
          high: 24,
          low: 4.0,
          volume: "1%"
        }
      ]
    };
  }
};
</script>
<style>
</style>

<style lang="stylus" scoped>
.pairstable {
  margin-top: 1px;
}
</style>


