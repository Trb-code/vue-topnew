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
      <div class="right" @click="jump">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      </div>
    </div>
    <!-- 列表头部----------------------------------------------->
    <div class="listhead">
      <van-tabs v-model="active" sticky swipeable>
        <!-- 循环遍历，显示出每一项 -->
        <van-tab :title="cate.name" v-for="cate in catelist" :key="cate.id">
          <van-list
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 下拉刷新------------------------------------------------------ -->
            <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
              <!-- 单组件遍历循环，显示新闻详情-------------------------------- -->
              <newblock v-for="post in cate.postlist" :key="post.id" :post="post"></newblock>
            </van-pull-refresh>
          </van-list>
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
  // 监听索引值变化，加载新闻-------------------
  watch: {
    active() {
      if (this.catelist[this.active].postlist.length === 0) {
        this.getnews();
      }
    }
  },

  async mounted() {
    let res = await newlist();
    console.log(res);
    this.id = res.data.data.id;

    if (res.status === 200) {
      this.catelist = res.data.data;
      //   数据改造--------------------
      this.catelist = this.catelist.map(value => {
        return {
          ...value,
          postlist: [],
          pageIndex: 1,
          pageSize: 6,
          loading: false,
          finished: false,
          isLoading: false
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
      // console.log(res);
      // 更新页面数据，后添加进去，res.data.data是数组，需要用到展开运算符
      this.catelist[this.active].postlist.push(...res.data.data);
      // 页面加载好，让提示加载中消失
      this.catelist[this.active].loading = false;

      this.catelist[this.active].isLoading = false;
      // 判断每一项没有更多数据，底部显示出没有更多了
      if (res.data.data.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
      }
    },
    // 瀑布流滚动加载-----------------------------------------------------------
    onLoad() {
      // console.log(123);
      // 重新更新数据
      setTimeout(() => {
        // 瀑布流滚动加载页码加1，显示出新加的数据
        this.catelist[this.active].pageIndex++;
        this.getnews();
      }, 4000);
    },
    // 下拉刷新
    onRefresh() {
      // console.log(11111);
      // 刷新让页面回到第一页
      this.catelist[this.active].pageIndex = 1;

      this.catelist[this.active].finished = false;

      setTimeout(() => {
        // 清空数据
        this.catelist[this.active].postlist.length = 0;
        // 重新加载数据
        this.getnews();
      }, 3000);
    },
    // 点击用户跳转到个人中心
    jump() {
      this.$router.push(`/personal/${window.localStorage.getItem("id")}`);
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