<template>
  <div class="mt-0">
    <v-hover>
      <v-card width="1200" slot-scope="{ hover }" :class="`elevation-${hover ? 5: 1}`">
      <v-card-title>
        <span class="title mb-0">主区
        </span>
       
      </v-card-title>
      <v-card-text class="pa-0">
        <ex-pairs-table />
      </v-card-text>
    </v-card>
    </v-hover>
  </div>
</template>
<script>
import ExPairsTable from "./ExPairsTable";
export default {
  components: { ExPairsTable },
  props: ["coin", "domain"],
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
</style>
