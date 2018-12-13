<template>
  <div class="ExLogo mt-1">
    <img class="logo" src="../assets/images/logo1.png">
    <img src="../assets/images/logo2.png" >
  </div>
</template>
<script>
export default {
  computed: {
    isdark() {
      return this.$store.state.theme.dark == true
    }
  }
}
</script>

<style lang="stylus" scoped>
.ExLogo {
  img {
    height: 28px;
  }

  .logo {
    transform: rotateY(360deg);
    animation: turn 3.5s ease-out forwards 1s;
  }

  @keyframes turn {
    100% {
      transform: rotateY(0deg);
    }
  }
}
</style>

