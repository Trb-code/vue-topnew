<template>
  <div @click="$router.push({path:`/newsarticle/${post.id}` } )">
    <div class="single">
      <div class="left">
        <p class="content">{{post.title}}</p>
        <p class="info">
          <span>{{post.user.nickname}}</span>
          <span>{{post.categories.comment_length}}跟帖</span>
        </p>
      </div>
      <img :src="post.cover[0].url" alt />
    </div>
  </div>
</template>

<script>
export default {
  // post:当前需要渲染的新闻对象----------------
  props: ["post"],
  methods: {
    handclick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
