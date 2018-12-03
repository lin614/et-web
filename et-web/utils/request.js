import axios from 'axios'

// create instance
const request = axios.create({
    timeout: 5000
})

// request interceptors
request.interceptors.request.use(request => {
    return request
}, error => {
    Promise.reject(error)
})

// response interceptors
request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        alert(this.$t('errorMsg.NETWORK_ERROR'));
        return Promise.reject({ code: 1, msg: 1 });
    }
)

export default request