<template>
  <body>
    <div class="top1">
      <div class="tu1" @click="toGerenzhongxin"></div>
      <div class="top1-box">匹配通知</div>
    </div>

    <!-- 帖子 -->
    <div class="list">
      <div class="box0" v-show="box01" v-for="post in posts" :key="post.index">
        <!-- 一段空白 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="104"
          height="115"
          viewBox="0 0 104 115"
        >
          <image
            id="北_拷贝"
            data-name="北 拷贝"
            width="104"
            height="115"
            xlink:href="data:img/png;base64,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"
          />
        </svg>
        <!-- 内容盒子 -->
        <div class="box">
          <!-- 图片部分 -->
          <div class="tu" @click="goPostDetail(post.id)">
            <img style="width: 100px; height: 100px" :src="post.images" />
          </div>
          <!-- 文字部分 -->
          <div class="wen" @click="goPostDetail(post.id)">
            <div class="label">
              <div class="label1">#{{ post.categoryName }}</div>
              <div class="label1" v-for="t in post.tag" :key="t.index">
                #{{ t }}
              </div>
            </div>
            <div class="box1">
              <div class="time1">拾获时间: {{ post.created | format }}</div>
            </div>
            <div class="place">拾获地点: {{ post.findLocation }}</div>
          </div>
          <div class="new" v-show="xin1">new!</div>
          <div class="delete" @click="delete1(post.id)">删除</div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { getUserPost, deleteUserPost } from "@/api/user.js";
export default {
  name: "pipeitongzhi",
  components: {},
  data() {
    return {
      posts: "",
      xin1: true,
      xin2: false,
      box01: true,
      box02: true,
    };
  },
  methods: {
    toGerenzhongxin: function () {
      this.$router.push("/Gerenzhongxin");
    },
    delete1(id) {
      deleteUserPost(id).then((res) => {
        if (res.data.state === 200) {
          this.$message({
            type: "success",
            message: `${res.data.msg}`,
          });
          location.reload();
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
      this.box01 = false;
    },

    getUserPost() {
      getUserPost(this.$store.state.userInfo.id).then((res) => {
        this.posts = res.data.data;
      });
    },
    goPostDetail(id) {
      this.$router.push(`PostDetail/${id}`);
    },
  },
  created() {
    this.getUserPost();
  },
};
</script>

<style scoped lang="css">
body {
  background-color: rgb(244, 244, 244);
  height: auto;
  width: 100%;
  margin: 0px;
}
.top1 {
  position: fixed;
  top: 0px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  z-index: 3;
  background-color: white;
  z-index: 5;
}
.top1-box {
  width: 50%;
  margin-right: 18%;
  margin-top: 10px;
  font-weight: Bold;
  font-size: 1.3rem;
  text-align: center;
  color: #589788;
  font-family: SourceHanSansCN-Bold;
}
.tu1 {
  height: 15px;
  width: 8px;
  background: url("../assets/lvsejiantou.png");
  background-size: 100% 100%;
  margin-top: 20px;
}
.list {
  height: 100vh;
  padding: 0 6%;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box0 {
  height: 18vh;
  width: 100%;
  margin-bottom: 20px;
}
.box {
  padding: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -39px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(200 200 200);
}
.box1 {
  display: flex;
  flex-direction: row;
}
.more {
  background: url("../assets/more.png");
  background-size: 100% 100%;
  width: 15px;
  height: 20px;
  position: absolute;
  top: 55px;
  right: 20px;
}
svg {
  position: relative;
  margin-left: 15px;
  width: 40px;
  height: 40px;
  z-index: 4;
}
.tu {
  width: 100px;
  background-color: rgb(244, 244, 244, 244);
  border-radius: 10px;
}
.wen {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
}
.label {
  height: auto;
  display: flex;
  flex-direction: row;
}
.label1 {
  width: auto;
  border-radius: 20px;
  background-color: #5897aa;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  flex-wrap: wrap;
  margin-right: 3px;
  box-sizing: border-box;
  padding: 4px 10px;
}
.label2 {
  width: auto;
  border-radius: 20px;
  background-color: #589788;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  flex-wrap: wrap;
  margin-right: 5px;
  box-sizing: border-box;
  padding: 4px 10px;
}
.time1 {
  height: 20%;
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
.place {
  height: 20%;
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
.new {
  color: #d9534f;
  font-weight: bold;
}
.delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 15px;
  border: #d9534f 1px solid;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #d9534f;
  font-weight: bold;
}
</style>