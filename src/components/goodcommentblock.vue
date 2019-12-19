<template>
  <div class="item">
    <div class="head">
      <img src alt />
      <div>
        <p>网友</p>
        <span>2小时前</span>
      </div>
      <span>回复</span>
    </div>
    <div class="text">评论内容</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.item {
  padding: 10px 0;
  border: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
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