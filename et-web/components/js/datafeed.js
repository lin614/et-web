import aa from './dbtest.json'
export default (store) => {
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
            let info = store.state.market.pairs.filter(p => p.name == symbolName)[0]

            let sysbolInfo = {
                name: info.symbol,
                ticker: info.symbol,
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
            info && onResolve(sysbolInfo)

        },
        getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {

            // let bar = {
            //     close: 1165.08,
            //     high: 1173.6,
            //     low: 1161.61,
            //     open: 1166.51,
            //     time: 1513036800000,
            //     volume: 2197697
            // }
            firstDataRequest && onHistoryCallback(aa.bars, aa.meta)
        },
        subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
            debugger
        },
        unsubscribeBars(subscriberUID) {
            debugger
        }

    }
}