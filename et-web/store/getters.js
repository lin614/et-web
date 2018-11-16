export default {
    service(state) {
        return `http${state.api.safe?'s':''}://service.${state.api.domain}` //api接口主要地址,
    },
    invite(state) {
        return `http${state.api.safe?'s':''}://invite.${state.api.domain}` //邀请相关接口地址
    },
    stats(state) {
        return `http${state.api.safe?'s':''}://stats.${state.api.domain}` //et信息接口地址
    },

    dayNum(state) {
        let tn = Math.floor(
            (new Date().getTime() - new Date('2018', '9', '6').getTime()) /
            (60 * 60 * 24 * 1000)
        )
        return tn < 0 ? '90' : 90 - tn
    },
    // dark(state) {
    //     var dark = false
    //     if (process.client) {
    //         dark = localStorage.getItem('dark')

    //     }
    //     state.theme.dark = dark == true
    //     return state.theme.dark
    // }
}