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
    setUserInfo(state, data) {
        state.user.email = data.email || null
        state.user.mtime = data.mtime || null
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
        let group = {}
        for (let p in pairs) {
            let info = {
                name: p,
                ...pairs[p]
            }
            list.push(info)
            let coin = p.split('/')[1]
            group[coin] || (group[coin] = {})
            group[coin][pairs[p].domain] || (group[coin][pairs[p].domain] = [])
            group[coin][pairs[p].domain].push(info)
        }

        state.market.pairs = list
        state.market.groups = group
    },
    //k线数据
    setBars(state, bars) {
        state.market.bars = bars
    },
    //首页交易对价格数据
    setPrices(state, data) {
        data.forEach(p => {
            let info = state.market.pairs.filter(c => c.name == p.name)[0]

            info && (info.priceData = p)
        })
    }
}