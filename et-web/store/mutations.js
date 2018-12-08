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
    setTime(state) {
        state.test.time++
    },
    setPairs(state, pairs) {
        let list = []
        for (let p in pairs) {
            list.push({
                symbol: p,
                ...pairs[p]
            })
        }

        state.market.pairs = list

    },
    //k线数据
    setBars(state, bars) {
        state.market.bars = bars
    },
    //首页交易对价格数据
    setPrices(state, data) {
        state.market.prices = data
    }
}