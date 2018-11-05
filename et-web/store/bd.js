let i = 0
setInterval(() => {
  i++
}, 1000)
export default i
export const state = () => ({
  et: {
    etBtc: 0, //当天交易量,以btc计
    volAll: 0 //总流通量
  },
})
export const mutations = () => ({
  i() {
    return i
  }
})