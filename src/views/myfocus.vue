<template>
  <div class="myfocus">
    <div class="head">
      <van-icon name="arrow-left" @click="$router.back()" />
      <myhead tittle="我的关注"></myhead>
    </div>
    <div class="list" v-for="(focus,index) in myfocus" :key="focus.id">
      <div class="box">
        <img :src="focus.head_img" alt />
        <div class="center">
          <p>{{focus.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="unfocus(focus.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
// 调用封装的头部
import myhead from "../components/editheader";
// 调用api
import { focusapi, unfollows } from "../components/myaxios/API.js";

export default {
  components: {
    myhead
  },
  data() {
    return {
      myfocus: []
    };
  },

  async mounted() {
    //   获取关注列表数据，渲染数据
    let res = await focusapi();
    console.log(res);
    if (res.status === 200) {
      this.myfocus = res.data.data;
    } //   数据改造
    res.data.data.map(value => {
      value.head_img = localStorage.getItem("serveurl") + value.head_img;
      return value;
    });
  },
  methods: {
    //   点击取消关注  （注意点，先从上面遍历循环保留id，取消关住的列表可以通过索引值删除）-------------------------------
    async unfocus(id, index) {
      let res1 = await unfollows(id);
      console.log(res1);
      if (res1.data.message === "取消关注成功") {
        this.myfocus.splice(index, 1);
        this.$toast("取消关注成功");
      }
    }
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