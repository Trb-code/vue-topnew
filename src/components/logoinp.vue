<template>
  <div>
    <!-- 输入框封装 -->
    <input type="text" class="inp" />
  </div>
</template>

<script>
export default {
  props: ["type"]
};
</script>

<style lang="less" scoped>
.inp {
  width: 314 * 100vw/360;
  height: 40 * 100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(117, 117, 117);
  font-size: 18px;
  margin: 5px 0;
  background-color: transparent;
}
</style>
