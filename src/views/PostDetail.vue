<template>
  <body>
    <transition name="fade">
      <div id="mask_bigPic" v-if="maskPic_show" @click="smallPic">
        <img :src="post.images" alt="" />
      </div>
    </transition>
    <div class="return" @click="goLastPage">
      <div class="img"></div>
    </div>
    <div class="tu" @click="bigPic">
      <img :src="post.images" alt="" />
    </div>
    <div class="wen">
      <div class="top1">
        <div class="touxiang">
          <div class="tu1">
            <img :src="user.avatar" style="width:50px;height:50px" alt="">
          </div>
        </div>
        <div class="zi">
          <div class="nicheng">{{ this.user.username }}</div>
          <div class="time">{{ post.created }}</div>
        </div>
      </div>
      <div class="top2">
        <div class="label">{{ post.categoryName }}</div>
        <div class="label">{{ post.tags }}</div>
      </div>
      <div class="box">
        <div class="list">
          <div class="list1">详细描述</div>
          <div class="list2">{{ post.description }}</div>
        </div>
        <div class="list">
          <div class="list1">拾获地点</div>
          <div class="list2">{{ post.findLocation }}</div>
        </div>
        <div class="list">
          <div class="list1">放置地点</div>
          <div class="list2">{{ post.nowLocation }}</div>
        </div>
        <div class="list">
          <div class="list1">联系方式</div>
          <div class="list3">
            <div class="number">{{ post.contact }}</div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
    
  </body>
</template>

<script>
import { getPostDetail } from "@/api/post";
import { getUserById } from "@/api/user";

export default {
  name: "postDetail",
  data() {
    return {
      maskPic_show: false,
      post: {},
      user: {},
    };
  },
  created() {
    console.log("22222")
    this.getPostDetail(this.$route.params.id);
  },
  // mounted() {
  //   console.log("11111")
  //   console.log(this.post)
  //   this.getUserById(this.post.userId);
  // },
  methods: {
    getUserById(userId) {
      console.log(userId);
      getUserById(userId).then((res) => {
        this.user = res.data.data;
      });
    },
    bigPic() {
      this.maskPic_show = true;
    },
    smallPic() {
      this.maskPic_show = false;
    },
    // 返回到上一页面
    goLastPage() {
      this.$router.go(-1);
    },
    getPostDetail(id) {
      getPostDetail(id)
        .then((res) => {
          if (res.data.state == 200) {
            this.post = res.data.data;
            console.log(this.post)
            getUserById(this.post.userId).then(res=>{
              console.log(res)
              this.user = res.data.data;
              console.log(this.user)
            })
            
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("系统错误");
        })
        .finally(() => {});
    },
  },
};
</script>

<style scoped lang="css">
body {
  height: 100%;
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  left: 0.6;
}
#mask_bigPic {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
}
#mask_bigPic > img {
  max-width: 90%;
  max-height: 90%;
}
.return {
  position: absolute;
  height: 40px;
  width: 40px;
  background-color: rgb(255, 255, 255);
  top: 40px;
  left: 40px;
  z-index: 4;
  border-radius: 10px;
}
.img {
  background: url("../assets/lansejiantou.png");
  background-size: 100% 100%;
  margin-top: 12px;
  margin-left: 12px;
  height: 18px;
  width: 13px;
}
.tu {
  height: 300px;
  width: 100%;
  background-color: rgb(244, 244, 244);
  position: fixed;
  top: 0px;
  z-index: 2;
  overflow: hidden;
}
.tu > img {
  width: 100%;
}
.wen {
  height: auto;
  width: 100%;
  position: absolute;
  top: 270px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 30px 30px 0px 0px;
  background-color: white;
}
.top1 {
  height: 95px;
  display: flex;
  flex-direction: row;
}
.touxiang {
  width: 20%;
  height: 100%;
}
.tu1 {
  border-radius: 50px;
  background-color: rgb(244, 244, 244);
  margin-top: 20px;
  margin-left: 30px;
  height: 60px;
  width: 60px;
}
.zi {
  width: 80%;
  height: 100%;
  margin-top: 35px;
  margin-left: 25px;
  font-size: 1rem;
  font-family: SourceHanSansCN-Medium;
  font-weight: medium;
  color: #6c6d6d;
}
.top2 {
  height: 30px;
  display: flex;
  flex-direction: row;
}
.label {
  height: 23px;
  width: auto;
  border-radius: 20px;
  margin-left: 6px;
  margin-right: 6px;
  padding-left: 10px;
  padding-top: 4px;
  padding-right: 10px;
  background-color: #5897aa;
  font-size: 0.85rem;
  color: white;
}
.box {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.list {
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
}
.list1 {
  width: 30%;
  height: auto;
  font-size: 1rem;
  font-weight: bold;
  color: #4e4e4e;
  padding-top: 9px;
  margin-left: 15px;
  margin-right: 5px;
}
.list2 {
  width: 100%;
  background-color: #e4ebec;
  padding: 9px;
  border-radius: 20px;
  color: #2a2a2a;
  margin-right: 30px;
  font-size: medium;
}
.list3 {
  width: 100%;
  background-color: #e4ebec;
  padding: 9px;
  border-radius: 20px;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
}
.number {
  color: #2a2a2a;
  font-size: medium;
  width: auto;
  margin-right: 20px;
}
.item {
  color: #a6a6a6;
  font-size: medium;
  font-size: 0.9rem;
}
.bottom{
  width: 100%;
  height: 250px;
  background: white;
}
</style>
