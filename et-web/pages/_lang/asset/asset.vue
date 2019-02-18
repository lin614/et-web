<template>
  <div class="main">
    <ex-card class="page-asset">
      <span slot="title">{{ $t('userCenter.asset.title') }}</span>
      <div class="hd">
        <div class="balance-wrap">
          <p>{{ $t('userCenter.asset.estimatedValue') }}</p>
          <p>
            <span class="total-amount">{{BTCBalance}}</span>
            <span class="coin">BTC</span>
            / {{ $t('userCenter.asset.legalTender') }}{{balanceTotal}}
          </p>
        </div>

        <div>
          <v-checkbox class="fl" v-model="hideSmallAmount" :label="$t('register.readed')" type="checkbox"></v-checkbox>

          <router-link
            to="/usercenter/financeRecord"
            class="fr"
          >{{$t('userCenter.financeRecord.title')}}</router-link>
        </div>

        <v-data-table :headers="headers" :items="assetList" :hide-actions="true">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.token }}</td>
            <td>{{ props.item.account_available }}</td>
            <td>{{ props.item.exchange_available }}</td>
            <td>{{ props.item.exchange_freeze }}</td>
            <td class="text-xs-right">
              <router-link class="operator" :to="`/asset/recharge/${props.item.token}`">{{$t('userCenter.asset.transfer.deposit')}}</router-link>
              <router-link class="operator" :to="`/asset/withdraw/${props.item.token}`">{{$t('userCenter.asset.transfer.withdraw')}}</router-link>
              <span class="operator pointer highlight" @click="showTransferModal(props.item)">{{$t('userCenter.asset.transfer.transfer')}}</span>
              <span class="operator pointer highlight" @click="toTrade(props.item)">{{$t('userCenter.asset.transfer.trade')}}</span>
            </td>
          </template>
        </v-data-table>

        <v-dialog v-model="transferShow" persistent max-width="600px" class="transfer-modal">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('userCenter.asset.transfer.title') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-form class="form" ref="transferModal">
                    <v-flex xs12>
                      <v-text-field v-model="transferToken" :label="$t('userCenter.asset.transfer.token')" disabled> </v-text-field>
                    </v-flex>

                    <v-flex xs12 class="side">
                      <v-select :items="fromList" item-text="label" item-value="value" v-model="transferFrom" :label="$t('userCenter.asset.transfer.from')" @change="transferChange('transferFrom')" required></v-select>
                      <div class="hint" v-show="transferFrom !== ''" @click="copyAmount((transferFrom === 'gatewayAccount' ? transferGatewayAccountAmount : transferTxAccountAmount))">
                        {{$t('userCenter.asset.transfer.balance') + ': ' + (transferFrom === 'gatewayAccount' ? transferGatewayAccountAmount : transferTxAccountAmount) + transferObj.token}}
                      </div>
                    </v-flex>

                    <v-flex xs12 class="side">
                      <v-select :items="fromList" item-text="label" item-value="value" v-model="transferTo" :label="$t('userCenter.asset.transfer.to')" @change="transferChange('transferTo')" required></v-select>
                      <div class="hint" v-show="transferTo !== ''" @click="copyAmount((transferTo === 'gatewayAccount' ? transferGatewayAccountAmount : transferTxAccountAmount))">
                        {{$t('userCenter.asset.transfer.balance') + ': ' + (transferTo === 'gatewayAccount' ? transferGatewayAccountAmount : transferTxAccountAmount) + transferObj.token}}
                      </div>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field v-model="transferAmount" :label="$t('userCenter.asset.transfer.volume')" :error-messages="transferAmountErrors" @input="$v.transferAmount.$touch()" @blur="$v.transferAmount.$touch()" required> </v-text-field>
                    </v-flex>
                  </v-form>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeTransferModal">{{ $t('common.cancel') }}</v-btn>
              <v-btn color="blue darken-1" flat :loading="transferLoading" :disabled="transferLoading"  @click="transfer">{{ $t('common.confirm') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </ex-card>
  </div>
</template>

<script>
import ExCard from "@/components/ExCard";
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  components: { ExCard },

  mixins: [validationMixin],

  validations: {
    transferAmount: {required}
  },

  data() {
    return {
      BTCBalance: "--",
      balanceTotal: "--",
      hideSmallAmount: false,
      assetList: [],
      // 划转
      transferLoading: false,
      transferObj: {token: ''},
      transferShow: false,
      transferToken: '',
      transferFrom: '',
      transferTo: '',
      transferAmount: '',
      transferGatewayAccountAmount: '', // 充提账户
      transferTxAccountAmount: '', // 币币账户
      transferFromHint: '',
    }
  },
  computed: {
    headers () {
        return [
            { text: this.$t('userCenter.asset.transfer.token'), sortable: false },
            { text: this.$t('userCenter.asset.transfer.account_available'), sortable: false },
            { text: this.$t('userCenter.asset.transfer.exchange_available'), sortable: false },
            { text: this.$t('userCenter.asset.transfer.exchange_freeze'), sortable: false },
            { text: this.$t('common.operation'), sortable: false, align: 'right' }
        ]
    },
    smallAmount () {
        return this.hideSmallAmount;
    },
    fromList() {
      return [
        {
          label: this.$t('userCenter.asset.transfer.account_available'),
          value: 'gatewayAccount'
        },
        {
          label: this.$t('userCenter.asset.transfer.exchange_available'),
          value: 'txAccount'
        }
      ]
    },
    transferAmountErrors () {
      let value = this.transferAmount
      const errors = []
      if (!this.$v.transferAmount.$dirty) return errors
      !this.$v.transferAmount.required && errors.push(this.$t('errorMsg.AMOUNT_BLANK'))
      if(value <= 0) {
        errors.push(this.$t('errorMsg.AMOUNT_EFFECTIVE'))
      }

      // 精度
      let reg = RegExp('^[0-9]{1,20}(.[0-9]{0,' + this.transferObj.decimal + '})?$')
      if (!reg.test(value)) {
        errors.push(this.$t('errorMsg.DECIMAL_LIMIT') + this.transferObj.decimal + this.$t('errorMsg.DECIMAL_UNIT'))
      }

      // 数量
      if (this.transferFrom === 'gatewayAccount') { // 充提转币币
        if (parseFloat(value) > parseFloat(this.transferGatewayAccountAmount)) {
          errors.push(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
        }
      } else if (this.transferFrom === 'txAccount') { // 币币转充提
        if (parseFloat(value) > parseFloat(this.transferTxAccountAmount)) {
          errors.push(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
        }
      } else {
        if (parseFloat(value) > 0) {
          errors.push(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
        }
      }

      return errors
    }
  },
  watch: {
    hideSmallAmount () {
        this.assetList = this.assetList.map(item => {
            item.isSmallAmount = item.btc < 0.0001
        })
    }
  },
  
  created() {
      this.getAssetsList()
  },
  methods: {
    /**
     * 获取我的资产列表
     */
    getAssetsList() {
      var vu = this
      this.$store.dispatch('getAssetsList2', {}).then(res => {
          this.assetList = res.result
      })
    },

    /**
     * 去交易
     */
    toTrade(obj) {
      var token = obj.token
      var pair = 'btc_usdt'
      let pairs = this.$store.state.market.pairs
      let matchArr = pairs.filter(item => {
        return (new RegExp("^" + token + "\/[1-9a-zA-Z]*$", "i")).test(item.name) || (new RegExp("^[1-9a-zA-Z]*\/" + token + "$","i")).test(item.name)
      })

      this.$router.push('/market/' + (matchArr.length > 0 ? (matchArr[0].name.replace(/\//, '_')).toLowerCase() : pair))
    },

    /**
     * 显示划转模态框
     */
    showTransferModal(obj) {
      this.transferShow = true
      this.transferTxAccountAmount = obj.exchange_available
      this.transferGatewayAccountAmount = obj.account_available
      this.transferToken = obj.token
      this.transferObj = obj
    },

    /**
     * 显示划转模态框
     */
    closeTransferModal() {
      this.transferShow = false
      this.transferTxAccountAmount = ''
      this.transferGatewayAccountAmount = ''
      this.transferToken = ''
      this.transferFrom = ''
      this.transferTo = ''
      this.transferAmount = ''
      this.$v.$reset()
    },

    /**
     * 划转
     */
    transfer () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.transferLoading = true
        let params = {
          transferToken: this.transferToken,
          transferAmount: this.transferAmount
        }

        if (this.transferFrom === 'gatewayAccount') {
          // 转到交易账户
          this.$store.dispatch('transferToExchange', params).then(res => {
            if (res.errorCode === 0) {
              this.getAssetsList()
              this.closeTransferModal()
              alert(this.$t('errorMsg.SUCCESS'))
            } else {
              apiError(vu, res)
            }
            this.transferLoading = false
          })
        } else if (this.transferFrom === 'txAccount') {
          // 转到主账户
          this.$store.dispatch('transferToAccount', params).then(res => {
            if (res.errorCode === 0) {
              this.getAssetsList()
              this.closeTransferModal()
              alert(this.$t('errorMsg.SUCCESS'))
            } else {
              apiError(vu, res)
            }
            this.transferLoading = false
          })
        }
      }
    },
    transferChange (param) {
      if (param === 'transferFrom') {
        this.transferTo = this.transferFrom === 'gatewayAccount' ? 'txAccount' : 'gatewayAccount';
      } else {
        this.transferFrom = this.transferTo === 'gatewayAccount' ? 'txAccount' : 'gatewayAccount';
      }
    },
    copyAmount(value) {
      this.transferAmount = parseFloat(value).toFixed(this.transferObj.decimal)
    },
  }
};
</script>

<style lang="less">
// @import url(../../assets/style/config.less);
.main {
  padding-top: 20px;
  min-height: 800px;
}
.form .side {
  position: relative;
  .hint {
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
    font-weight: 100;
    font-size: 12px;
  }
}
.page-asset {
  .balance-wrap {
    p {
      color: #a2a2a2;
      .total-amount {
        color: #000;
      }
      .coin {
        color: #000;
      }
    }
  }
  .text-xs-right .operator {
    margin-left: 10px;
  }
}
</style>