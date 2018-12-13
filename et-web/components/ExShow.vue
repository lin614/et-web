<template>
    <div class="show">
        <v-hover>
            <v-card color=" " width="399" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
                <!-- <img class="timq" src='../assets/images/timq/1.jpg' /> -->
                <v-card-title>
                    <div>
                        <h3 class="display-1"><i class="iconfont icon-btc" style="font-size:32px"></i>&nbsp&nbsp{{et.etBtc}}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.currentDay') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-bitcoin-1"></i>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card color=" " width="399" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
                <!-- <img class="timq" src='../assets/images/timq/2.jpg' /> -->
                <v-card-title>
                    <div>
                        <h3 class="display-1">{{et.volAll}}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.etCirculation') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-coin"></i>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card color=" " width="400" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 0}`" ripple>
                <!-- <img class="timq" src='../assets/images/timq/5.jpg' /> -->
                <v-card-title>
                    <div>
                        <h3 class="display-1">{{dayNum}}&nbsp&nbsp{{ $t('index.txSumary.freeUnit') }}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">{{ $t('index.txSumary.freeTitle') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-Time"></i>
                    </v-btn>

                </v-card-title>
            </v-card>
        </v-hover>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['et']),
    ...mapGetters(['dayNum'])
  }
}
</script>

<style lang="stylus" scoped>
.show {
    display: flex;
    justify-content: space-between;

    .timq {
        width: 100%;
        height: 140px;
    }
}
</style>