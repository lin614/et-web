export default {
    setApi(state, api) {
        state.api = api
    },
    upEt(state, [etBtc, volAll]) {

        state.et.etBtc = etBtc
        state.et.volAll = volAll
    },
    set_lang(state, locale) {
        state.lang.locales.includes(locale) && (state.lang.locale = locale)
    },
    set_messages(state, {
        cn,
        en
    }) {
        state.lang.messages.cn = cn
        state.messages.en = en
    },
    set_dark(state, dark) {
        state.theme.dark = dark
    },

}