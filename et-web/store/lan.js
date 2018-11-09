export const state = () => ({
    //国际化
    lang: {
        locales: ['cn', 'en'],
        locale: 'cn'
    }
})
export const mutations = {
    set_lang(state, locale) {
        state.lang.locales.includes(locale) && (state.lang.locale = locale)
    }
}