# API

## 极验验证码
    http:///service.exchain.com/api/user/initCaptcha
    {
        id: "f16e4ad948bf7b27f35dd3641d4550d1"
    }

## 注册账号
    http://service.exchain.com/api/user/verifyRegister
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 登录
    http://service.exchain.com/api/user/login
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            ctime: "2018-08-15 10:46:42"
            email: "chenwanan@exchain.com"
            id: "8"
            mtime: "2018-10-05 22:02:46"
            nickname: ""
            pn: "Y0zewi/SLiFe6l3uWjh2XaKWaXCNaI3oWL9HtxHXPOTbR6XqzW3Yutbm5UILJefW36CCs4O/z1OpUYI63tU+4t0xc0pP0GBfswi3eefimqMTonUgSorWM4O4+XDfqRgdkEPOYTnXdimscKseG6bdDd127Fa//iR/TCzfPnUK3GE7WmVNLfiuXZtXjUkGf6RMQYrzDOPB3/2XMxQbckHsWyhfaW60qFSpXeBtgucfL8/+8llDVM9IZzO9MNutXVJmWgLTq961gbDl8nXN71/uEgT+dvTcQYXujmm6pixbMk9lINXfAFZJ8xQKjhklNmF3fDH4JUJu6KQYqunAncEI6w=="
        }
    }

## 重置密码
    http://service.exchain.com/api/user/verifyResetPassword
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 修改密码
    http://service.exchain.com//api/user/changePassword
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 获取手机号验证码
    http://service.exchain.com/api/user/bindPhone
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 绑定新手机号
    http://service.exchain.com/api/user/verifyBindPhone
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## USDT 兑换人民币价格 -- 前置接口
    http://service.exchain.com/api/quotation/getUSDCNY
    {
        errorCode: 0
        errorMsg: "成功"
        result: 6.9469
    }

## 当日交易量
    http://service.exchain.com//api/quotation/getQuantAmount
    {
        "errorCode": 0,
        "errorMsg": "成功",
        "result": {
        "total": 0,
        "temp": []
        }
    }

## et 总流通量
    http://stats.exchain.com/api/exet/stats/etCirculate
    {
        "meta": {
            "code": 0,
            "message": "success"
        },
        "data": {
            "etCirculate": 115068493.15
        }
    }



## 获取各交易对的基础信息（有成交量的；最新买卖价、精度、手续费） -- 前置接口
    http://service.exchain.com/api/exchange/getMarketInfo
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            BCH/BTC: {
                amount_min_input: "0.0010"
                amount_precision: "4"
                best_ask: "0.00000000"
                best_bid: "0.00000000"
                domain: "main"
                fee_rate: "0"
                fee_rate_readable: "0%"
                price_min_input: "0.000001"
                price_precision: "6"
                turnover_precision: "6"
            },
            BCH/USDT: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            BTC/USDT: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            ET/USDT: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            ETH/BTC: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            ETH/USDT: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            OMG/BTC: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            OMG/ETH: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            OMG/USDT: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
            WICC/ETH: {best_bid: "0.00000000", best_ask: "0.00000000", fee_rate: "0", fee_rate_readable: "0%",…}
        }
    }

## 获取各交易对的交易信息（最新价格 24h波动 24h高点 24h低点 24h交易量）
    http://service.exchain.com/api/v1-b/market/price_change?markets=BTC/USDT,ETH/USDT,BCH/USDT,ETH/BTC,BCH/BTC,ET/USDT,OMG/USDT,OMG/BTC,OMG/ETH,WICC/ETH
    {
        errorCode: 0
        errorMsg: "成功"
        result: [
            {
                LastDayPrice: "6544.790000"
                amount: "283.5673000000"
                close: "6534.8600000000"
                high: "6612.2200000000"
                low: "6507.050000"
                name: "BTC/USDT"
                open: "6579.660000"
                priceChange: "-0.00151723"
                volume: "1859295.4495480000"
            }
            {name: "ETH/USDT", open: "207.180000", high: "209.050000", low: "202.160000", close: "203.9200000000",…}
            {name: "BCH/USDT", open: "450.050000", high: "452.380000", low: "443.180000", close: "445.7500000000",…}
            {name: "ETH/BTC", open: "0.031245", high: "0.0327510000", low: "0.031081", close: "0.0312090000",…}
            {name: "BCH/BTC", open: "0.068380", high: "0.068662", low: "0.068003", close: "0.0682340000",…}
            {name: "ET/USDT", open: "0.001396", high: "0.001412", low: "0.0011280000", close: "0.0011940000",…}
            {name: "OMG/USDT", open: "3.497800", high: "888.000000", low: "3.1200000000", close: "3.3545000000",…}
            {name: "OMG/BTC", open: "0.000527", high: "1.000000", low: "0.000001", close: "0.0005110000",…}
            {name: "OMG/ETH", open: "0.001396", high: "2.999900", low: "0.001396", close: "0.0164250000",…}
            {name: "WICC/ETH", open: "0.001092", high: "218.900000", low: "0.0010849800", close: "0.0011000500",…}
        ]
    }


## 获取国家列表
    http://service.exchain.com/api/user/getCountryList
    {
        errorCode: 0
        errorMsg: "成功"
        result: {AL:"阿尔巴尼亚", DZ: "阿尔及利亚", AF: "阿富汗", AR: "阿根廷", AE: "阿拉伯联合酋长国", AW: "阿鲁巴", OM: "阿曼", AZ: "阿塞拜疆",…}
    }

## 提交kyc数据
    http://service.exchain.com/api/user/userKycRequest
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 获取登录人信息
    http://service.exchain.com/api/user/getUserInfo
    {
        errorCode: 0
        errorMsg: "成功"
        result: {id: "8", email: "chenwanan@exchain.com", nickname: "", mtime: "2018-10-26 10:22:26",…}
        ctime: "2018-08-15 10:46:42"
        email: "chenwanan@exchain.com"
        id: "8"
        idCardStatus: "2"
        login_time: 1540521112
        mtime: "2018-10-26 10:22:26"
        nickname: ""
        phone: {country: "86", number: "186****7996"}
        country: "86"
        number: "186****7996"
    }

## 获取最近的登录情况
    http://service.exchain.com/api/user/getRecentActivity
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            data: [
                0: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                1: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                2: {event: "Sign-in", ip: "211.159.7.150", os: "Windows", browser: "Chrome", device: "Desktop",…}
                3: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                4: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                5: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                6: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                7: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                8: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                9: {event: "Sign-in", ip: "218.189.23.26", os: "Windows", browser: "Chrome", device: "Desktop",…}
                total: "108"
            ]
        }
    }

## 获取登录人的用户等级
    http://invite.exchain.com/api/invite/userLevel
    {
        meta: {
            code: 0,
            message: "success"
        },
        data: {
            userId: "8",
            level: 0
        }
    }


## 获取邀请码
    http://invite.exchain.com/api/invite/getInvitedCode
    {
        meta: {
            code: 0,
            message: "success"
        },
        data: {
            code: "LFFG2"
        }
    }

## 邀请榜单
    http://invite.exchain.com/api/invite/partnerTop
    {
        data: {
            list: [
                {
                activeCount: 467
                email: "tulu***@gmail.com"
                top: 1
                userId: "200"
                userName: ""
                },
                {userId: "483", userName: "", email: "3091***@qq.com", top: 2, activeCount: 124}
                {userId: "3227", userName: "", email: "leve***@qq.com", top: 3, activeCount: 116}
            ]
        },
        meta: {
            code: 0,
            message: "success"
        }
    }

## 邀请记录
    http://invite.exchain.com/api/invite/invitedList
    {
        data: {
            activeCount: 0
            inviteCount: 0
            inviteList: null
            pageNum: 1
            pageSize: 10
            totalPages: null
        },
        meta: {
            code: 0,
            message: "success"
        }
    }

## USDT返现记录
    http://invite.exchain.com/api/invite/activityInfo
    {
        data: {
            inviteKycCount: 0
            inviteRegisterCount: 0
            list: []
            usdt: "0"
            usdtCount: 0
            userId: "8"
        },
        meta: {code: 0, message: "success"}
    }

## 当前委托
    http://service.exchain.com/api/order/lists?status=1&method=active&t1540522377993&page=1&size=10
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            data: [
                {market: "OMG/USDT", order_id: "4869352", side: "2", price: "987.0000000000", amount: "2.30160000",…}
            ],
            total: "1"
        }
    }

## 成交历史
    http://service.exchain.com/api/order/lists?method=history&t1540522475460&page=1&size=10
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            data: [
                {market: "ET/USDT", order_id: "23489574", side: "1", price: "0.0014000000", amount: "40167.40000000",…}
                {market: "ET/USDT", order_id: "19422591", side: "2", price: "0.0016000000", amount: "35146.50000000",…}
                {market: "ET/USDT", order_id: "625968", side: "2", price: "9.0000000000", amount: "10000.00000000",…}
                {market: "ET/USDT", order_id: "620545", side: "2", price: "1.0000000000", amount: "1.00000000",…}
            ],
        total: "4"
        }
    }

## 获取各币种的基础信息（精度、提现、充值要求）
    http://service.exchain.com/api/quotation/getSymbolLists
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            BCH: {
                address_type: "bch"
                base: false
                decimal: "8"
                default_coin: "USDT"
                name: "Bitcoin Cash"
                recharge: true
                recharge_min: "0.0002"
                trade: true
                withdraw: true
                withdraw_1day_max: "20.00"
                withdraw_fee: "0.0002"
                withdraw_max: "20.00"
                withdraw_min: "0.001"
            },
            BTC: {name: "Bitcoin", base: true, withdraw_fee: "0.001", decimal: "8", trade: true, recharge: true,…}
            ET: {name: "Exchain Token", base: true, withdraw_fee: "0", decimal: "8", trade: true, recharge: false,…}
            ETH: {name: "Ethereum", base: true, withdraw_fee: "0.01", decimal: "8", trade: true, recharge: true,…}
            OMG: {name: "OmiseGO", base: false, withdraw_fee: "0.1", decimal: "8", trade: true, recharge: true,…}
            USDT: {name: "Tether", base: true, withdraw_fee: "10", decimal: "8", trade: true, recharge: true,…}
            WICC: {name: "WaykiChain", base: false, withdraw_fee: "2", decimal: "8", trade: true, recharge: true,…}
        }
    }

## 获取用户的币资产
    http://service.exchain.com/api/account/assetsList
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {
            BCH: {
                account_available: "0.00000000"
                btc: "0.00000000"
                exchange_available: "0.00000000"
                exchange_freeze: "0.00000000"
                recharge: true
                withdraw: true
                withdraw_fee: "0.0002"
            },
            BTC: {account_available: "0.00000000", withdraw_fee: "0.001", recharge: true, withdraw: true,…}
            ET: {account_available: "4.29015067", withdraw_fee: "0", recharge: false, withdraw: false,…}
            ETH: {account_available: "0.00000000", withdraw_fee: "0.01", recharge: true, withdraw: true,…}
            OMG: {account_available: "0.00000000", withdraw_fee: "0.1", recharge: true, withdraw: true,…}
            USDT: {account_available: "0.00000000", withdraw_fee: "10", recharge: true, withdraw: true,…}
            WICC: {account_available: "0.00000000", withdraw_fee: "2", recharge: true, withdraw: true,…}
        }
    }

## 获取比特币的交易历史（数据冗余！！！） -- 前置接口
    http://service.exchain.com/api/v1-b/market/trade_history?market=huobi&symbol=btcusdt&limit=1
    {
        code: 0,
        data: [
            ["1540522561196", "6533.6600000000", "0.00370000", "sell"]
            ["1540522560190", "6533.6600000000", "0.00140000", "sell"]
            ["1540522553137", "6533.6600000000", "0.00120000", "sell"]
            ["1540522550113", "6533.6700000000", "0.00390000", "buy"]
            ["1540522547092", "6533.6600000000", "0.00220000", "buy"]
            ["1540522546084", "6533.6600000000", "0.00500000", "buy"]
            ["1540522544075", "6533.6700000000", "0.00170000", "buy"]
            ["1540522539043", "6533.6800000000", "0.00100000", "buy"]
            ["1540522535011", "6533.6800000000", "0.00320000", "sell"]
            ["1540522534000", "6533.6800000000", "0.00170000", "buy"]
        ],
        msg: ""
    }

## 充币记录、提币记录
    http://service.exchain.com/api/account/getHistory
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            data: [{name: "recharge", address: "0xfbf326e244aa4fd8b6b606d601fa32fbe23c6fd0",…}],
            total: "1"
        }
    }

## 获取币的地址
    http://service.exchain.com/api/account/getAddress?type=BTC
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {
            address: "14BdVrKCwhfgviFjds355W1RDCtcggQSdY",
            qrcode: "iVBORw0KGgoAAAANSUhEUgAAAG8AAABvAQMAAADYCwwjAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABIElEQVQ4jdXUsY2EMBAF0I8cODMNrEQbztzS0gAsDUBLZG7DkhvYzRwg/g0rbu8iD+laSPCQDJ7hG+AbR0s+PJ/WkEmlg5l9t/v8wAUGudjuNi/lEpeSn7jKacVwkTBLTE35W2SFUu/ssxyf8iuU0VBKTp9mVtgyM8p566NOh81J24NhTCobdkfbke7nS2t0Fndpu+f5qCobkiXPSE2EStjNAUPoeIEOnJj6IunS2a63wZrdYow6m5jngH6Vb6rTBZnO2d6GM7FVerPj6KTc14kb/IbQSRR1vuPNlVKFyvd06WRyv9GqUBIr8R6ZF0Kl7IUpmqdN7RmzKsPRyfHfIhV67vI1bbrCpUhOOhI65Z8j2wF8RZ3H/kV+ydyi8/vGDzAT4UW+JL7XAAAAAElFTkSuQmCC"
        }
    }

## 资产划转
    http://service.exchain.com/api/account/toExchange?type=ET&balance=4.29015067
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {}
    }

## 获取某币种信息
    http://service.exchain.com/api/exchange/getMarketInfo?market=BTC/USDT
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            amount_min_input: "0.0010"
            amount_precision: "4"
            best_ask: "6599.00000000"
            best_bid: "6500.62000000"
            domain: "main"
            fee_rate: "0"
            fee_rate_readable: "0%"
            price_min_input: "0.01"
            price_precision: "2"
            turnover_precision: "8"
        }
    }

## 获取k线信息
    http://service.exchain.com/api/v1-b/market/kline_history?period=1min&type=market&market=huobi&name=btcusdt
    {
        code: 0,
        data: [[1540410000000, "6576.8000000000", "6576.8000000000", "6575.4400000000", "6575.7000000000",…],…],
        msg: ""
    }

## 获取所有交易对的交易信息（价格、涨跌幅）
    http://service.exchain.com/api/v1-b/market/all
    {
        code: 0
        data: [
            {
                name: "huobi",
                symbols: [
                    {name: "BTC/USDT", price: "6535.2300000000", priceChange: "-0.00146070", LastDayPrice: "6544.790000"}
                    {name: "ETH/USDT", price: "204.1300000000", priceChange: "-0.00327148", LastDayPrice: "204.800000"}
                    {name: "BCH/USDT", price: "444.9800000000", priceChange: "-0.00793686", LastDayPrice: "448.540000"}
                    {name: "ETH/BTC", price: "0.0312320000", priceChange: "0.00147502", LastDayPrice: "0.031186"}
                    {name: "BCH/BTC", price: "0.0681160000", priceChange: "-0.00620066", LastDayPrice: "0.068541"}
                    {name: "ET/USDT", price: "0.0011940000", priceChange: "-0.01566364", LastDayPrice: "0.001213"}
                    {name: "OMG/USDT", price: "3.1505000000", priceChange: "-0.21237500", LastDayPrice: "4.000000"}
                    {name: "OMG/BTC", price: "0.0005110000", priceChange: "-0.01351351", LastDayPrice: "0.000518"}
                    {name: "OMG/ETH", price: "0.0016020000", priceChange: "0.00062460", LastDayPrice: "0.001601"}
                    {name: "WICC/ETH", price: "0.0011000500", priceChange: "0.00004545", LastDayPrice: "0.001100"}
                ],
                zhName: "火币网",
                baseCurrency: "ET,USDT,BTC,ETH",
                exchangeType: ""
            }
        ]
        msg: ""
    }

## 获取登录人自选币种
    http://service.exchain.com/api/quotation/getCollectLists
    {
        errorCode: 0
        errorMsg: "成功"
        result: {}
    }

## 获取盘口数据
    http://service.exchain.com/api/v1-b/market/depth_history?market=huobi&symbol=btcusdt&limit=100
    {
        code: 0
        data: {
            buy: [[6500.62, 0.004], [6500.46, 0.0135], [6500.45, 0.003], [6500.34, 0.002], [6500.07, 0.0025],…],
            sell: [[6599, 0.001], [6599.01, 0.1], [6599.27, 0.011], [6599.34, 0.001], [6599.37, 0.001], [6599.7, 0.0018],…],
            msg: ""
        }
    }

## 我的订单
    http://service.exchain.com/api/order/lists?market=BTC/USDT&method=active&page=1
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {data: [], total: "0"}
    }


## 历史委托
    http://service.exchain.com/api/order/lists?market=BTC/USDT&method=history&page=1
    {
        errorCode: 0,
        errorMsg: "成功",
        result: {data: [], total: "0"}
    }

## 获取币种信息披露信息
    http://project.exchain.com/api/coininfo/market_digest
    {
        data: {
            circulating_supply: "17,341,837"
            market_cap: "$112,152,620,443"
            max_supply: "21,000,000"
            name: "Bitcoin"
            pct_change_24hr: "-0.03%"
            pct_circulating: "82.58%"
            price: "$6467.17"
            symbol: "BTC"
            turnover_rate: "2.7368%"
            volume_24hr: "$3,069,430,740"
        },
        status: 200
    }

## 登录人币种余额查询
    http://service.exchain.com/api/exchange/balanceQuery
    {
        errorCode: 0
        errorMsg: "成功"
        result: {
            BCH: {available: "0.00000000", freeze: "0.00000000", total: "0.00000000"}
            BTC: {available: "0.00000000", freeze: "0.00000000", total: "0.00000000"}
            ET: {available: "40171.73958002", freeze: "0.00000000", total: "40171.73958002"}
            ETH: {available: "0.00000000", freeze: "0.00000000", total: "0.00000000"}
            OMG: {available: "0.00000000", freeze: "2.30160000", total: "2.30160000"}
            USDT: {available: "0.00004000", freeze: "0.00000000", total: "0.00004000"}
            WICC: {available: "0.00000000", freeze: "0.00000000", total: "0.00000000"}
        }
    }






