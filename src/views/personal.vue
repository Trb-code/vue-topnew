<template>
  <div class="center">
    <!-- 个人中心头部 -->
    <!-- 跳转个人编辑页面 -->
    <router-link :to="'/editpersonal/'+curruser.id">
      <div class="myhead">
        <img :src="curruser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            <!-- 火星网友 -->
            {{ curruser.nickname}}
          </div>
          <div class="time">2019-12-24</div>
        </div>

        <van-icon name="arrow" />
      </div>
    </router-link>
    <!-- 单元格 -->
    <personalcenter title="我的关注" text="关注用户" @click="$router.push({name:'myfocus'})"></personalcenter>
    <personalcenter title="我的跟帖" text="跟帖/回复"></personalcenter>
    <personalcenter title="我的收藏" text="文章/视频"></personalcenter>
    <personalcenter title="设置"></personalcenter>
    <span slot="right" class="tuichu" @click="back">退出</span>
  </div>
</template>

<script>
// import baselur from ""
import { personal } from "../components/myaxios/API";
// 引入personalcell封装的组件
import personalcenter from "@/components/personalcell.vue";
export default {
  // 获取资料成功，创建空对象接收
  data() {
    return {
      curruser: {}
    };
  },

  mounted() {
    // 获取数据成功
    let id = this.$route.params.id;
    personal(id)
      .then(res => {
        console.log(res);
        if (res.data.message === "获取成功") {
          // 获取成功的数据放在curruser对象里面
          this.curruser = res.data.data;
          // 如果有图片
          if (this.curruser.head_img) {
            this.curruser.head_img =
              // 第一种获取服务器图片
              // "http://localhost:3000" + this.curruser.head_img;
              // 第二种获取服务器图片，方便
              localStorage.getItem("serveurl") + this.curruser.head_img;
          } else {
            this.curruser.head_img =
              localStorage.getItem("serveurl") +
              "/uploads/image/IMG1568705287936.jpeg";
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.$tost.fail("获取失败，请重试");
      });
  },

  // 注册组件
  components: {
    personalcenter
  },
  methods: {
    back() {
      localStorage.removeItem("newtoken");
      localStorage.removeItem("serveurl");
      this.$router.push({ name: "logo" });
    }
  }
};
</script>

<style lang="less" scoped>
.center {
  // width: 100vw;
  // height: 500px;
  background-color: #eee;
}
.myhead {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  // align-items: center;

  border-bottom: 3px #ddd solid;
}
.profile-center {
  flex: 1;
  padding: 0 10px;
}
img {
  width: 70 / 360 * 100vw;
  height: 70 / 360 * 100vw;
  border-radius: 50%;
}
.tuichu {
  display: flex;
  justify-content: center;
  height: 30px;
  align-items: center;
  background-color: red;
  border-radius: 15px;
  margin: 10px 25px;
}
</style>