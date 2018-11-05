module.exports = {
  //server配置
  server: {
    port: 8000,
    host: '127.0.0.1'
  },
  //vue.config
  vue: {
    config: {
      productTip: false,
      devtools: true
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    title: '{{ name }}',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { // set meta
        name: 'keyWords',
        content: 'Exchain、Exchain交易所、交易所、买币、比特币、ETH、BTC、以太坊、USDT、ET、交易即挖矿、合作伙伴'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Exchain交易所，全球首家共享型交易平台，以用户需求为核心，打造“共有、共享、共治、透明开放互惠性交易平台。交易即入股分享100%平台收益，同时有限时免交易费，合作伙伴奖励等活动与用户共建交易所。'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  plugins: [{
    src: '~plugins/iview',
    ssr: true
  }],
  /*
   ** Customize the progress bar color
   */
  loading: '~/components/loading.vue',
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
