export const toParmStr = obj => {
    var list = []
    for (var k in obj) {
      list.push(k + '=' + obj[k])
    }
    return list.join('&')
}