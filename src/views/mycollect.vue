<template>
  <div class="mycollect">
    <div class="head">
      <van-icon name="arrow-left" @click="$router.back()" />
      <myhead tittle="我的收藏"></myhead>
    </div>

    <!-- vant滑动单元格 ------------------------------------------------------------->
    <van-swipe-cell v-for="(item,index) in myclooects" :key="item.id">
      <div class="list">
        <div class="single">
          <div class="left">
            <p class="content">{{item.title}}</p>
            <p class="info">
              <span>{{item.user.nickname}}</span>
              <span>跟帖</span>
            </p>
          </div>
          <img :src="item.cover[0].url" alt />
        </div>
      </div>

      <template slot="right">
        <van-button square type="danger" text="删除" @click="del(item.id,index)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import myhead from "../components/editheader";
import { myclooect, collect } from "../components/myaxios/API";
// import newblock from "../components/newblock.vue";
export default {
  data() {
    return {
      myclooects: []
    };
  },
  components: {
    myhead
    // newblock
  },
  async mounted() {
    //   默认加载收藏数据
    let res = await myclooect();
    console.log(res);
    if (res.status === 200) {
      this.myclooects = res.data.data;
    }
  },
  methods: {
    //   点击取消收藏----------------------------------
    async del(id, index) {
      let res2 = await collect(id);
      console.log(res2);
      if (res2.data.message === "取消成功") {
        this.myclooects.splice(index, 1);
        this.$notify({ type: "primary", message: res2.data.message });
      }
    }
  }
};
</script>

<style lang="less" scoped >
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
/deep/.van-swipe-cell__right {
  //   position: absolute !important;

  height: 100vh !important;
  background-color: #ee0a24 !important;
}
/deep/.van-button__text {
  display: flex !important;
  padding-top: 30vw * 100/360 !important;
  align-items: center !important;
}
</style>