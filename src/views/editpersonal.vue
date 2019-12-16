<template>
  <div class="edit">
    <span slot="left">
      <van-icon name="arrow-left" @click="$router.back()" />
    </span>
    <editheader tittle="编辑资料"></editheader>

    <div class="head">
      <img alt :src="curruser.head_img" />
      <!-- vant upload插件 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <personalcenter title="昵称" :text="curruser.nickname" @click="nickshow=!nickshow"></personalcenter>
    <!-- 点击昵称弹窗 ————————————————————————————————————————————————————————————————————————————————————-->
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="sure">
      <van-field
        error-message="改个帅气的昵称吧"
        border
        label="昵称"
        :value="curruser.nickname"
        ref="nicheng"
      />
    </van-dialog>
    <!-- 密码 ————————————————————————————————————————————————————————————————————————————————————————-->
    <van-dialog v-model="psw" title="修改密码" show-cancel-button>
      <van-field required label="原密码" ref="oldpsw" @blur="handblur" />
      <van-field label="新密码" placeholder="请输入新密码" ref="newpsw" required />
    </van-dialog>

    <personalcenter title="密码" :text="curruser.password" @click="psw=!psw"></personalcenter>

    <!-- 性别 ——————————————————————————————————————————————————————————————————————————————————————————————————-->
    <van-dialog v-model="gendre" title="修改性别" show-cancel-button @confirm="updataxb">
      <van-picker :columns="columns" :default-index="+xingbie" @change="onChange" />
    </van-dialog>
    <personalcenter title="性别" :text="curruser.gender===1?'男':'女'" @click="gendre=!gendre"></personalcenter>
  </div>
</template>

<script>
import editheader from "../components/editheader";
import personalcenter from "@/components/personalcell.vue";
import { upolad } from "../components/myaxios/upload.js";
import { edituser } from "../components/myaxios/API.js";

export default {
  data() {
    return {
      id: "",
      curruser: {},
      nickshow: false,
      columns: ["女", "男"],
      gendre: false,
      xingbie: "",
      psw: false
    };
  },
  components: {
    editheader,
    personalcenter
  },
  mounted() {
    // 实现获取编辑数据
    this.id = this.$route.params.id;
    // console.log(this.$route.params.id);
    edituser(this.id)
      .then(res => {
        console.log(res);
        // 获取到的数据放在空对象里面
        this.curruser = res.data.data;

        // head_img地址不完整，需要加上服务器地址
        this.curruser.head_img =
          localStorage.getItem("serveurl") + res.data.data.head_img;
        console.log(this.curruser);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 实现图片上传——————————————————————————————————————————————————————————————————————————————————————————
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      upolad(formdata)
        .then(async res => {
          console.log(res);
          if (res.data.message === "文件上传成功") {
            // 实现用户头像更新;
            let res1 = await edituser(this.id, { head_img: res.data.data.url });
            // console.log(res1);
            if (res1.data.message === "修改成功") {
              this.curruser.head_img =
                localStorage.getItem("serveurl") + res.data.data.url;
            } else {
              this.$toast.fail("修改失败请重试");
            }
          } else {
            this.$toast.fail("文件上传失败请重试");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 修改昵称————————————————————————————————————————————————————————————————————————————————————————————-
    async sure() {
      // 获取输入框的value值
      // console.log(this.$refs.nicheng.$refs.input.value);
      let nickname = this.$refs.nicheng.$refs.input.value;
      let resn = await edituser(this.id, { nickname });
      // console.log(resn);
      if (resn.data.message === "修改成功") {
        this.curruser.nickname = resn.data.data.nickname;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改昵称失败");
      }
    },
    // 修改密码--------------------------------------------------------------------------------------
    handblur() {
      // 获取原密码输入的内容
      // console.log(this.$refs.oldpsw.$refs.input.value);
      let oldpsw = this.$refs.oldpsw.$refs.input.value;
      console.log(this.curruser);

      if (this.curruser.password === oldpsw) {
        // let resp = await edituser(this.id, {
        //   password: oldpsw
        // });
        alert("555");
        // this.$refs.newpsw.$refs.input.value;
        // console.log(this.$refs.newpsw.$refs.input.value);
      }
    },

    // 修改性别——————————————————————————————————————————————————————————————————————————————————————————————————
    async updataxb() {
      let resx = await edituser(this.id, { gender: this.xingbie });
      console.log(resx);
      if (resx.data.message === "修改成功") {
        this.curruser.gender = resx.data.data.gender;
        this.$notify({ type: "success", message: "修改成功" });
      } else {
        this.$notify({ type: "danger", message: "修改失败，请重试" });
      }
    },
    onChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.xingbie = index;
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  background-color: #eee;
  height: 100vh;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
}

img {
  display: block;
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
  border-radius: 50%;
}

// 上传图片居中隐藏
.van-uploader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}
</style>