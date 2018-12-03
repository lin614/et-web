import pako from 'pako'
export default ({
    app,
    store
}, inject) => {

    if (process.client && typeof WebSocket === 'undefined') {
        debug
        alert('您的浏览器不支持WebSocket,推荐使用谷歌浏览器');
        return
    }

    let url = store.getters.ws

    let decode = str => {
        // let array = new Uint8Array(str.length)
        debugger
        var array = atob(str).split('').map(c => ~str.charCodeAt(c))
        return pako.inflate(array, {
            to: "string"
        });
    }
    let WS = null
    let connect = () => {
        WS = new WebSocket(url);
        WS.onopen = (e) => {
            debugger
            app.log('WebSocket open');
        };
        WS.onclose = (e) => {
            debugger
            app.log('WebSocket onclose')
            connect()
        };
        WS.onerror = (e) => {
            debugger
            app.log(`WebSocket error ${e}`)

        }
        WS.onmessage = (e) => {
            let msg = JSON.parse(decode(e.data));
            app.log('ws0' + msg.channel)
            app.log('ws1' + msg.data)
            if (msg.status === 0) {
                //store.commit
            }
        }
        //注入send函数
        inject('send', params => WS.send(JSON.stringify(params)))
    }


}