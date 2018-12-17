<template>
    <div class="crd">
        <div class="title">
            <div class="linepot"></div>
            <slot name="title"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'crd',
  props: {
  },
  mounted() {
  }
}
</script>
<style lang="less">
// @import url(../assets/style/config.less);
.crd {
    margin-bottom: 16px;
    .title {
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: flex-start;
    }
    .linepot {
        display: inline-block;
        width: 5px;
        height: 18px;
        margin-right: 10px;
        background: #419aec;
    }
}
</style>


