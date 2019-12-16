<template>
  <div class="registeR">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
    </div>
    <inp type="text" v-model="user.username"></inp>
    <inp v-model="user.password" type="password"></inp>
    <inp v-model="user.nickname"></inp>

    <p class="tips">
      已有账号？
      <a href="#/login" class>去登陆</a>
    </p>
    <btn text="注册" @click="resg"></btn>
  </div>
</template>

<script>
import btn from "../components/logobutton";
import inp from "../components/logoinp";
import { register } from "../components/myaxios/API";
export default {
  components: {
    btn,
    inp
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: ""
      },
      pl: "输入手机号码"
    };
  },
  methods: {
    async resg() {
      let res = await register(this.user);
      console.log(res);
      if (res.data.message === "注册成功") {
        this.$notify({ type: "success", message: "注册成功" });
        this.$router.push({ name: "logo" });
      } else {
        this.$notify({ type: "danger", message: "注册失败，请重试" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
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
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
    font-size: 12px;
  }
}
</style>