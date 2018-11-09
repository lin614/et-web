<template>
  <div>
    <v-carousel hide-controls>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" max="100%"></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  props: ['items'],
  mounted() {
    console.log(this.items)
  }
}
</script>
