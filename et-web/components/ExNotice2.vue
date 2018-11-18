<template>
    <div class="notice">
        <v-hover>
            <v-list two-line :dark="theme.dark" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                <template v-for="(item, index) in $t('static.notice')">
                    <v-hover>
                        <v-list-tile :key="index" avatar ripple @click="" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.subTitle }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <!-- <v-divider v-if="index + 1 < $t('static.notice').length" :key="`divider-${index}`"></v-divider> -->
                    </v-hover>
                </template>
            </v-list>
        </v-hover>

    </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['theme'])
  }
}
</script>
<style>
.v-list {
  padding: 0;
}
</style>

<style lang="stylus" scoped>
.notice {
    position: absolute;
    width: 390px;
    // height: 380px;
    float: right;
    right: calc(50% - 600px);
    top: 40px;

    &:hover {
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    }
}
</style>
