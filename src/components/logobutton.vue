<template>
  <!-- // 按钮封装 -->
  <div class="btn" @click="handclick">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ["text"],
  // 子组件绑定点击事件
  methods: {
    handclick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 48 * 100vw/360;
  background-color: rgb(204, 51, 0);
  border-radius: 24 * 100vw/360;
  color: #fff;
  text-align: center;
  line-height: 48 * 100vw/360;
  font-size: 18px;
}
</style>
