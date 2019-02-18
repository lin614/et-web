import ax from 'axios'
import cookie from 'js-cookie'
import Vue from 'Vue'
import { toParmStr } from '@/js/utils/util.js'

let vue = new Vue();

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
        let res = await getService(getters.service + '/api/exchange/getMarketInfo', getters.home)
        res.status == '200' && res.data.errorCode == 0 && commit('setPairs', res.data.result)
    },
    async initBars({
        commit,
        getters
    }) {
        try {
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
        try {
            let res = await getService(getters.service + '/api/v1-b/market/price_change?markets=' + getters.pairsStr, getters.home)
            res.status == '200' && res.data.errorCode == 0 && commit('setPrices', res.data.result)

        } catch (e) {
            console.log(e)
        }
    },

    getUserInfo({ commit, getters, state }, data) {
        ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/getUserInfo', data)
                .then((res) => {
                    res.status == '200' && res.data.errorCode == 0
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    login({ commit, getters }, data) {
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

    register({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/register', data)
                .then((res) => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    getPhoneCode({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/account/getPhoneCode', data)
                .then(res => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error);
        })
    },

    getEmailCode({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/account/getEmailCode', data)
                .then(res => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error);
        })
    },

    logout({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/logout', data)
                .then((res) => {
                    commit('setUserInfo', {})
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    verifyRegister({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/verifyRegister', data)
                .then((res) => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    verifyResetPassword({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/verifyResetPassword', data)
                .then((res) => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    resetPassword({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/resetPassword', data)
                .then((res) => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    initCaptcha({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/user/initCaptcha', data)
                .then((res) => {
                    resolve(res.data)
                })
        }).catch(error => {
            reject(error)
        });
    },

    getKlineHistory({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.service + '/api/quotation/klineHistoryTradingView?' + toParmStr(data))
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    queryGuessInfo({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.guess + '/api/guess/queryGuessInfo')
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    queryBTCPrice({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.guess + '/api/guess/queryBTCPrice')
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },


    queryLastGuessTops({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.guess + '/api/guess/queryLastGuessTops')
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    queryGuessSum({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.guess + '/api/guess/queryGuessSum', data)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    submitGuess({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            postService(getters.guess + '/api/guess/submit', data)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    queryGuessOrders({ commit, getters, state }, data) {
        ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });
        return new Promise((resolve, reject) => {
            postService(getters.guess + '/api/guess/queryGuessOrders', data)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    getAssetsList({ commit, getters, state }, data) {
        ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/account/assetsList', data)
                .then((res) => {
                    let result = []
                    if (res.data.errorCode === 0) {
                        let assetList = res.data.result
                        for (var key in assetList) {
                            let obj = {}
                            obj.account_available = assetList[key].account_available
                            obj.btc = assetList[key].btc
                            obj.withdraw_fee = assetList[key].withdraw_fee
                            obj.exchange_available = assetList[key].exchange_available
                            obj.exchange_freeze = assetList[key].exchange_freeze
                            obj.token = key
                            obj.isSmallAmount = assetList[key].btc < 0.0001
                            result.push(obj)
                        }
                    }
                    resolve({ errorCode: res.data.errorCode, errorMsg: res.data.errorMsg, result: result })
                })
        }).catch(error => {
            reject(error)
        });
    },

    getAssetsList2({ commit, getters, state }, data) {
        ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });

        return new Promise((resolve, reject) => {
            ax.all([
                postService(getters.service + '/api/account/assetsList', data),
                getService(getters.service + '/api/quotation/getSymbolLists')
            ])
                .then(
                    ax.spread((assets, symbol) => {
                        let result = []
                        if (assets.data.errorCode === 0 && symbol.data.errorCode === 0) {
                            let assetList = assets.data.result
                            let symbolList = symbol.data.result
                            for (var key in assetList) {
                                let obj = {}
                                obj.account_available = assetList[key].account_available
                                obj.btc = assetList[key].btc
                                obj.withdraw_fee = assetList[key].withdraw_fee
                                obj.exchange_available = assetList[key].exchange_available
                                obj.exchange_freeze = assetList[key].exchange_freeze
                                obj.token = key
                                obj.isSmallAmount = assetList[key].btc < 0.0001

                                // 精度，提现，充值配置
                                obj.recharge = symbolList[key].recharge
                                obj.withdraw = symbolList[key].withdraw
                                obj.decimal = symbolList[key].decimal
                                obj.trade = symbolList[key].trade
                                obj.recharge_min = symbolList[key].recharge_min
                                obj.withdraw_max = symbolList[key].withdraw_max
                                obj.withdraw_min = symbolList[key].withdraw_min

                                result.push(obj)
                            }
                        }
                        resolve({ errorCode: assets.data.errorCode || symbol.data.errorCode, errorMsg: assets.data.errorMsg || symbol.data.errorMsg, result: result })
                    })
                )
        }).catch(error => {
            reject(error)
        })
    },

    getAddress({ commit, getters, state }, data) {
        ax.defaults.headers.get['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });
        return new Promise((resolve, reject) => {
            getService(getters.service + '/api/account/getAddress?type=' + data.token)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        })
    },

    withdraw({ commit, getters, state }, data) {
        ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', { domain: state.api.domain });
        return new Promise((resolve, reject) => {
            postService(getters.service + '/api/account/withdraw', data)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    transferToExchange({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.service + '/api/account/toExchange?type=' + data.transferToken + '&balance=' + data.transferAmount)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },

    transferToAccount({ commit, getters }, data) {
        return new Promise((resolve, reject) => {
            getService(getters.service + '/api/exchange/toAccount?type=' + data.transferToken + '&balance=' + data.transferAmount)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                });
        });
    },
}