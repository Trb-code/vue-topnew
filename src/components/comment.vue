  <template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="$router.push({path:`/goodcomment/${news.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{news.comment_length}}</em>
      </span>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" :placeholder="placeholder"></textarea>
      <div>
        <span>发送</span>
        <span @click="isFocus=false">取消</span>
      </div>
    </div>
  </div>
</template>


<script>
import { collect } from "./myaxios/API";
export default {
  props: ["news", "soncomment"],
  data() {
    return {
      isFocus: false,
      placeholder: ""
    };
  },
  watch: {
    soncomment() {
      this.isFocus = true;
      this.placeholder = "@" + this.soncomment.user.nickname;
    }
  },
  methods: {
    //   获取焦点时触发----------
    handlerFocus() {
      this.isFocus = !this.isFocus;
      setTimeout(() => {
        this.$refs.commtext.focus();
      }, 1);
      console.log(this.news);
    },
    // 点击星星收藏文章切换----------------------------------->
    async start() {
      let res = await collect(this.news.id);
      console.log(res);
      if (res.data.message == "收藏成功") {
        this.$toast("收藏成功");
      } else {
        this.$toast("取消收藏");
      }
      this.news.has_star = !this.news.has_star;
    }
  }
};
</script>


<style lang='less' scoped>
.comment {
  position: fixed;
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  margin: 10px;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.shoucang {
  color: #f00;
}
</style>
