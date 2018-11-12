export const state = () => ({
    //首页信息展示
    etBtc: 0, //当天交易量,以btc计
    volAll: 0 //总流通量

})
export const mutations = {
    upEt(state, etBtc, volAll) {
        state.etBtc = etBtc
        state.volAll = volAll
    },

}

export const actions = {
    async upEt({
        getters
    }) {
       
    }
}