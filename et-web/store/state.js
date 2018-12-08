export default () => ({
  user: {
    pn: null //登录凭证
  },
  et: {
    etBtc: 0, //当天交易量,以btc计
    volAll: 0, //总流通量
  },
  lang: {
    //国际化
    locales: ['cn', 'en'],
    locale: 'cn'
  },
  api: {
    safe: false,
    domain: ''
  },
  theme: {
    dark: true
  },
  test: {
    time: 1
  },

  market: {
    pairs: [], //交易对信息
    bars: [], //k线数据
    groups:{
      
    }
    // pairPrices: [] //首页价格数据
  }
})