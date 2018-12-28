<template>
  <div :class="['exchange', theme]">
    <!-- {{$store.state.market.bars}} -->
    <div class="ticker">
      <!-- <span stop="1" class="symbol-name">BTC/USDT</span>
      <div class="price-container">
        <span class="price color-up ">3800.65</span>
        <span class="estimate">≈ 26414.51 CNY</span>
      </div>
      <dl class="change">
        <dt>涨幅</dt>
        <dd class="color-up">+3.05%</dd>
      </dl>
      <dl class="high">
        <dt>最高价</dt>
        <dd>3830.00</dd>
      </dl>
      <dl class="low">
        <dt>最低价</dt>
        <dd>3660.03</dd>
      </dl>
      <dl class="amount">
        <dt>24H量</dt>
        <dd>27,980 BTC</dd>
      </dl> -->
      <span class="fr theme" @click="updateWidget">换肤</span>
    </div>
    <div id="tv_chart_container"></div>
  </div>
</template>

<script>
// import bb from "./js/charting_library.min";
import datafeed from "@/js/datafeed.js";

export default {
  name: "ExKLine",

  props: ['symbol'],

  data() {
    return {
      period: '1min',
      noDataFlag: 0,
      color: '#fff',
      pricescale: 2,
      widget: null,
      theme: this.getParameterByName("theme") || 'Dark',
      onRealtimeCallback: null
    }
  },

  computed: {
    // k 线订阅频道
    channel: function() {
        return `huobi.market.${this.name}.kline.${this.period}`
    },
    // 币对名，小写
    name() {
        let arr = this.symbol.split('/')
        return arr.join('').toLowerCase();
    },
    kline() {
      this.$store.state.market.bars.forEach(item => {
          this.onRealtimeCallback({
              time: Number(item[0]),
              open: Number(formatMarketPrecision(item[1], this.symbol, 'price', this)),
              high: Number(formatMarketPrecision(item[2], this.symbol, 'price', this)),
              low: Number(formatMarketPrecision(item[3], this.symbol, 'price', this)),
              close: Number(formatMarketPrecision(item[4], this.symbol, 'price', this)),
              volume: Number(formatMarketPrecision(item[5], this.symbol, 'amount', this))
          })
      })
      return this.$store.state.market.bars
    }
  },

  mounted() {
    this.createWidget();
  },

  methods: {        
    createWidget() {
      let vm = this;
      const widgetOptions = {
        debug: false,
        fullscreen: true,
        interval: "1",
        container_id: "tv_chart_container",
        symbol: this.symbol,
        datafeed: datafeed(this),
        library_path: "charting_library/",
        locale: this.getParameterByName("lang") || "zh",
        timezone: "Asia/Shanghai",
        disabled_features: ["use_localstorage_for_settings"],
        enabled_features: ["study_templates"],
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        theme: this.theme,
        // "volume_force_overlay"-交易量 "display_market_status"-正在加载 "context_menus"-左上角币信息的下拉框 "timeframes_toolbar"-底部时间
        disabled_features: [ "header_saveload", "header_symbol_search", "header_interval_dialog_button", "header_compare", "header_resolutions", "header_chart_type", "header_indicators", "header_screenshot", "header_undo_redo", "header_fullscreen_button", "header_settings", "volume_force_overlay", "display_market_status", "context_menus", "timeframes_toolbar" ],
        // 涨、跌、成交量透明度
        studies_overrides: { "volume.volume.color.0": "#fe4761", "volume.volume.color.1": "#3fcfb4", "volume.volume.transparency": 75, "moving.average.precision": 2 },
        overrides: {}
      };
      // widget
      this.widget = (window.tvWidget = new TradingView.widget(widgetOptions));
      let widget = this.widget;
      // n 日线
      widget.MAStudies = [];
      // 添加 n 日线和自定义时间频率按钮
      widget.onChartReady(function () {
        let chart = widget.chart();
        let mas = [
            {day: 5, color: "#821f68"},
            {day: 10, color: "#5c7798"},
            {day: 30, color: "#397d51"},
            {day: 60,  color: "#60407f"}
        ];
        let buttons = [
            {label: "分时", resolution: "1", chartType: 3, text: "1min"},
            {label: "1分", resolution: "1", text: "1min"},
            {label: "15分", resolution: "15", text: "15min"},
            {label: "1小时", resolution: "60", text: "1hour"},
            {label: "4小时", resolution: "240", text: "4hour"},
            {label: "1天", resolution: "1D", text: "1day"},
            {label: "5天", resolution: "5D", text: "5day"},
            {label: "1周", resolution: "7D", text: "1week"},
            {label: "1个月", resolution: "1M", text: "1mon"}
        ];
        
        mas.forEach(item => {
                chart.createStudy("Moving Average", false, false, [item.day], entity => {widget.MAStudies.push(entity);}, {"plot.color": item.color});
            }
        );

        buttons.forEach((item, index) => {
            let button = widget.createButton();
            item.resolution === widget._options.interval && updateSelectedIntervalButton(button);
            button
                .attr("data-resolution", item.resolution)
                .attr("data-chart-type", item.chartType === undefined ? 1 : item.chartType)
                .html("<span>"+ item.label +"</span>")
                .on("click", function() {
                    vm.period = item.text;
                    
                    if (!button.hasClass("selected")) {
                        let chartType = +button.attr("data-chart-type");
                        let resolution = button.attr("data-resolution");

                        if (chart.resolution() !== resolution) {
                            widget.changingInterval = true;
                            chart.setResolution(resolution);
                        }
                        if (chart.chartType() !== chartType) {
                            chart.setChartType(chartType);
                        }
                        updateSelectedIntervalButton(button);
                        showMAStudies(chartType !== 3);
                    }
            })
        });

        function updateSelectedIntervalButton(button) {
            widget.selectedIntervalButton && widget.selectedIntervalButton.removeClass("selected");
            button.addClass("selected");
            widget.selectedIntervalButton = button;
        }

        function showMAStudies(visible) {
            widget.MAStudies.forEach(item => {
                chart.setEntityVisibility(item, visible);
            })
        }
      });

      
    },
    getParameterByName(name) {
      if (global.location) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(global.location.search);
        return results === null
          ? ""
          : decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    },
    updateWidget(item) {
      this.theme = this.theme === 'Light' ? 'Dark' : 'Light'
      this.widget.changeTheme(this.theme);
    },
    subscribeChannel() {
      this.$send({
        event: 'sub',
        channel: this.channel,
        params: {
          market: `huobi`,
          name: this.name,
          peroid: this.period,
          type: 'market'
        }
      })
    },
  }
};
</script>

<style lang="stylus" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}

.ticker {
  height: 40px;
  margin-bottom: 7px;
}
.theme {
  margin: 10px 10px 10px 0px;
}
.exchange.Dark {
  background: #252a44;
}
.exchange.Light {
  background: #e5ebf5;
}
.Dark .ticker {
  background-color: #131722;
}
.Light .ticker {
  color: #333;
  background-color: #fff;
}
</style>
