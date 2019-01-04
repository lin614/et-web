<template>
  <div class="pkchart">
    <!-- {{}} -->
    <div class="item-up">
      <span>{{(vup*100).toFixed(1)}}%</span>
      <div
        class="rec"
        :style="{height:`${vup*200}px`}"
      ></div>
      <span>看 涨</span>
    </div>
    <div class='pk'>
      PK
    </div>
    <div class="item-down">
      <span>{{(vdown*100).toFixed(1)}}%</span>
      <div
        class="rec"
        :style="{height:`${vdown*200}px`}"
      ></div>
      <span>看 跌</span>
    </div>

  </div>
</template>
<script>
export default {
  props: ["v1", "v2"],
  computed: {
    vup() {
      return this.v1 + this.v2 == 0
        ? 0
        : (this.v1 / (this.v1 + this.v2)).toFixed(4);
    },
    vdown() {
      return this.v1 + this.v2 == 0
        ? 0
        : (this.v2 / (this.v1 + this.v2)).toFixed(4);
    }
  }
};
</script>

<style lang="less" scoped>
.pkchart {
  padding: 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  font-size: 24px;
  height: 320px;
  .item-up {
    .rec {
      width: 56px;
      background: #00c475;
      //   height: 200px;
    }
    span {
      color: #00c475;
    }
  }
  .item-down {
    .rec {
      width: 56px;
      background: #e13737;
      height: 100px;
    }
    span {
      color: #e13737;
    }
  }
  .pk {
    height: 150px;
    font-size: 48px;
    font-weight: bold;
  }
}
</style>
