export default {
    //api url
    service(state) {
        return `http${state.api.safe?'s':''}://service.${state.api.domain}` //api接口主要地址,
    },
    invite(state) {
        return `http${state.api.safe?'s':''}://invite.${state.api.domain}` //邀请相关接口地址
    },
    stats(state) {
        return `http${state.api.safe?'s':''}://stats.${state.api.domain}` //et信息接口地址
    },
    ws(state) {
        return `ws${state.api.safe?'s':''}://service.${state.api.domain}/wsapp/` //行情订阅接口
    },
    home(state) {
        return `http${state.api.safe?'s':''}://www.${state.api.domain}`
    },
    //免费期时间
    dayNum(state) {
        let tn = Math.floor(
            (new Date().getTime() - new Date('2018', '9', '6').getTime()) /
            (60 * 60 * 24 * 1000)
        )
        return tn < 0 ? '90' : 90 - tn
    },
    //是否打印控制台信息
    showLog(state) {
        return localStorage.getItem('showConsoleLog')
    },
    //平台支持的所有交易对
    pairsStr(state) {
        return state.market.pairs.map(p => p.name).join(',')
    },
}