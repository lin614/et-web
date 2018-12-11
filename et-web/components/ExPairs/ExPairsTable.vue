<template>
  <div class="pairstable">
    <v-hover>
      <v-card width="1200" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`">
        <v-card-title>
          <span class="subheading mb-0">{{domain=='main'?'主区':domain=='inv'?'创新区':domain=='vc'?'创投区':'天使轮'}}
          </span>

        </v-card-title>
        <v-card-text class="pa-0">
          <v-data-table :headers="headers" :items="desserts" hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.close }}</td>
              <td>{{ props.item.priceChange }}</td>
              <td>{{ props.item.high }}</td>
              <td>{{ props.item.low }}</td>
              <td>{{ props.item.volume }}</td>
              <!-- <td class="text-xs-right">{{ props.item.volume }}</td> -->
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-hover>

  </div>
</template>
<script>
export default {
  props: {
    domain: { default: "main" }
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
<style lang="stylus" scoped>
.pairstable{
  margin-top:1px;
}
</style>


