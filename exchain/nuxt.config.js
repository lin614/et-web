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
      {
        hid: 'description',
        name: 'description',
        content: '{{escape description }}'
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
  loading: {
    color: '#3B8070'
  },
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
