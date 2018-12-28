import ax from 'axios'
import {toParmStr} from '@/js/utils/util.js'

let getService = (action, home) => {
    return ax.get(action, {
        headers: {
            'Referer': home
        }
    })
}
let postService = (action, data) => {
    return ax.post(action, data)
}
export default {
    async nuxtServerInit(context) {
        await context.dispatch("initPairs");
        // await context.dispatch('upEt')
    },
    //首页et信息更新
    async upEt({
        commit,
        getters
    }) {
        try {
            let etBtc = await ax.get(getters.service + '/api/quotation/getQuantAmount')
            let volAll = await ax.get(getters.stats + '/api/exet/stats/etCirculate')
            let et = (etBtc.status != '200' && etBtc.data.errorCode == '0') ? etBtc.data.result.total : 0
            let vol = (volAll.status != '200' && volAll.data.errorCode == '0') ? volAll.data.data.etCirculate : 0
            commit('upEt', [etBtc.data.result.total, volAll.data.data.etCirculate])
        } catch (e) {
            console.log(e)
        }
    },
    //获取所有交易对
    async initPairs({
        commit,
        getters
    }) {
        try {
            // ax.defaults.headers.post['Referer'] = getters.home
            let res = await getService(getters.service + '/api/exchange/getMarketInfo', getters.home)
            res.status == '200' && res.data.errorCode == 0 && commit('setPairs', res.data.result)
        } catch (e) {
            console.log(e)
        }
    },
    async initBars({
        commit,
        getters
    }) {
        try {
            // ax.defaults.headers.post['Referer'] = getters.home
            let res = await getService(getters.service + '/api/v1-b/market/price_change?markets=' + getters.pairsStr, getters.home)
            res.status == '200' && res.data.errorCode == 0
        } catch (e) {
            console.log(e)
        }

    },
    async initPrices({
        commit,
        getters
    }) {
        // ax.defaults.headers.post['Referer'] = getters.home

        try {
            let res = await getService(getters.service + '/api/v1-b/market/price_change?markets=' + getters.pairsStr, getters.home)
            res.status == '200' && res.data.errorCode == 0 && commit('setPrices', res.data.result)

        } catch (e) {
            console.log(e)
        }
    },

    login({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/login', data)
            .then((res) => {
                res.status == '200' && res.data.errorCode == 0 && commit('setUserInfo', res.data.result)
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    register({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/register', data)
            .then((res) => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    verifyRegister({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/verifyRegister', data)
            .then((res) => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    verifyResetPassword({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/verifyResetPassword', data)
            .then((res) => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    resetPassword({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/resetPassword', data)
            .then((res) => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    initCaptcha({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/initCaptcha', data)
            .then((res) => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error)
        });
    },

    getKlineHistory({commit,getters}, data) {
        return new Promise((resolve, reject) => {
            getService(getters.service + '/api/quotation/klineHistoryTradingView?' + toParmStr(data))
            .then((res) => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            });
        });
    }
}