<template>
  <!-- 个人中心封装栏 -->
  <div class="center" @click="handclick">
    <div class="left">{{title}}</div>
    <div class="right">
      {{text}}
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "title"],
  methods: {
    handclick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
.center {
  display: flex;
  // border-bottom: 1px solid rgb(160, 41, 41);
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid #ccc;
  height: 40 * 100vw/360;
}
.right {
  color: #a4a4a4;
  font-size: 14px;
}
</style>