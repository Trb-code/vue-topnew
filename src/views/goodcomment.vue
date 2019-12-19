<template>
  <div class="goodcomment">
    <van-icon name="arrow-left" @click="$router.back()" />
    <myhead tittle="精彩评论"></myhead>

    <!-- 单层跟帖============================================================ -->
    <div class="keeps">
      <div class="item" v-for="commentlist in goodcomment" :key="commentlist.id">
        <div class="head">
          <img :src="commentlist.user.head_img" alt />
          <div>
            <p>{{commentlist.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span class="huifu">回复 &nbsp;</span>
        </div>

        <!-- 评论块组件---------------------------------------------- -->
        <commentblock></commentblock>

        <div class="text">{{commentlist.content}}</div>
      </div>
    </div>
    <!-- 调用底部评论组件，绑定goodcomment内容渲染---------------------- -->
    <sendcomment :news="goodcomment"></sendcomment>
  </div>
</template>

<script>
import myhead from "../components/editheader.vue";
import { allcomment } from "../components/myaxios/API";
// 引入组件，评论块
import commentblock from "../components/goodcommentblock.vue";
// 引入底部评论输入组件
import sendcomment from "../components/comment.vue";

export default {
  components: {
    myhead,
    commentblock,
    sendcomment
  },
  data() {
    return {
      goodcomment: []
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await allcomment(id);
    console.log(res);
    if (res.status === 200) {
      this.goodcomment = res.data.data;
      res.data.data.map(value => {
        value.user.head_img =
          localStorage.getItem("serveurl") + value.user.head_img;
        return value;
      });
    }
  }
};
</script>

<style lang="less" scoped>
// .goodcomment {
//   background-color: #eee;
//   height: 100%;
// }
.van-icon {
  position: absolute !important;
  display: flex !important;
  //   line-height: 23px !important;
  padding-top: 20px !important;
  //   align-items: center !important;
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
        margin-right: 10px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>