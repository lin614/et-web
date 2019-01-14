<template>
  <div>
    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
      <v-tab v-for="(o, n) in tabs" :key="n" ripple>{{ o.label }}</v-tab>
      <v-tab-item>
        <v-data-table :headers="curHeaders" :items="curData" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.time }}</td>
            <td class="text-xs-right">{{ props.item.ud }}</td>
            <td class="text-xs-right">{{ props.item.mon }}</td>
            <td class="text-xs-right">{{ props.item.carstabs }}</td>
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item>
        <v-data-table :headers="hisHeaders" :items="hisData" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.time }}</td>
            <td class="text-xs-right">{{ props.item.ud }}</td>
            <td class="text-xs-right">{{ props.item.mon }}</td>
            <td class="text-xs-right">{{ props.item.sta }}</td>
            <td class="text-xs-right">{{ props.item.etgot }}</td>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs>

    <!-- 
      
        <Table
          size="large"
          :columns="col1"
          :data="listToday"
        ></Table>
        <Page
          v-if="detail&&listTodayAll.length>pagesize"
          @on-change="changeTodayPage"
          :total="listTodayAll.length"
          :page-size="pagesize"
          :current.sync="page1"
          size="small"
          style="margin-top:20px;"
        />
     
     
        <Table
          size="large"
          :columns="col2"
          :data="listHis"
        ></Table>
        <Page
          v-if="detail&&listHisAll.length>pagesize"
          @on-change="changeHisPage"
          :total="listHisAll.length"
          :page-size="pagesize"
          :current.sync="page2"
          size="small"
          style="margin-top:20px;"
        />
     -->
  </div>
</template>
<script>
import ax from "axios";
// import config from "../../config/config.js";
import cookie from "js-cookie";

export default {
  props: ["detail"],
  data() {
    return {
      active: 0,
      tabs: [{
        label: '当前竞猜',
        name: 'tab1'
      }, {
        label: '历史竞猜',
        name: 'tab2'
      }],
      curHeaders: [
        { text: '时间', value: 'time' },
        { text: '竞猜涨跌', value: 'ud' },
        { text: '竞猜金额', value: 'mon' },
        { text: '竞猜结果', value: 'carstabs' }
      ],
      hisHeaders: [
        { text: '时间', value: 'time' },
        { text: '竞猜涨跌', value: 'ud' },
        { text: '竞猜金额', value: 'mon' },
        { text: '竞猜结果', value: 'sta' },
        { text: '获得ET', value: 'etgot' }
      ],
      curData: [],
      hisData: [],
      pagesize: 10,
      listToday: [],
      listTodayAll: [],
      listHis: [],
      listHisAll: [],
      page1: 1,
      page2: 1
    };
  },
  methods: {
    getOrders() {
      let vu = this;
      let func = (type, callback) => {
        let parms = {
          pageNum: 1,
          pageSize: this.detail ? 1000 : 10,
          type: type,
          uid: cookie.get("uid", { domain: this.$store.state.api.domainName })
        };

        this.$store.dispatch('queryGuessOrders', parms).then(
          res => {
            let list = res.data.list.map(p => {
              return {
                time: p.createTime,
                ud: p.sides == 1 ? "看涨" : "看跌",
                mon: p.amount,
                sta:
                  type == "now"
                    ? "竞猜中"
                    : p.winAmount > 0
                    ? "中奖"
                    : "未中奖",
                etgot: p.winAmount
              };
            });
            callback(list);
          }
        );
      };
      func("now", list => {
        vu.curData = list;
        // vu.changeTodayPage(vu.page1);
      });
      func("history", list => {
        vu.hisData = list;
        // vu.changeHisPage(vu.page2);
      });
    },
    changeTodayPage(page) {
      this.listToday = this.listTodayAll.slice(
        this.pagesize * (page - 1),
        this.pagesize * page
      );
    },
    changeHisPage(page) {
      this.listHis = this.listHisAll.slice(
        this.pagesize * (page - 1),
        this.pagesize * page
      );
    },
    clickTab (e) {
      this.page1 = 1;
      this.page2 = 1;
    }
  },
  created() {
    this.getOrders();
  },
  mounted() {
    let vu = this;
    // bus.$on("upInfo", () => {
    //   vu.getOrders();
    // });
  }
};
</script>
<style>
.ivu-tabs-bar {
  margin-bottom: 0px !important;
}
</style>


