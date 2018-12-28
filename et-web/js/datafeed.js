// import aa from './dbtest.json'
import axios from 'axios'
export default (vue) => {
    function Container(updateFrequency){
        this._configuration = {
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '5D', '1W', '1M'],
            supports_marks: true,
            supports_timescale_marks: true,
            exchanges: [this.symbol]
        };

        // this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
        // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

        this._enableLogging = true;
        this._callbacks = {};

        this._initializationFinished = true;
        this._fireEvent('initialized');
        this._fireEvent('configuration_ready');
    }
    Container.prototype._fireEvent = function(event, argument) {
        if (this._callbacks.hasOwnProperty(event)) {
            var callbacksChain = this._callbacks[event];
            for (var i = 0; i < callbacksChain.length; ++i) {
                callbacksChain[i](argument);
            }

            this._callbacks[event] = [];
        }
    };
    /**
     * 日志
     */
    Container.prototype._logMessage = function(message) {
        if (this._enableLogging) {
            var now = new Date();
            console.log("CHART LOGS: "+now.toLocaleTimeString() + '.' + now.getMilliseconds() + '> ' + message);
        }
    };

    Container.prototype.on = function(event, callback) {
        if (!this._callbacks.hasOwnProperty(event)) {
            this._callbacks[event] = [];
        }

        this._callbacks[event].push(callback);
        return this;
    };

    Container.prototype.onReady = function(callback) {
        let that = this;
        if (this._configuration) {
            setTimeout(function() {
                callback(that._configuration);
            }, 0);
        }
        else {
            this.on('configuration_ready', function() {
                callback(that._configuration);
            });
        }
    };
    Container.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        Promise.resolve().then(() => {
            onSymbolResolvedCallback({
                "name": '',
                "timezone": "Asia/Shanghai",
                "minmov": 1,
                "minmov2": 0,
                "ticker": 'AAPL',
                "description": "",
                "session": "24x7",
                "type": "bitcoin",
                "exchange-traded": vue.symbol,
                "exchange-listed": "",
                "has_intraday": true,
                "intraday_multipliers": ['1'], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
                "has_weekly_and_monthly": false,
                // "has_no_volume": false,s
                "regular_session": "24x7",
                "pricescale": Math.pow(10, vue.pricescale)
            });
        })
    };
    
    Container.prototype.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        if (from > 0 && (from + '').length > 10) {
            throw new Error(['Got a JS time instead of Unix one.', from, to]);
        }
        // onHistoryCallback([], { noData: vue.noDataFlag > 10 });

        let params = {
            period: vue.period,
            start_time: (from * 1000),
            end_time: (to * 1000),
            symbol: vue.name
        }
        vue.$store.dispatch('getKlineHistory', params)
        .then(res => {
            let arr = []
            res.data.forEach(function (bar) {
                arr.push({
                    time: Number(bar[0]),
                    close: Number(bar[1]),
                    open: Number(bar[2]),
                    high: Number(bar[3]),
                    low: Number(bar[4]),
                    volume: Number(bar[5])
                })
            });
            if (arr.length === 0) {
                vue.noDataFlag ++;
            }
            
            
            onHistoryCallback(arr, { noData: vue.noDataFlag > 10 });
        })
        .catch(err => {});
    };
    Container.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
        // axios.get(`http://service.exchain.com/api/v1-b/market/kline_history?period=1hour&type=market&market=huobi&name=btcusdt`)
        // .then((res) => {
        //   res.data.data.forEach(function (bar) { // in subscribeBars
        //     console.log(bar)
        //     onRealtimeCallback({
        //       time: Number(bar[0]),
        //       open: Number(bar[1]),
        //       high: Number(bar[2]),
        //       low: Number(bar[3]),
        //       close: Number(bar[4]),
        //       volume: Number(bar[5])
        //     })
        //   });
        //   vue.subscribeChannel();
        //   this.on('pair_change', function() {
        //     onResetCacheNeededCallback();
        //   });
        // })
        // vue.subscribeChannel();
        vue.onRealtimeCallback = onRealtimeCallback;
    };

    Container.prototype.unsubscribeBars = function(listenerGUID) {
        // this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
    };
    return new Container();
    // return {
    //     onReady(callback) {

    //         callback({
    //             exchanges: [{
    //                 value: "Exchain",
    //                 name: "All Exchanges",
    //                 desc: ""
    //             }, ],
    //             supports_search: true,
    //             supports_group_request: true,
    //             supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    //             supports_marks: true,
    //             supports_timescale_marks: true,
    //             supports_time: true
    //         })
    //     },
    //     searchSymbols(userInput, exchange, symbolType, onResultReadyCallback) {
    //         return [{
    //             "symbol": "BTC",
    //             "full_name": "BTCUSD",
    //             "description": "BTC的介绍",
    //             "exchange": "Exchain",
    //             "type": "bitcoin"
    //         }]
    //     },
    //     resolveSymbol(symbolName, onResolve, onResolveErrorCallback) {
    //         let info = vue.$store.state.market.pairs.filter(p => p.name == symbolName)[0]

    //         let sysbolInfo = {
    //             name: info.name,
    //             ticker: info.name,
    //             type: 'bitcoin',
    //             session: '24x7',
    //             timezone: 'Asia/Hong_Kong',
    //             minmove: info.price_min_input,
    //             pricescale: info.price_precision,
    //             has_no_volume: false,
    //             pointvalue: 1,
    //             supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    //             volume_precision: info.amount_precision
    //         }
    //         Promise.resolve().then(() => {
    //             info && onResolve(sysbolInfo)
    //         })

    //     },
        
    //     async getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
            // let params = {
            //     period: vue.period,
            //     start_time: (from * 1000),
            //     end_time: (to * 1000),
            //     symbol: vue.upperCase
            // }
            // vue.$store.dispatch('getKlineHistory', params)
            // .then(res => {
            //     let arr = []
            //     res.data.data.forEach(function (bar) {
            //         arr.push({
            //             time: Number(bar[0]),
            //             close: Number(bar[1]),
            //             open: Number(bar[2]),
            //             high: Number(bar[3]),
            //             low: Number(bar[4]),
            //             volume: Number(bar[5])
            //         })
            //     });
            //     if (arr.length === 0) {
            //         vue.noDataFlag ++;
            //     }
                
            //     onHistoryCallback(arr, { noData: vue.noDataFlag > 10 });
            // })
            // .catch(err => {});
    //     },
    //     subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    //         vue.onRealtimeCallback = onRealtimeCallback;
    //     },
    //     unsubscribeBars(subscriberUID) {

    //     }

    // }
}