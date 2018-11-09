export default {
  env: {
    api: {
      safe: false, //true:https,wss,false:http,ws
      domain: 'exchain.com',
      // url(sub = 'service') {
      //   return `http${this.safe?'s':''}://${sub}.${this.domain}`
      // },
      // ws() {
      //   return `ws${this.safe?'s':''}://${sub}.${this.domain}/wsapp/`
      // },
      // home() {
      //   return `http${this.safe?'s':''}://www.${this.domain}`
      // }
      // fee: 'http://stats.exchain.com', //首页待分配收入api地址
      // invite: 'http://invite.exchain.com', //邀请相关接口地址
      // ser: 'http://service.exchain.com', //登录注册相关接口（主api)
      // quote: 'ws://service.exchain.com/wsapp/', //行情相关接口
      // domain: 'exchain.com',
      // trade: 'http://www.exchain.com:81', //交易

      // https
      // fee: 'https://stats.exchain.com', //首页待分配收入api地址
      // invite: 'https://invite.exchain.com', //邀请相关接口地址
      // user: 'https://service.exchain.com', //登录注册相关接口（主api)
      // quote: 'wss://service.exchain.com/wsapp/', //行情相关接口
      // domain: 'exchain.com',
      // trade: 'https://www.exchain.com:44381' //交易
    },
  },
  router: {
    middleware: 'axios'
  },
  /*
   ** Headers of the page
   */

  head: {
    title: 'et-web',
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
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
   ** Customize the progress bar color
   */
  // loading: {
  //   color: '#3B8070'
  // },
  loading: '~/components/loading.vue',
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev
    }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}