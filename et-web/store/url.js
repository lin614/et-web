export const state = () => ({
    safe: false, //true:https,wss,false:http,ws
    domain: 'exchain.com',
})
export const getters = {
    service(state) {
        return `http${state.safe?'s':''}://service.${state.domain}` //api接口主要地址
    },
    invite(state) {
        return `http${state.safe?'s':''}://invite.${state.domain}` //邀请相关接口地址
    },
    stats(state) {
        return `http${state.safe?'s':''}://stats.${state.domain}` //et信息接口地址
    },
    ws(state) {
        return `ws${state.safe?'s':''}://service.${state.domain}/wsapp/` //行情推送接口地址
    },
    home(state) {
        return `http${state.safe?'s':''}://www.${state.domain}` //本地资源地址
    }
}