<template>
  <div id="root">
        <div id="header">
            <div>
                <div class="return" @click="toBackView"></div>
                <div class="header-message">用户名修改</div>
                <div class="saveBtn" @click="saveFn">确定</div>
            </div>
        </div>
        <div id="mainBox">
        	<div class="inputBarBox">
                <input placeholder="用户名修改" id="inputBar" type="text" v-model="inputVal">
            </div>
        </div>
    </div>
</template>

<script>
import { updateUserInfo } from "@/api/user";
export default {
  data() {
    return {
      user: {
        avatar: "",
        username: "",
        password: "",
        id: "",
      },
      inputVal:'',
    };
  },
  methods: {
    saveFn(){
        this.$store.state.userInfo.username_temp = this.inputVal;
        // console.log(this.$store.state.userInfo)
        this.$router.go(-1)
    },
    addImage(e){
        let formdata = new FormData();
        Array.from(e.target.files).map((item) => {
            formdata.append("file", item);
        });
        upload(formdata).then((res) => {
            this.imgList.push(res.data)
        });
    },
	toBackView() {
		this.$router.go(-1)
	},
	TouserOpt(){
		this.$router.push("/changeUser");
	},
	TopwdOpt(){
		this.$router.push("/changePwd");
	},



    // 头像上传成功返回地址
    handleAvatarSuccess(res, file) {
      this.user.avatar = file.response;
    },
    // 更新头像前检查图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    // 更新用户按钮
    updateUser() {
      //请求后端更新请求
      updateUserInfo(this.user).then((res) => {
        if (res.data.state === 200) {
          // 修改vuex的状态信息
          this.user.password=''
          this.$store.state.userInfo = this.user;

          //弹窗修改成功 并返回用户
          this.$message({
            type: "success",
            message: `修改成功`,
          })
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)

        } else {
          // 弹窗错误
          this.$message({
              type: "error",
              message: `${res.data.msg}`,
            });
        }
      });
    },
  },
  created() {
    this.user.avatar = this.$store.state.userInfo.avatar;
    this.user.id = this.$store.state.userInfo.id;
    this.user.username = this.$store.state.userInfo.username;
    this.user.token=this.$store.state.userInfo.token
  },
};
</script>




<style scoped lang="css">
	.inputBarBox{
        /* width: 100%; */
        height: 60px;
        padding: 20px;
    }
    #inputBar{
        width: 100%;
        height: 30px;
        outline-style: none;
		border: 0;
        border-bottom: solid 2px #ccc;
        background-color: unset;
    }















    #root{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /* background-color: red; */
        display: flex;
        flex-direction: column;
    }
    #header{
        background-color: white;
        padding: 0 20px;
        padding-top: 24px;
        position: relative;

    }
    #header>div{
        width: 100%;
        height: 30px;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #mainBox{
        flex: 1;
    }
    #mainBox>:nth-child(1){
        margin-top: 10px;
    }
    .tu5 {
        height: 100%;
        width: 100%;
        opacity: 0;
    }
    .return {
        height: 30px;
        width: 30px;
        background: url("../assets/lvsejiantou.png") center center / 38% no-repeat;
        /* position: absolute; */
        /* left: 0; */
    }
    .header-message {
        /* position: absolute; */
        /* left: 50%; */
        /* transform: translateX(-50%); */

        font-weight: Bold;
        font-size: 1.3rem;
        color: rgb(108, 176, 154);
        font-family: SourceHanSansCN-Bold;
    }
    .saveBtn{
        /* position: absolute; */
        /* right: 12px; */
        font-size: 13px;
        color: rgb(114, 174, 153);
    }
</style>