<template>
  <div class="ueslogo">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- 输入框组件 -->
        <logoinp
          type="text"
          :value="user.username"
          @input="handinput"
          :rules="
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
          "
          megerror="手机号码不合法"
        ></logoinp>
        <logoinp type="password" v-model="user.password"></logoinp>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>

      <!-- 封装好的按钮 -->
      <logobtn text="登录" @click="login"></logobtn>
    </div>
  </div>
</template>

<script>
import logobtn from "@/components/logobutton.vue";
import logoinp from "@/components/logoinp.vue";

export default {
  components: {
    logobtn,
    logoinp
  },
  //   登录用户数据
  data() {
    return {
      user: {
        username: "111",
        password: "222"
      }
    };
  },
  //   接受子组件传过来的点击事件
  methods: {
    login() {
      console.log(this.user);
    },
    // 输入内容变化
    handinput(data) {
      this.user.username = data;
    }
  }
};
</script>

<style lang="less" scoped>
// 网络图标
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
.ueslogo {
  padding: 20px;
  background-color: #eee;
  height: 100vh;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

// .inputs {
//   input {
//     margin-bottom: 20px;
//   }
// }

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
