<template>
  <div class="item">
    <!-- 调用组件自己------------------------------------------- -->
    <mygoodcommentblock v-if="blockcomment.parent" :blockcomment="blockcomment.parent"></mygoodcommentblock>
    <div class="head">
      <div>
        <p>{{blockcomment.user.nickname}}</p>
        <span>2小时前</span>
      </div>
      <span>回复</span>
    </div>
    <div class="text">{{blockcomment.content}}</div>
  </div>
</template>

<script>
export default {
  // 接受父组件传过来的数据，然后动态渲染
  props: ["blockcomment"],
  // 注册当前组件 实现嵌套
  name: "mygoodcommentblock"
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px 0;
  border: 1px solid #ccc;
  margin: 10px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;

      margin-right: 10px !important;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>