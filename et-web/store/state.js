export default (localStorage) => ({
  user: {
    pn: null, //登录凭证,
    email: null, // 
    mtime: null //
  },
  et: {
    etBtc: 0, //当天交易量,以btc计
    volAll: 0, //总流通量
  },
  lang: {
    //国际化
    locales: ['cn', 'en'],
    locale: () => {
      if (localStorage.exchain) {
        let lang = JSON.parse(localStorage.exchain).lang.locale
        return lang.locale ? lang.locale : 'cn'
      } else {
        return 'cn'
      }
    }
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