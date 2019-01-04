<template>
  <div>
    <Tabs
      value="tab1"
      :animated="false"
      @on-click="clickTab"
    >
      <TabPane
        label="当前竞猜"
        name="tab1"
      >
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
      </TabPane>
      <TabPane
        label="历史竞猜"
        name="tab2"
      >
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
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import ax from "axios";
import config from "../../config/config.js";
import cookie from "js-cookie";
ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})
export default {
  props: ["detail"],
  data() {
    return {
      col1: [
        {
          title: "时间",
          key: "time"
        },
        {
          title: "竞猜涨跌",
          key: "ud"
        },
        {
          title: "竞猜金额",
          key: "mon"
        },
        {
          title: "竞猜结果",
          key: "sta"
        }
      ],
      col2: [
        // ...col1,
        {
          title: "时间",
          key: "time"
        },
        {
          title: "竞猜涨跌",
          key: "ud"
        },
        {
          title: "竞猜金额",
          key: "mon"
        },
        {
          title: "竞猜结果",
          key: "sta"
        },
        {
          title: "获得ET",
          key: "etgot"
        }
      ],
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
          uid: cookie.get("uid", { domain: config.url.domain })
        };
        ax.post(config.url.guess + "/api/guess/queryGuessOrders", parms).then(
          res => {
            if (res.status == "200" && res.data.meta.code == "0") {
              let list = res.data.data.list.map(p => {
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
          }
        );
      };
      func("now", list => {
        vu.listTodayAll = list;
        vu.changeTodayPage(vu.page1);
      });
      func("history", list => {
        vu.listHisAll = list;
        vu.changeHisPage(vu.page2);
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
    bus.$on("upInfo", () => {
      vu.getOrders();
    });
  }
};
</script>
<style>
.ivu-tabs-bar {
  margin-bottom: 0px !important;
}
</style>


