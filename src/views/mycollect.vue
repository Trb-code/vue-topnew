<template>
  <div class="mycollect">
    <div class="head">
      <van-icon name="arrow-left" @click="$router.back()" />
      <myhead tittle="我的收藏"></myhead>
    </div>
    <div class="list"></div>
  </div>
</template>

<script>
import myhead from "../components/editheader";

export default {
  components: {
    myhead
  }
};
</script>

<style lang="less" scoped>
.van-icon {
  position: absolute;
  top: 15px;
  left: 0;
}
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>