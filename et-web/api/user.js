import request from '@/utils/request'

export function login(data) {
    return request({
        url: `http://service.exchain.com/api/user/login`,
        method: 'post',
        data
    })
}

export function initCaptcha(data) {
    return request({
        url: `http://service.exchain.com/api/user/initCaptcha`,
        method: 'post',
        data
    })
}

export function register(data) {
    return request({
        url: `http://service.exchain.com/api/user/register`,
        method: 'post',
        data
    })
}

export function verifyRegister(data) {
    return request({
        url: `http://service.exchain.com/api/user/verifyRegister`,
        method: 'post',
        data
    })
}