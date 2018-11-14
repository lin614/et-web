<template>
  <div>
    <ex-banner></ex-banner>
    <div class="et-show mt-3">
      <ex-show />
    </div>

  </div>
</template>
<script>
import ExBanner from '@/components/ExBanner'
import ExShow from '@/components/ExShow'
import a1 from '../../assets/images/timq/1.jpg'
export default {
  components: { ExBanner, ExShow },
  mounted() {
    }
}
</script>
<style lang="stylus" scoped>
.et-show {
  margin: 0 auto;
  width: 1200px;
  height: 380px;
}
</style>


