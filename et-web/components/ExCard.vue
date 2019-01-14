<template>
    <div class="crd">
        <div class="title">
            <div class="linepot"></div>
            <slot name="title"></slot>
            <slot name="more"></slot>
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
        flex: 1 1 auto;
        height: 40px;
    }
    .more {
        float: right;
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


