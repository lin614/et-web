<template>
    <div class="show">
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/1.jpg' />
                <v-card-title>
                    <div>
                        <span class="headline"> <i class="iconfont icon-btc mr-2" style="font-size:24px"></i>{{et.etBtc}}</span>
                        <div class="d-flex">

                            <div class="ml-2 grey--text text--darken-6">
                                <span>
                                    &nbsp{{ $t('index.txSumary.currentDay') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/2.jpg' />
                <v-card-title>
                    <div>
                        <span class="headline">{{et.volAll}}</span>
                        <div class="d-flex">

                            <div class="ml-2 grey--text text--darken-6">
                                <span>{{ $t('index.txSumary.currentDay') }}</span>
                            </div>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
        <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" width="390">
                <img class="timq" src='../assets/images/timq/5.jpg' />
                <v-card-title>
                    <div>
                        <span class="headline">{{dayNum}}</span>
                        <div class="d-flex">

                            <div class="ml-2 grey--text text--darken-6">
                                <span>{{ $t('index.txSumary.currentDay') }}</span>
                            </div>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <v-icon>mdi-chevron-right</v-icon>
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