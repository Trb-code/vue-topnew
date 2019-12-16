<template>
  <div class="index">
    <!-- 头部 ------------------------------>
    <div class="head">
      <div class="left">
        <span class="iconfont iconnew icon"></span>
      </div>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <div class="right">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      </div>
    </div>
    <!-- 列表头部----------------------------------------------->
    <div class="listhead">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 循环遍历，显示出每一项 -->
        <van-tab :title="cate.name" v-for="cate in catelist" :key="cate.id">
          <!-- 遍历每一项新闻 -->
          <newblock v-for="post in cate.postlist" :key="post.id" :post="post"></newblock>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 内容---------------------------------------------------------------------------------- -->
    <div class="list"></div>
  </div>
</template>

<script>
import { newlist } from "../components/myaxios/API.js";
import { getnewlist } from "../components/myaxios/API.js";
// 组件引入
import newblock from "../components/newblock";

export default {
  // 组件注册
  components: {
    newblock
  },
  data() {
    return {
      // 是否有登录    红色下划线设置在头条下面
      active: localStorage.getItem("newtoken") ? 1 : 0,
      catelist: []
    };
  },
  // 监听索引值变化，加载新闻
  watch: {
    active() {
      this.getnews();
    }
  },

  async mounted() {
    let res = await newlist();
    console.log(res);

    if (res.status === 200) {
      this.catelist = res.data.data;
      //   数据改造
      this.catelist = this.catelist.map(value => {
        return {
          ...value,
          postlist: [],
          pageIndex: 1,
          pageSize: 5
        };
      });
      console.log(this.catelist);
      this.getnews();
    }
  },
  methods: {
    //   封装成一个函数，this.getnews() 可以调用
    async getnews() {
      let res = await getnewlist({
        pageIndex: this.catelist[this.active].pageIndex,
        pageSize: this.catelist[this.active].pageSize,
        category: this.catelist[this.active].id
      });
      console.log(res);
      this.catelist[this.active].postlist = res.data.data;
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .head {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .van-image {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>