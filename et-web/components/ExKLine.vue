<template>
  <div class="kline">
    <div id="tv_chart_container" style=""></div>
  </div>
</template>

<script>
import datafeed from "@/js/datafeed.js";
import tvconfig from "@/js/tvConfig.js";
import { mapState } from "vuex";
export default {
  name: "ExKLine",
  watch: {
    lang: (n, o) => {
      debugger;
    }
  },
  computed: {
    ...mapState(["lang"])
  },
  mounted() {
    let opt = Object.assign(tvconfig, {
      container_id: "tv_chart_container",
      //	BEWARE: no trailing slash is expected in feed URL
      // datafeed: new Datafeeds.UDFCompatibleDatafeed(
      //   "https://demo_feed.tradingview.com"
      // ),
      // symbol: "AAPL",
      symbol: "BTC/USDT",
      datafeed: datafeed(this),

      locale: this.$store.state.lang.locale == "cn" ? "zh" : "en",

      theme: this.$store.state.theme.dark
    });
    var widget = (window.tvWidget = new TradingView.widget(opt));
    let updateSelectedIntervalButton = function(button) {
      widget.selectedIntervalButton &&
        widget.selectedIntervalButton.removeClass("selected");
      button.addClass("selected");
      widget.selectedIntervalButton = button;
    };
    widget.onChartReady(() => {
      let chart = widget.chart();
      const btnList = [
        {
          class: "resolution_btn",
          label: "分时",
          resolution: "1",
          chartType: 3
        },
        {
          class: "resolution_btn",
          label: "1m",
          resolution: "1"
        },
        {
          class: "resolution_btn",
          label: "5m",
          resolution: "5"
        },
        {
          class: "resolution_btn",
          label: "15m",
          resolution: "15"
        },
        {
          class: "resolution_btn",
          label: "30m",
          resolution: "30"
        },
        {
          class: "resolution_btn",
          label: "1h",
          resolution: "60"
        },
        {
          class: "resolution_btn",
          label: "2h",
          resolution: "120"
        },
        {
          class: "resolution_btn",
          label: "4h",
          resolution: "240"
        },
        {
          class: "resolution_btn",
          label: "8h",
          resolution: "480"
        },
        {
          class: "resolution_btn",
          label: "1D",
          resolution: "1D"
        },
        {
          class: "resolution_btn",
          label: "1W",
          resolution: "1W"
        },
        {
          class: "resolution_btn",
          label: "1M",
          resolution: "1M"
        }
      ];
      chart.onIntervalChanged().subscribe(null, function(interval, obj) {
        widget.changingInterval = false;
      });
      btnList.forEach(function(item) {
        let button = widget.createButton({
          align: "left"
        });
        item.resolution === widget._options.interval &&
          updateSelectedIntervalButton(button);
        button
          .attr("class", "button " + item.class)
          .attr(
            "data-chart-type",
            item.chartType === undefined ? 1 : item.chartType
          )
          .on("click", function(e) {
            if (!widget.changingInterval && !button.hasClass("selected")) {
              let chartType = +button.attr("data-chart-type");
              // let resolution = button.attr("data-resolution");
              if (chart.resolution() !== item.resolution) {
                widget.changingInterval = true;
                chart.setResolution(item.resolution);
              }
              if (chart.chartType() !== chartType) {
                chart.setChartType(chartType);
              }
              updateSelectedIntervalButton(button);
            }
          })
          .append(item.label);
      });
      widget
        .chart()
        .createStudy("Moving Average", false, true, [5, "close", 0], null, {
          "Plot.color": "#7D53A8"
        });
      widget
        .chart()
        .createStudy("Moving Average", false, true, [10, "close", 0], null, {
          "Plot.color": "#7699C2"
        });
      widget
        .chart()
        .createStudy("Moving Average", false, true, [30, "close", 0], null, {
          "Plot.color": "#A0D75B"
        });
      // debugger;
    });
  }
};
</script>

<style lang="stylus" scoped>
.kline {
  width: 100%;
  margin: 0 auto;
  height: calc(100%);
}

#tv_chart_container {
  height: 100%;
  width: 100%;
}
</style>
