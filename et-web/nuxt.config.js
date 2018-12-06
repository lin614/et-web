export default {
  env: {
    api: {
      safe: true, //true:https,wss,false:http,ws
      domain: 'exchain.com',

    }
  },

  /*
   ** Headers of the page
   */

  head: {
    title: 'et-web',
    script: [{
      src: '/charting_library/charting_library.min.js'
    }, {
      src: '/datafeeds/udf/dist/bundle.min.js'
    }, {
      src: '/datafeeds/udf/dist/polyfills.js'
    }],
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
  router: {
    middleware: 'i18n'
  },
  plugins: [{
      src: '~/plugins/localStorage.js',
      ssr: false
    }, {
      src: '~plugins/ws.js',
      ssr: false
    },
    '~/plugins/vuetify.js', '~/plugins/axios.js', '~/plugins/i18n.js', '~plugins/echarts.js'
  ],
  generate: {
    routes: ['/', '/inspire', '/en', '/en/inspire']
  },
  css: [
    '~/assets/style/app.styl', '~/assets/style/iconfont.css'
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
    // vendor: ['~/js/charting_library.min.js'],
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