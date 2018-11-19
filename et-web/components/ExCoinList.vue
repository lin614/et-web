<template>
    <div>
        <div>
            {{$store.state.test.time}}
            <v-hover>
                <v-tabs v-model="active" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                    <v-tab v-for="n in 3" :key="n" ripple>
                        {{['USDT','BTC','ETH'][n-1] }}
                    </v-tab>
                    <v-tab-item v-for="n in 3" :key="n">
                        <v-card flat>
                            <v-card-text>
                                <div class="coinlist mt-3">

                                    <v-hover>
                                        <v-card width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                                            <v-card-title>
                                                <h4>eth/usdt</h4>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-list dense>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calories:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">aaa</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Fat:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">bbb</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Carbs:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ccc</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Protein:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ddd</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Sodium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">eee</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calcium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">fff</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Iron:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ggg</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                    </v-hover>
                                    <v-hover>
                                        <v-card class="ml-3" width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                                            <v-card-title>
                                                <h4>eth/usdt</h4>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-list dense>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calories:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">aaa</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Fat:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">bbb</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Carbs:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ccc</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Protein:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ddd</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Sodium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">eee</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calcium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">fff</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Iron:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ggg</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                    </v-hover>
                                    <v-hover>
                                        <v-card class="ml-3" width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                                            <v-card-title>
                                                <h4>eth/usdt</h4>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-list dense>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calories:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">aaa</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Fat:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">bbb</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Carbs:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ccc</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Protein:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ddd</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Sodium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">eee</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calcium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">fff</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Iron:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ggg</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                    </v-hover>
                                    <v-hover>
                                        <v-card class="ml-3" width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                                            <v-card-title>
                                                <h4>eth/usdt</h4>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-list flat>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calories:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">aaa</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Fat:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">bbb</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Carbs:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ccc</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Protein:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ddd</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Sodium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">eee</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Calcium:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">fff</v-list-tile-content>
                                                </v-list-tile>
                                                <v-list-tile>
                                                    <v-list-tile-content>Iron:</v-list-tile-content>
                                                    <v-list-tile-content class="align-end">ggg</v-list-tile-content>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                    </v-hover>

                                </div>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-hover>
        </div>

    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      
      active: 0
    }
  }
}
</script>
<style lang="stylus" scoped>
.coinlist {
    display: flex;
    justify-content: space-between;
}
</style>
