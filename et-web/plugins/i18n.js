import ax from 'axios'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default async ({
  app,
  store,
  env,
  route
}) => {
  if (!route.name) return

  let cn = require('~/locales/cn.json')
  let en = require('~/locales/en.json')

  //banner信息
  var home = `http${env.api.safe?'s':''}://www.${env.api.domain}`

  if (route.name == "index" || /^\/sound/.test(route.path)) {
    try {
      
      let {
        data: cn_banner
      } = await ax.get(home + '/banner/banner_cn.json')
      let {
        data: en_banner
      } = await ax.get(home + '/banner/banner_en.json')
      //公告信息
      let {
        data: cn_notice
      } = await ax.get(home + '/notice/notice_cn.json')
      let {
        data: en_notice
      } = await ax.get(home + '/notice/notice_en.json')

      let cn_sound = [],
        en_sound = []

      if (cn_notice) {

        //听你说
        let num = parseInt(/(?<=\/)\d+$/.exec(cn_notice[1].url)[0])

        for (let i = 1; i <= num; i++) {
          let cn_stage = await ax.get(home + '/sound/stage' + i + '/cn.json')
          let en_stage = await ax.get(home + '/sound/stage' + i + '/en.json')
          cn_sound.push(cn_stage.data)
          en_sound.push(en_stage.data)
        }
        // 'sound/stage' +
      }
      cn.static = {
        banner: cn_banner,
        notice: cn_notice,
        sound: cn_sound
      }
      en.static = {
        banner: en_banner,
        notice: en_notice,
        sound: en_sound
      }
    } catch {}
  }

  //app加附属性，可在middleware和pages的asyncData/fetch中使用
  app.i18n = new VueI18n({
    locale: store.state.lan.locale,
    fallbackLocale: 'cn',
    messages: {
      'cn': cn,
      'en': en,
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}