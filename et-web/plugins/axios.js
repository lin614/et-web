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
    app.ax = axios
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