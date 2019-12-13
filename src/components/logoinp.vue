<template>
  <div>
    <!-- 输入框封装 -->
    <input
      :type="type"
      class="inp"
      :value="value"
      @input="handinput"
      @blur="handblur"
      :class="{ error: !state, cg: state }"
    />
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  // rule 正则表达式
  props: ["type", "value", "rules", "megerror"],
  data() {
    return {
      state: false
    };
  },

  methods: {
    // 响应文本框失去焦点，如果有并且输入不合法，给出相应提示
    handblur(event) {
      if (!this.rules.test(event.target.value)) {
        this.$toast.fail(this.megerror);
        // console.log(this.megerror);
      }
    },

    // 输入内容发生改变，告诉父组件,响应文本框变化
    handinput(event) {
      // 获取输入框的内容
      let value = event.target.value;
      // 正则表达式 验证输入法是否合法

      if (this.rules && this.rules.test(value)) {
        this.state = true;
      } else {
        this.state = false;
      }

      // 发生输入框改变的值
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="less" scoped>
.inp {
  width: 314 * 100vw/360;
  height: 40 * 100vw/360;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(117, 117, 117);
  font-size: 18px;
  margin: 5px 0;
  background-color: transparent;
}
.error {
  border-bottom-color: red;
}
.cg {
  border-bottom-color: green;
}
</style>
