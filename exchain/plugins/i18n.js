import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default ([app, store]) => {
  //app加附属性，可在middleware和pages的asyncData/fetch中使用
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'cn',
    messages: {
      'cn': require('~/locales/cn.js'),
      'en': require('~/locales/en.js')
    }
  })

}
app.i18n.path = (link) => {
  if (app.i18n.locale === app.i18n.fallbackLocale) {
    return `/${link}`
  }

  return `/${app.i18n.locale}/${link}`
}
