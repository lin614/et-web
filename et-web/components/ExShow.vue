<template>
    <div class="show">
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/1.jpg' />
                <v-card-title>
                    <div>
                        <h3 class="headline"><i class="iconfont icon-btc" style="font-size:24px"></i>&nbsp&nbsp{{et.etBtc}}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.currentDay') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-marketing1"></i>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/2.jpg' />
                <v-card-title>
                    <div>
                        <h3 class="headline">{{et.volAll}}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">&nbsp{{ $t('index.txSumary.etCirculation') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-marketing1"></i>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/5.jpg' />
                <v-card-title>
                    <div>
                        <h3 class="headline">{{dayNum}}&nbsp&nbsp{{ $t('index.txSumary.freeUnit') }}</h3>
                        <div class="d-flex">
                            <span class="body-1 mt-2 grey--text">{{ $t('index.txSumary.freeTitle') }}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <i class="iconfont  icon-marketing1"></i>
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