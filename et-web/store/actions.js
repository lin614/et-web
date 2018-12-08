import ax from 'axios'
let getService = (action, home) => {
    return ax.get(action, {
        headers: {
            'Referer': home
        }
    })
}
export default {
    async nuxtServerInit(context) {
        await context.dispatch("initPairs");
        await context.dispatch('upEt')
    },
    //首页et信息更新
    async upEt({
        commit,
        getters
    }) {
        let etBtc = await ax.get(getters.service + '/api/quotation/getQuantAmount')
        let volAll = await ax.get(getters.stats + '/api/exet/stats/etCirculate')
        let et = (etBtc.status != '200' && etBtc.data.errorCode == '0') ? etBtc.data.result.total : 0
        let vol = (volAll.status != '200' && volAll.data.errorCode == '0') ? volAll.data.data.etCirculate : 0
        commit('upEt', [etBtc.data.result.total, volAll.data.data.etCirculate])
    },
    //获取所有交易对
    async initPairs({
        commit,
        getters
    }) {
        // ax.defaults.headers.post['Referer'] = getters.home
        let res = await getService(getters.service + '/api/exchange/getMarketInfo', getters.home)
        res.status == '200' && res.data.errorCode == 0 && commit('setPairs', res.data.result)
    },
    async initBars({
        commit,
        getters
    }) {
        // ax.defaults.headers.post['Referer'] = getters.home
        let res = await getService(getters.service + '/api/v1-b/market/price_change?markets=' + getters.pairsStr, getters.home)
        res.status == '200' && res.data.errorCode == 0 && commit('setBars', res.data.result)

    },
    async initPrices({
        commit,
        getters
    }) {
        // ax.defaults.headers.post['Referer'] = getters.home
        let res = await getService(getters.service + '/api/v1-b/market/price_change?markets=' + getters.pairsStr, getters.home)
        res.status == '200' && res.data.errorCode == 0 && commit('setPrices', res.data.result)

    }
}