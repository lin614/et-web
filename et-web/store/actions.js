import ax from 'axios'
export default {
    // async nuxtServerInit(context) {
    //     console.log('nuxtServerInit',context)
    //     await context.dispatch('upEt')
    // },
    //首页et信息更新
    async upEt({
        commit,
        getters
    }) {
        let etBtc = await ax.get(getters.service + '/api/quotation/getQuantAmount')
        let volAll = await ax.get(getters.stats + '/api/exet/stats/etCirculate')

        if (etBtc.status == '200' || volAll.status == '200') {
            console.error('upEt error')
            return
        }
        etBtc.data && volAll.data && commit('upEt', [etBtc.data.result.total, volAll.data.data.etCirculate])
    }
}