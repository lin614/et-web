export default {
    onReady(callback) {
        debugger
        callback({
            exchanges: ['Exchain'],
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
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        debugger
    },
    getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        debugger

    },
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        debugger
    },
    unsubscribeBars(subscriberUID) {
        debugger
    }

}