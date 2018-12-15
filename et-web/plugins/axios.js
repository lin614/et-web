import axios from 'axios'
import Vue from 'vue'
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
                'X-EXCHAIN-PN': store.state.user.pn,
                'Referer': store.getters.home
            }
        })
    }
    if (env.api) {
        store.commit('setApi', env.api)
    }
    Vue.prototype.$service = app.service = ax(store.getters.service)
    Vue.prototype.$invite = app.invite = ax(store.getters.invite)
    Vue.prototype.$stats = app.stats = ax(store.getters.stats)
    Vue.prototype.$home = app.home = ax(store.getters.home)
    Vue.prototype.$ax = app.ax = axios
    //请求图片获取到dataurl
    app.dataurl = url => {
        return axios
            .get(url, {
                responseType: 'arraybuffer'
            })
            .then(response => {
                let prefix = 'data:' + response.headers['content-type'] + ';base64,'
                let imgdata = new Buffer(response.data, 'binary').toString('base64')
                return prefix + imgdata
            }).catch(err => {
                console.log(err)
                return null
            })
    }
}