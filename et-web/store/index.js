export const state = () => ({
  locales: ['cn', 'en'],
  locale: 'cn'
})
export const mutations = {
  set_lang(state, locale) {
    state.locales.includes(locale) && (state.locale = locale)
  }
}