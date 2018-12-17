import axios from 'axios'
// import Vue from 'Vue'
// let vm = new Vue();

// create instance
const request = axios.create({
    timeout: 10000
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

        // if (response.data.meta && response.data.meta.code != 0) {
        //     let code = response.data.meta.code + '';
        //     alert(vm.$t(`javaApiError.${code}`));
        // }

        // if (response.data.error_code && response.data.error_code != 0) {
        //     let code = response.data.error_code + '';
        //     alert(vm.$t(`baiduApiError.${code}`));
        // }

        // if (response.data.errorCode && response.data.errorCode != 0) {
        //     let errorCode = response.data.errorCode + '';
        //     alert(vm.$t(`ApiError.${errorCode}`));
        // }

        return response
    },
    error => {
        alert(vm.$t('errorMsg.NETWORK_ERROR'));
        return Promise.reject({ code: 1, msg: 1 });
    }
)

export default request