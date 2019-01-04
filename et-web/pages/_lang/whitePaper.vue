<template>
    <div class="main">
        <ex-card class="white-paper">
            <span slot="title">{{$t('whitepaper.title')}}</span>

            <div class="card-cnt">
                <div class=" content">
                    <img :src="'https://d3bcj1iwrh8aaw.cloudfront.net/imgs/'+$t('whitepaper.folder')+'/0'+i+'.jpg'" v-for="i in [1,2,3,4,5,6,7,8]" :key="i"/>
                </div>
            </div>
        </ex-card>
    </div>
</template>

<script>
import ExCard from '@/components/ExCard'
export default {
  components: { ExCard }
}
</script>

<style lang="less">
@import url(../../assets/style/config.less);
.main {
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  min-height: 800px;
}
.white-paper {
  .content {
    img {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1em;
    }
  }
}
</style>