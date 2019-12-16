<template>
  <!-- 编辑页面头部封装 -->
  <div class="editheader">
    <span>
      <slot name="left"></slot>
    </span>
    <div class="center">{{tittle}}</div>
    <span>
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ["tittle"]
};
</script>

<style lang="less" scoped>
.editheader {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 46 * 100vw/360;
  border-bottom: 1px solid #ccc;
  align-items: center;
  box-sizing: border-box;

  .center {
    font-weight: 700;
  }
}
</style>