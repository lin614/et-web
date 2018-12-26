// import aa from './dbtest.json'
export default (vue) => {
    return {
        onReady(callback) {

            callback({
                exchanges: [{
                    value: "Exchain",
                    name: "All Exchanges",
                    desc: ""
                }, ],
                supports_search: true,
                supports_group_request: true,
                supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
                supports_marks: true,
                supports_timescale_marks: true,
                supports_time: true
            })
        },
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
            return [{
                "symbol": "BTC",
                "full_name": "BTCUSD",
                "description": "BTC的介绍",
                "exchange": "Exchain",
                "type": "bitcoin"
            }]
        },
        resolveSymbol(symbolName, onResolve, onResolveErrorCallback) {
            let info = vue.$store.state.market.pairs.filter(p => p.name == symbolName)[0]

            let sysbolInfo = {
                name: info.name,
                ticker: info.name,
                type: 'bitcoin',
                session: '24x7',
                timezone: 'Asia/Hong_Kong',
                minmove: info.price_min_input,
                pricescale: info.price_precision,
                has_no_volume: false,
                pointvalue: 1,
                supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
                volume_precision: info.amount_precision
            }
            Promise.resolve().then(() => {
                info && onResolve(sysbolInfo)
            })

        },
        async getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
            let res = await vue.$service.get('api/v1-b/market/kline_history?period=1day&type=market&market=huobi&name=btcusdt')
            if (res.status != '200' || res.data.code != '0') {
                return
            }
            let bars = res.data.data.map(p => ({
                time: p[0],
                open: Number(p[1]),
                high: Number(p[2]),
                low: Number(p[3]),
                close: Number(p[4]),
                volume: Number(p[5])
            }))
            // bars.sort((a, b) => {
            //     return a.time - b.time
            // })
            // res.status && res.data.code == '0' && res.data.data
            console.log(bars)
            firstDataRequest && onHistoryCallback(bars, {
                "noData": bars.length > 0
            })
        },
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {

        },
        unsubscribeBars(subscriberUID) {
            
        }

    }
}