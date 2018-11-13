<template>
  <div>
    <v-carousel height="380" hide-controls>
      <v-carousel-item v-for="(item,i) in $t('static.banner')" :key="i" :src="item.bgUrl" max="100%">
        <div class="banner">          
          <img :src="item.imgUrl" class="banner_img">
        </div>
      </v-carousel-item>
    </v-carousel>
    <ex-notice></ex-notice>
  </div>
</template>
<script>
import ExNotice from './ExNotice'
export default {
  components: { ExNotice }
}
</script>

<style>
.v-carousel__controls {
  /* background: none; */
  height: auto;
}
</style>

<style lang="stylus" scoped>
.banner {
  margin: 0 auto;
  width: 1200px;
  height: 380px;
}
</style>
