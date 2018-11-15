<template>
  <div style="background:url(https://d3bcj1iwrh8aaw.cloudfront.net/imgs/ban-bg1.jpg)">
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
import ExNotice from './ExNotice2'
export default {
  components: { ExNotice },
  data() {
    return {
      banner: this.items
    }
  }
}
</script>

<style>
.v-carousel {
  box-shadow: none;
}
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
