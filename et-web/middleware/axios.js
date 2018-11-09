import axios from 'axios'
export default ({
    app,
    store,
    env
}) => {

    app.axSer = (pn, sub = 'service') => axios.create({
        baseURL: `http${env.api.safe?'s':''}://${sub}.${env.api.domain}`,
        headers: {
            'X-EXCHAIN-PN': pn
        }
    })
    app.axHome = () => axios.create({
        baseURL: `http${this.safe?'s':''}://www.${this.domain}`
    })
}