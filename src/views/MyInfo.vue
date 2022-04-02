<template>
  <body>
    <!-- header -->
    <div class="top">
      <div class="top1"></div>
      <div class="top2">个人中心</div>
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="touxiang">
        <div class="tu">
          <img :src="avatar" />
        </div>
      </div>
      <div class="zi">
        <div class="niicheng">{{ username }}</div>
        <div class="xuehao">{{ studentNumber }}</div>
      </div>

      <el-button class="edit" type="primary" icon="el-icon-edit" @click="editInfo">点击修改个人信息</el-button
      >
    </div>

    <!-- 匹配通知和我的发布 -->
    <div class="message-and-publish">
      <div class="box" @click="toPipeitongzhi">
        <div class="tuleft"></div>
        <div class="new" v-show="isNew"></div>
        <div class="zi1">匹配通知</div>
      </div>
      <div class="box" @click="toWodefabu">
        <div class="turight"></div>
        <div class="zi2">我的发布</div>
      </div>
    </div>

    <!-- 网页说明 -->
    <div class="instruction">
      <div class="item">
        <div class="list" @click="tosysm">使用方法</div>
        <div class="jiantou"></div>
      </div>
      <div class="item">
        <div class="list">问题反馈</div>
        <div class="jiantou"></div>
      </div>
      <div class="item">
        <div class="list">关于我们</div>
        <div class="jiantou"></div>
      </div>
      <div class="item" @click="toCheck">
        <div class="list">检查更新</div>
        <div class="jiantou"></div>
      </div>
    </div>

    <!-- 弹窗展示使用方法 -->
    <div class="mask" v-show="sysm"></div>
    <div class="shiyongshuoming" v-show="sysm">
      <div class="sysm-top">使用说明</div>
      <div class="text">
        <div class="sysm-title1">一、丢失物品</div>
        <div class="sysm-title2">1.筛选/新建帖子</div>
        <div class="sysm-text">
          若找到对应帖子，则根据提供的联系方式
          联系捡拾者；若未找到对应帖子，你可以
          发布寻物帖，填写相关信息，系统会为你 匹配对应的招领帖；
        </div>
        <div class="sysm-title2">2.系统匹配</div>
        <div class="sysm-text">若匹配成功，系统会通知你查看确认；</div>
        <div class="sysm-title2">3.反馈结果</div>
        <div class="sysm-text">
          匹配成功找到失物后，从“我的发布”删 除寻物帖；
          匹配失败，可以删除系统匹配通知，继续耐心等待匹配结果。
        </div>
        <div class="sysm-title1">二、捡到物品</div>
        <div class="sysm-title2">1.新建帖子</div>
        <div class="sysm-text">你可以发布招领帖，填写相关信息；</div>
        <div class="sysm-title2">2.反馈结果</div>
        <div class="sysm-text">失主找到失物后，请从“我的发布”删除招领帖。</div>
        <div class="sysm-title1">三、注意事项</div>
        <div class="sysm-title2">
          1.帖子只保留一个月，一个月后系统自动 删除帖子。
        </div>
      </div>
      <div class="sysm-sure" @click="ok">确认</div>
    </div>

    <!-- 弹窗检查更新 -->
    <div class="jianchagengxin" v-show="isCheck">已经是最新版本</div>

    <Bottom />
  </body>
</template>

<script>
import Bottom from "@/components/Bottom";
export default {
  name: "myInfo",
  components: {
    Bottom,
  },
  data() {
    return {
      // 使用说明
      sysm: false,
      //   检查更新
      isCheck: false,
      isNew: true,
      username: "",
      avatar: "",
      studentNumber: "学号:xxxxx",
    };
  },
  methods: {
    toCheck: function () {
      this.isCheck = true;
    },
    tosysm: function () {
      this.sysm = true;
    },
    ok: function () {
      this.sysm = false;
    },
    toPipeitongzhi: function () {
      this.$router.push("/MyMessage");
    },
    toWodefabu: function () {
      this.$router.push("/MyPublish");
    },
    editInfo(){
        this.$router.push('/EditInfo')
    }
  },
  created() {
    this.username = this.$store.state.userInfo.username;
    this.avatar = this.$store.state.userInfo.avatar;
  },
};
</script>

<style scoped lang="css">
html {
  height: 100%;
  width: 100%;
}
body {
  margin: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(246, 243, 243);
}
/* .top1{
    background-color: white;
    height:30px;
} */
.top2 {
  background-color: white;
  height: 40px;
  text-align: center;
  font-weight: Bold;
  font-size: 1.4rem;
  color: #589788;
  font-family: SourceHanSansCN-Bold;
}
.user-info {
  width: 100%;
  background-color: #589788;
  height: 135px;
  display: flex;
  flex-direction: row;
}
.user-info .edit {
  margin-left: 200px;
  margin-top: 50px;
}
.tu {
  margin-top: 25px;
  margin-left: 50px;
  width: 80px;
  height: 80px;
  background-color: rgb(240, 233, 233);
  border-radius: 50px;
  overflow: hidden;
}
.tu > img {
  height: 100%;
  width: 100%;
}
.zi {
  height: 70px;
  width: 80px;
  margin-top: 40px;
  padding-top: 9px;
  padding-left: 10px;
  font-family: SourceHanSansCN-Medium;
  color: white;
  font-size: 1rem;
  text-align: center;
}
.message-and-publish {
  box-shadow: 5px 5px 3px rgba(0.2, 20, 20, 0.2);
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 10px;
  margin: 6px;
  margin-top: 10px;
  box-shadow: 10px;
}
.box {
  display: flex;
  flex-direction: column;
}
.tuleft {
  background: url("../assets/pipeitongzhi.png");
  background-size: 100% 100%;
  margin-top: 20px;
  margin-right: 18px;
  margin-bottom: 10px;
  margin-left: 70px;
  height: 30px;
  width: 30px;
}
.turight {
  background: url("../assets/wodefabu.png");
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 18px;
  margin-bottom: 10px;
  margin-right: 50px;
  height: 30px;
  width: 30px;
}
.zi1 {
  text-align: center;
  margin-left: 50px;
  color: #4e4e4e;
}
.zi2 {
  text-align: center;
  margin-right: 50px;
  color: #4e4e4e;
}
.instruction {
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.1);
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  margin: 6px;
}
.item {
  display: flex;
  flex-direction: row;
}
.list {
  width: 90%;
  color: #4e4e4e;
  margin-left: 20px;
  height: 30px;
  border-bottom: solid #e6e1e1 1px;
}
.jiantou {
  width: 10px;
  height: 12px;
  background: url("../assets/huisejiantou.png");
  background-size: 100% 100%;
  margin-right: 20px;
  margin-top: 7px;
}

.jianchagengxin {
  /* height: 60px;
    width: 160px; */
  padding: 18px 25px;
  background-color: #303030;
  color: #fefefe;
  font-size: 0.9rem;
  font-weight: bold;
  position: absolute;
  border-radius: 5px;
  bottom: 66px;
  left: 28.5%;
}
.new {
  height: 8.5px;
  width: 8.5px;
  background-color: #f94d5d;
  border-radius: 50px;
  position: absolute;
  left: 35.5%;
  top: 32%;
}

/* 使用方法 */
.mask {
  z-index: 4;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0px;
}
.shiyongshuoming {
  border-radius: 15px;
  position: absolute;
  z-index: 5;
  height: 85%;
  width: 80%;
  margin: 40px 35px;
  background-color: #e6edeb;
}
.sysm-top {
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  color: #589788;
  font-size: 1.1rem;
  font-weight: bold;
}
.text {
  height: 78%;
  width: auto;
  padding-left: 25px;
  padding-right: 25px;
  overflow: scroll;
}
.sysm-title1 {
  height: auto;
  padding: 4px 0px;
  color: #589788;
}
.sysm-title2 {
  height: auto;
  padding: 2px 0px;
  color: #589788;
  font-size: 0.9rem;
}
.sysm-text {
  height: auto;
  padding: 0px 0px;
  color: #589788;
  font-size: 00.9rem;
}
.sysm-sure {
  margin-left: 22px;
  margin-right: 22px;
  text-align: center;
  padding-top: 4.5%;
  color: #589788;
  font-weight: bold;
  font-size: 1.1rem;
  border-top: #8b9996 1px solid;
}
</style>