<template>
  <div id="root">
        <div id="header">
            <div>
                <div class="return" @click="toBackView"></div>
                <div class="header-message">个人信息更改</div>
				<div class="saveBtn" @click="updateUser">保存</div>
            </div>
        </div>
        <div id="mainBox">
        	<div id="headPicBox">
            	<div class="headPicContainer">
              		<img :src="user.avatar">
              		<div class="camera_icon"></div>
              		<input class="tu5" type="file" name="file" @change="addImage" />
           	 	</div>
          	</div>
			<div id="optsBox">
				<div class="userOpt" @click="TouserOpt">
					<span>用户名</span>
					<div class="infoBox">
						<div>{{user.username_temp?user.username_temp:user.username}}</div>
						<div class="arry_icon"></div>
					</div>
				</div>
				<div class="pwdOpt" @click="TopwdOpt">
					<span>密码修改</span>
					<div class="infoBox">
						<div>{{user.password}}</div>
						<div class="arry_icon"></div>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import { upload } from "@/api/upload.js";
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
    };
  },
  computed: {
    // store里的状态
    userInfo_vuex() {
      return this.$store.state.userInfo;
    },
    
  },
  watch: {
	  userInfo_vuex(){
		//   同步至当前显示
    // alert(this.$store.state.userInfo.password)
		this.user = this.$store.state.userInfo;
	  }
  },
  methods: {
    addImage(e){
		let judge = this.beforeAvatarUpload(e.target.files)
		// if(!judge) return;
		// 上传
        let formdata = new FormData();
        Array.from(e.target.files).map((item) => {
            formdata.append("file", item);
        });
        upload(formdata).then((res) => {
			// 更换
            this.user.avatar = res.data
			// // 保存至vuex
			// this.$store.state.userInfo.avatar = this.user.avatar
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
    // handleAvatarSuccess(res, file) {
    //   this.user.avatar = file.response;
    // },
    // 更新头像前检查图片
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // console.log(file)
      
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 10MB!");
      // }
      return true;
    },
    // 更新用户按钮
    updateUser() {
      if(this.$store.state.userInfo.username_temp){
          this.user.username = this.$store.state.userInfo.username_temp;
      }
      if(this.$store.state.userInfo.password){
        this.user.password = this.$store.state.userInfo.password;
      }
      
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
  beforeDestroy(){
	//   关闭前删除pwd
	this.$store.state.userInfo.password = '';
  }
};
</script>

<style scoped lang="css">
	#optsBox{
		border-radius: 6px;
		padding: 0 20px;
		box-shadow: 0 0 3px #ccc;
		background-color: #fff;
	}
	#optsBox>div{
		height: 56px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1.2px #ddd;
		font-size: 12px;
	}
	#optsBox>div:last-child{
		border: none
	}
	.infoBox{
		display: flex;
		align-items: center;
		color: #666;
	}
	.arry_icon{
		height: 30px;
		width: 30px;
		background: url("../assets/huisejiantou.png") center center / 40% no-repeat;
	}
	
	#headPicBox{
		height: 260px;
		width: 100%;
		/* background-color: #fff; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#headPicBox>.headPicContainer{
		height: 80px;
		width: 80px;
		border-radius: 40px;
		box-shadow: 2px 3px 4px #aaa;
		background-color: rgb(229,229,229);
		position: relative;
	}
	.headPicContainer>img{
		position: absolute;
		height: 80px;
		width: 80px;
		border-radius: 40px;
	}
	.headPicContainer>.camera_icon{
		position: absolute;
		right: 4px;
		bottom: 4px;
		height: 22px;
		width: 22px;
		background: url("../assets/camera.png") center center / 100% no-repeat;
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
        padding-top: 24px;
        position: relative;

    }
    #header>div{
        width: 100%;
        height: 30px;
        padding: 10px 0;
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
        position: absolute;
        left: 0;
    }
    .header-message {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        font-weight: Bold;
        font-size: 1.3rem;
        color: rgb(108, 176, 154);
        font-family: SourceHanSansCN-Bold;
    }
	.saveBtn{
        position: absolute;
        right: 12px;
        font-size: 13px;
        color: rgb(114, 174, 153);
    }
</style>