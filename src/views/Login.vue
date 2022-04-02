<template>
  <div id="login">
    <div id="cube" :style="{ transform: cubeTrans }"></div>
    <div id="slideLeft">
      <div id="page1">
        <div class="title">
          <transition name="move1">
            <div id="title1" v-show="!pageTrigger">
              <div>欢迎来到:</div>
              <div>北洋拾遗</div>
            </div>
          </transition>
          <transition name="move2">
            <div id="title2" v-show="pageTrigger">快来加入我们吧!</div>
          </transition>
        </div>
        <div class="userFormBox">
          <div id="userForm">
            <div class="diyInput" :style="{ transform: aniInfo.inputTrans }">
              <div>
                <input
                  type="text"
                  :placeholder="uiInfo.onfocus1 ? '' : '用户名:'"
                  v-model="loginForm.username"
                  @focus="onFocus('onfocus1')"
                  @blur="onBlur('onfocus1')"
                />
              </div>
              <div>
                <transition name="stretch">
                  <div v-show="uiInfo.onfocus1 || loginForm.username"></div>
                </transition>
              </div>
            </div>
            <div class="diyInput" :style="{ transform: aniInfo.inputTrans }">
              <div>
                <input
                  :type="eyeShow ? 'text' : 'password'"
                  :placeholder="uiInfo.onfocus2 ? '' : '密码:'"
                  v-model="loginForm.password"
                  @focus="onFocus('onfocus2')"
                  @blur="onBlur('onfocus2')"
                />
                <img
                  src="../assets/eye_hide.png"
                  v-show="!eyeShow"
                  @click="eyeShow = true"
                />
                <img
                  src="../assets/eye_show.png"
                  v-show="eyeShow"
                  @click="eyeShow = false"
                />
              </div>
              <div>
                <transition name="stretch">
                  <div v-show="uiInfo.onfocus2 || loginForm.password"></div>
                </transition>
              </div>
            </div>
            <div
              id="loginBtn"
              class="diyBtn"
              @click="loginBtn"
              :style="{
                visibility: aniInfo.mainVisible ? aniInfo.mainVisible : 'unset',
                opacity: aniInfo.mainOpacity
                  ? aniInfo.mainOpacity
                  : loginForm.username && loginForm.password
                  ? '1'
                  : '0.7',
                transform: aniInfo.mainTrans,
              }"
            >
              登录
              <div
                @click.stop
                v-show="!loginForm.password || !loginForm.password"
              ></div>
            </div>
            <div
              class="diySplitLine"
              :style="{
                visibility: aniInfo.mainVisible ? aniInfo.mainVisible : 'unset',
                opacity: aniInfo.mainOpacity ? aniInfo.mainOpacity : '1',
                transform: aniInfo.mainTrans,
              }"
            >
              <div class="line"></div>
              <div class="text">OR</div>
              <div class="line"></div>
            </div>
            <div
              id="registerBtn"
              class="diyBtn"
              @click="registerBtn"
              :style="{
                transform: aniInfo.reBTrans,
                backgroundColor: aniInfo.reBBgcolor,
                color: aniInfo.reBColor,
              }"
            >
              注册
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="opacity">
      <div id="backBtn" v-show="pageTrigger" @click="pageTrigger = false">
        <img src="../assets/array_left_white.png" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
import { register } from "@/api/login.js";
export default {
  name: "Login",
  data() {
    return {
      eyeShow: false,
      loginForm: {
        username: "",
        password: "",
      },
      uiInfo: {
        onfocus1: false,
        onfocus2: false,
        onfocus3: false,
        onfocus4: false,
      },
      cubeTrans: "translateX(0px) translateY(-9px) rotate(48deg)",
      aniInfo: {
        inputTrans: "",
        reBTrans: "",
        reBBgcolor: "white",
        reBColor: "rgb(87,151,135)",
        mainTrans: "translateX(0) translateY(0) rotate(0)",
        mainOpacity: "",
        mainVisible: "",
      },
      pageTrigger: false,
      timeouter: 0,
    };
  },
  watch: {
    pageTrigger(now, old) {
      if (now) {
        this.cubeTrans = "translateX(170px) translateY(-240px) rotate(50deg)";
        this.aniInfo.inputTrans = "translateX(calc(100%/8)) translateY(-250%)";
        this.aniInfo.reBTrans = "translateY(150%)";
        this.aniInfo.reBBgcolor = "rgb(87,151,135)";
        this.aniInfo.reBColor = "white";
        this.aniInfo.mainTrans =
          "translateX(170px) translateY(-241px) rotate(2deg)";
        this.aniInfo.mainOpacity = "0";
        this.timeouter = setTimeout(() => {
          this.aniInfo.mainVisible = "hidden";
        }, 1000);
      } else {
        this.aniInfo.mainVisible = "";
        this.cubeTrans = "translateX(0px) translateY(-9px) rotate(48deg)";
        this.aniInfo.inputTrans = "translateX(0) translateY(0)";
        this.aniInfo.reBTrans = "translateY(0)";
        this.aniInfo.reBBgcolor = "white";
        this.aniInfo.reBColor = "rgb(87,151,135)";
        this.aniInfo.mainTrans = "translateX(0) translateY(0) rotate(0)";
        this.aniInfo.mainOpacity = "";
      }
    },
  },
  methods: {
    onFocus(x) {
      this.uiInfo[x] = true;
    },
    onBlur(x) {
      this.uiInfo[x] = false;
    },
    loginBtn() {
      this.$store
        .dispatch("login", this.loginForm)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          if (error !== "error") {
            this.$message({ message: error, type: "error", showClose: true });
          }
        });
    },
    gotoHome() {
      console.log("hahhah");
      this.$router.push("/");
    },
    registerBtn() {
        let that = this;
      if (!this.pageTrigger) {
        // 登录页转注册页
        this.pageTrigger = true;
      } else {
        register(this.loginForm).then((res) => {
          if (res.data.state === 200) {
            this.$message({
              type: "success",
              message: `${res.data.msg}`,
            });
            this.$store.dispatch("login", this.loginForm);
            setTimeout(()=>{
                that.$router.push("/");
            },1000)
            
          } else {
            this.$message({
              type: "error",
              message: `${res.data.msg}`,
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#cube {
  height: calc(40vw + 60vh);
  width: calc(40vw + 60vh);
  position: absolute;
  border-radius: 24px;
  background-color: rgb(87, 151, 135);
  left: 30%;
  /* transform: translateX(0px) translateY(-9px) rotate(48deg); */
  transform-origin: 0 0;
  transition: transform 1s;
}
#login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: white;
}
#slideLeft {
  position: absolute;
  top: 24px;
  bottom: 0;
}
#page1 {
  height: 100%;
  width: 100vw;
  padding: 0 42px;
  box-sizing: border-box;
}
#page1 {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: row-reverse;
  height: 50px;
}
#title1 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgb(87, 151, 135);
  position: absolute;
  /* transform: translateX(0px) translateY(0px) rotate(0deg); */
}
#title2 {
  position: absolute;
  font-size: 18px;
  font-family: SourceHanSansCN-Bold;
  font-weight: 400;
  color: white;
  margin-top: 20px;
  /* transform: translateX(-170px) translateY(241px) rotate(-2deg); */
}
#title1 > div:nth-child(1) {
  font-size: 22px;
  font-family: SourceHanSansCN-Bold;
  font-weight: 600;
}
#title1 > div:nth-child(2) {
  font-size: 18px;
  font-family: SourceHanSansCN-Bold;
  font-weight: 400;
}
.move1-enter-active,
.move1-leave-active,
.move2-enter-active,
.move2-leave-active {
  transition: transform 1s, opacity 1s;
}
.move2-enter,
.move2-leave-to {
  transform: translateX(-170px) translateY(241px) rotate(-2deg);
  opacity: 0;
}
.move1-enter-to,
.move1-leave,
.move2-enter-to,
.move2-leave {
  transform: translateX(0px) translateY(0px) rotate(0deg);
  opacity: 1;
}
.move1-enter,
.move1-leave-to {
  transform: translateX(170px) translateY(-241px) rotate(2deg);
  opacity: 0;
}
#page1 > .userFormBox {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
#userForm {
  width: 100%;
  max-width: 400px;
}
.diyInput {
  height: 30px;
  width: 80%;
  margin: 22px 0;
  user-select: none;
  transition: transform 1s;
}
.diyInput > div:nth-child(1) {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.diyInput > div:nth-child(1) > input {
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  color: white;
  background-color: rgba(0, 0, 0, 0);
}
.diyInput > div:nth-child(1) > input::-webkit-input-placeholder {
  color: white;
}
.diyInput > div:nth-child(1) > img {
  height: 80%;
}
.diyInput > div:nth-child(2) {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.6);
}
.diyInput > div:nth-child(2) > div {
  height: 90%;
  background-color: white;
}
.stretch-enter-active,
.stretch-leave-active {
  transition: width 0.6s;
}
.stretch-enter,
.stretch-leave-to {
  width: 0;
}
.stretch-enter-to,
.stretch-leave {
  width: 100%;
}
.diyBtn {
  height: 38px;
  margin: 10px 0;
  width: 100%;
  background-color: #fff;
  color: rgb(87, 151, 135);
  line-height: 38px;
  text-align: center;
  border-radius: 19px;
  position: relative;
  transition: opacity 0.6s, transform 1s, background-color 1s, color 1s;
  user-select: none;
}
#loginBtn {
  margin-top: 40px;
  transform-origin: calc(0% - 40vw - 60vh) calc(0% - 40vw - 60vh);
}
.diyBtn > div {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
.diyBtn:active {
  background-color: #eee;
}

.diySplitLine {
  height: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  transition: transform 1s, opacity 0.6s;
  transform-origin: calc(0% - 40vw - 60vh) calc(0% - 40vw - 60vh);
}
.diySplitLine > div.line {
  height: 1px;
  width: calc(50% - 17px);
  background-color: rgba(255, 255, 255, 0.6);
}
.diySplitLine > div.text {
  height: 100%;
  width: 34px;
  color: white;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
#backBtn {
  height: 40px;
  width: 40px;
  position: absolute;
  top: 20px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgb(87, 151, 135);
}
#backBtn > img {
  width: 70%;
}
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 1s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-enter-to,
.opacity-leave {
  opacity: 1;
}
</style>

