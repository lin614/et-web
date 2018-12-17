export default ({
    app,
    store    
},inject) => {
    let logFunc = msg => store.getters.showLog && console.log(msg)
    inject('log', logFunc)
    app.log = logFunc
}