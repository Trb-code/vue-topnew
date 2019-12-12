<template>
  <div class="ueslogo">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- 输入框组件 -->
        <logoinp></logoinp>
        <logoinp></logoinp>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>

      <!-- 封装好的按钮 -->
      <logobtn text="登录"></logobtn>
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
  }
};
</script>

<style lang="less" scoped>
.ueslogo {
  padding: 20px;
  //   background-color: #eee;
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
