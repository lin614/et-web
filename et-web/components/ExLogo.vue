<template>
  <div class="ExLogo">
    <img class="logo" src="../assets/images/logo1.png">
    <img src="../assets/images/logo2.png">
  </div>
</template>
<style lang="stylus" scoped>
.ExLogo {
  img {
    height: 32px;
  }

  .logo {
    transform: rotateY(360deg);
    animation: turn 3.5s ease-out forwards  1s;
  }

  @keyframes turn {
    100% {
      transform: rotateY(0deg);
    }
  }
}
</style>

