
export function validateEmail(value) {
    return /.+@.+/.test(value)
}

export function validatePassword(value) {
    return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*()_+{}|:"<>?/*-.`\[';,/\]]+$)[~!@#$%^&*()_+{}|:"<>?/*-.`\[';,/\]0-9A-Za-z]{8,20}$/.test(value)
}

export function validateEmailCode(value) {
    return /^[A-Za-z0-9]+$/.test(value)
}