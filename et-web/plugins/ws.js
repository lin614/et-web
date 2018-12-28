import pako from 'pako'
export default ({
    app,
    store
}, inject) => {

    if (process.client && typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持WebSocket,推荐使用谷歌浏览器');
        return
    }

    let url = store.getters.ws
    let decode = str => {
        let str2 = atob(str)
        let array = new Uint8Array(str2.length)
        str2.split('').forEach((p, i) => array[i] = ~str2.charCodeAt(i))

        var aa = pako.inflate(array, {
            to: "string"
        });

        return aa
    }
    let WS = null
    let sendFunc = (params, callback) => {
        WS.send(JSON.stringify(params))
    }
    let connect = () => {
        WS = new WebSocket(url);
        WS.onopen = (e) => {
            console.log('WebSocket open');
            // sendFunc({
            //     event: "sub",
            //     channel: 'huobi.market.btcusdt.kline.1day'
            // })
        };
        WS.onclose = (e) => {
            console.log('WebSocket onclose')
            connect()
        };
        WS.onerror = (e) => {
            console.log(`WebSocket error ${e}`)
        }
        WS.onmessage = (e) => {
            let msg = JSON.parse(decode(e.data));
            console.log(11111111111111);
            console.log(msg);
            if (msg.channel) {
                console.log('channel', msg.channel)
                console.log('data', msg.data)
                if (msg.status === 0) {
                    if (msg.channel.indexOf('kline')) {
                        store.commit('setBars', msg.data)
                    }
                }
            } else {
                console.log('保活!')
            }
        }
        //注入send函数
        inject('send', sendFunc)

    }

    connect()

    setInterval(() => {
        console.log('WS.readyState:' + WS.readyState)

        if (WS.readyState == '1') {
            sendFunc({
                event: "req",
                channel: "heart_beat"
            })

        }

        store.commit('setTime')
    }, 5000)

    app.WS = WS;
}