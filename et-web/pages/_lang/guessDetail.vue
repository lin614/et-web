<template>
    <div class="page-guessing">
        <div class="main guessing">
            <ex-card class="main white-paper">
              <span slot="title">我的竞猜</span>
              <div class="card-cnt">
                <pklist></pklist>
              </div>
            </ex-card>
        </div>
    </div>
</template>

<script>
import ExCard from '@/components/ExCard'
import pklist from "@/components/guessing/pklist";
export default {
  components: {ExCard, pklist},
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.page-guessing {
  margin-top: 20px;
}
.guessDetail {
  margin-top: 16px;
  min-height: 800px;
}
</style>