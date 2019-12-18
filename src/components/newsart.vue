<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="follow" :class="{follow:news.has_follow}">{{news.has_follow?"已关注":"关注"}}</span>
    </div>
    <div class="detail">
      <div class="title">{{news.title}}</div>
      <div class="desc">
        <span>{{news.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="news.content"></div>
      <div class="opt">
        <span class="like" @click="handlike" :class="{likes:news.has_like}">
          <van-icon name="good-job-o" />
          点赞{{news.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="item in allcomment" :key="item.id">
        <div class="head">
          <img :src="item.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>

    <comment :news="news"></comment>
  </div>
</template>

<script>
import { newsart, follows, unfollows, like, allcomment } from "./myaxios/API";
// 引入评论组件
import comment from "./comment";

export default {
  components: {
    comment
  },
  data() {
    return {
      news: {},
      allcomment: []
    };
  },

  // 获取页面数据----------------------->
  async mounted() {
    // let id = this.$route.params.id;
    let res = await newsart(this.$route.params.id);
    // console.log(res);
    if (res.status === 200) {
      this.news = res.data.data;
    }
    console.log(this.news);
    // 评论列表渲染------------------------------{ pageSize:3} 可以实现每一页显示多少条的数据-------------------
    let res3 = await allcomment(this.news.id, { pageSize: 3 });
    console.log(res3);
    if (res3.status === 200) {
      this.allcomment = res3.data.data;
    }
    // 数据改造
    res3.data.data.map(value => {
      value.head_img = localStorage.getItem("serveurl") + value.head_img;
      return value;
    });
  },

  methods: {
    // 关注和已关注切换-------------------------------------->
    async follow() {
      this.news.has_follow = !this.news.has_follow;
      if (this.news.has_follow === false) {
        let res = await unfollows(this.news.user.id);
        console.log(res);
      } else {
        let res = await follows(this.news.user.id);
        console.log(res);
      }
    },
    // 点击收藏切换----------------------------------------------------------------
    async handlike() {
      let res = await like(this.news.id);
      // console.log(res);

      if (res.data.message === "点赞成功") {
        this.news.like_length++;
      } else {
        this.news.like_length--;
      }
      this.news.has_like = !this.news.has_like;
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #eee;
    color: black;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    color: #ccc;
  }
  .w {
    color: rgb(84, 163, 5);
  }
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
    border-bottom: 1px solid #ccc;
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
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 100%;
    box-sizing: border-box;
    display: block;
  }
}
.follow {
  background-color: red !important;
  color: #eee;
}
.likes {
  color: red !important;
  border: 3px solid red !important;
}
</style>