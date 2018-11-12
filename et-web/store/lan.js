export const state = () => ({
    //国际化
    locales: ['cn', 'en'],
    locale: 'cn'
})
export const mutations = {
    set_lang(state, locale) {
        state.locales.includes(locale) && (state.locale = locale)
    },
    set_messages(state, {
        cn,
        en
    }) {
        state.messages.cn = cn
        state.messages.en = en
    }
}