import axios from 'axios';
import qs from 'qs'
import * as Constant from '@/assets/js/constant';
import config from '../../exchain/config'
import cookie from './cookie'

// import cookie
// axios.defaults.baseURL = config.url.user
axios.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
var getHeader = {
  headers: {
    'X-EXCHAIN-PN': cookie.get('PN', {
      domain: config.url.domain
    })
  }
}
var getHeader2 = {
  headers: {
    'X-EXCHAIN-PN': cookie.get('PN', {
      domain: config.url.domain
    }),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded'
  }
}
axios.interceptors.request.use((config) => {
  // if (config.method === "post") {
  //   config.data = qs.stringify(config.data);
  // }
  return config;
})
//生成参数字符串
var toParmStr = obj => {
  // var list = obj.map(p => p.key + '=' + p.value)
  var list = []
  for (var k in obj) {
    list.push(k + '=' + obj[k])
  }
  return list.join('&')
}
const pend = config.url.user + "/api/v1-b";
const pend2 = config.url.user + '/api';


//k线图
export const getKlineHistory = ({
  period,
  type,
  market = Constant.MARKET,
  name
}) => {
  return axios.get(`${pend}/market/kline_history?` + toParmStr({
    period,
    type,
    market,
    name
  }), getHeader);
};

//所有交易币对
export const getAllSymbols = () => {
  return axios.get(`${pend}/market/all`, getHeader);
};
export const getAllSymbols2 = (str) => {
  return axios.get(`${pend}/market/price_change?markets=${str}`, getHeader);
};


export const getTradeHistory = ({
  market = Constant.MARKET,
  symbol,
  limit = 100
}) => {
  return axios.get(`${pend}/market/trade_history?` + toParmStr({
    market,
    symbol,
    limit
  }), getHeader);
};

export const getDepthHistory = ({
  market = Constant.MARKET,
  symbol,
  limit = 100
}) => {
  return axios.get(`${pend}/market/depth_history?` + toParmStr({
    market,
    symbol,
    limit
  }), getHeader);
};


export const getCoinInfo = (symbol) => {
  let p = {symbol: symbol};
  return axios.post(config.url.project + '/api/coininfo/market_digest', p);
};


// export const getCoinInfo = (email) => {
//   return axios.post(`${pend}/coininfo/market_digest`, email);
// };


/*========================== 用户相关 ===============================*/

export const userRegister = (email) => {
  return axios.post(`${pend2}/user/register`, {
    email
  });
};

export const userVerifyRegister = ({
  email,
  code,
  token,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/verifyRegister`, {
    email,
    code,
    token,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const userResetPassword = (email) => {
  return axios.post(`${pend2}/user/resetPassword`, {
    email
  });
};

export const userVerifyResetPassword = ({
  email,
  code,
  token,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/verifyResetPassword`, {
    email,
    code,
    token,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const changePassword = ({
  password,
  new_password
}) => {
  return axios.post(`${pend2}/user/changePassword`, {
    password,
    new_password
  });
};
export const userLogin = ({
  email,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/login`, {
    email,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const userLogout = () => {
  return axios.post(`${pend2}/user/logout`);
};

export const getUserInfo = () => {
  return axios.get(`${pend2}/user/getUserInfo`, getHeader);
};

export const getRecentActivity = (page = 1) => {
  return axios.get(`${pend2}/user/getRecentActivity?page=` + page, getHeader);
};

/*交易所*/
export const balanceQuery = () => {
  return axios.get(`${pend2}/exchange/balanceQuery`, getHeader);
};

export const getMarketInfo = (market) => {
  return axios.get(`${pend2}/exchange/getMarketInfo?market=` + market, getHeader)
};

export const getMarketPrecision = () => {
  return axios.get(`${pend2}/exchange/getMarketInfo`, getHeader)
};

export const orderPutLimit = ({
  market,
  side,
  price,
  amount,
  option,
  datetime
}) => {
  return axios.post(`${pend2}/exchange/orderPutLimit`, {
    market,
    side,
    price,
    amount,
    option,
    datetime
  });
};

//市价单
export const orderPutMarket = ({
  market,
  side,
  amount
}) => {
  return axios.post(`${pend2}/exchange/orderPutMarket`, {
    market,
    side,
    amount,
  });
};

export const getOrderList = (params) => {
  return axios.get(`${pend2}/order/lists?` + toParmStr(params), getHeader)
}

export const getOrderDetailList = (params) => {
  return axios.get(`${pend2}/order/dealDetailLists?` + toParmStr(params), getHeader)
}
//取消单
export const orderCancel = ({
  order_id,
  market
}) => {
  return axios.get(`${pend2}/exchange/orderCancel?` + toParmStr({
    order_id,
    market
  }), getHeader);
};

//批量取消订单
export const batchCancelOrder = ({order_ids, uid}) => {
  return axios.get(`${pend2}/exchange/orderCancelLists?` + toParmStr({
    order_ids,
    uid
  }), getHeader);
};


/* 钱包 */
export const getAssetsList = () => {
  return axios.get(`${pend2}/account/assetsList`, getHeader)
}

export const exchangeToAccount = ({
  type,
  balance
}) => {
  return axios.post(`${pend2}/exchange/toAccount`, {
    type,
    balance
  })
}

export const exchangeToStock = ({
  type,
  balance
}) => {
  return axios.get(`${pend2}/account/toExchange?` + toParmStr({
    type,
    balance
  }), getHeader)
}

export const getWalletAddress = (type) => {
  return axios.get(`${pend2}/account/getAddress?type=` + type, getHeader)
}

export const withDraw = ({
  type,
  balance,
  outer_address
}) => {
  return axios.post(`${pend2}/account/withdraw`, {
    type,
    balance,
    outer_address
  })
}

//最爱功能
export const getCollectList = () => {
  return axios.get(`${pend2}/quotation/getCollectLists`, getHeader);
};

export const addCollect = (market) => {
  return axios.get(`${pend2}/quotation/addCollect?market=` + market, getHeader);
};

export const removeCollect = (market) => {
  return axios.get(`${pend2}/quotation/removeCollect?market=` + market, getHeader)
};
