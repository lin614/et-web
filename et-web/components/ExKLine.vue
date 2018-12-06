<template>
  <div
    id="tv_chart_container"
    
  ></div>
</template>

<script>
// import bb from "./js/charting_library.min";
import aa from "./js/datafeed.js";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export default {
  name: "ExKLine",

  mounted() {
    // debugger;
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    const widgetOptions = {
      // debug: true, // uncomment this line to see Library errors and warnings in the console
      fullscreen: true,
      symbol: "AAPL",
      interval: "D",
      container_id: "tv_chart_container",

      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        "https://demo_feed.tradingview.com"
      ),
      library_path: "charting_library/",
      locale: 'zh', //getParameterByName("lang") || "en",

      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "http://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      theme: getParameterByName("theme")
    };

    // TradingView.onready(function() {
      // debugger;
      var widget = (window.tvWidget = new TradingView.widget(widgetOptions));
    // });
  }
};
</script>

<style lang="stylus" scoped>
.TVChartContainer {
  height: calc(100vh - 80px);
}
</style>
