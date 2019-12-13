<template>
  <div>个人中心</div>
</template>

<script>
import { personal } from "../components/myaxios/API";
export default {
  mounted() {
    let id = this.$route.params.id;
    personal(id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>