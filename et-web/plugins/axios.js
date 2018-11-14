import axios from 'axios'
export default function ({
    app,
    store,
    env,
    route
}) {
    let ax = url => {
        return axios.create({
            baseURL: url,
            headers: {
                'X-EXCHAIN-PN': store.state.user.pn
            }
        })
    }
    if (env.api) {
        store.commit('setApi', env.api)
    }
    app.service = ax(store.getters.service)
    app.invite = ax(store.getters.invite)
    app.stats = ax(store.getters.stats)
    app.home = ax(store.getters.home)
    // app.service = ax(`http${env.api.safe?'s':''}://service.${env.api.domain}`) 
    // app.invite = ax(`http${env.api.safe?'s':''}://invite.${env.api.domain}`) //邀请相关接口地址
    // app.stats = ax(`http${env.api.safe?'s':''}://stats.${env.api.domain}`) //et信息接口地址
    // app.home = ax(`http${env.api.safe?'s':''}://www.${env.api.domain}`) //本地资源地址

}