<template>
  <div>
    点击修改图片
    <el-upload
      class="avatar-uploader"
      action="http://120.53.120.80:8080/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.avatar" :src="user.avatar" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <br>
    更改用户名
    <el-input v-model="user.username" placeholder="请输入内容"></el-input>

    <br>
    更改密码
    <el-input v-model="user.password" placeholder="请输入内容"></el-input>

    <el-button type="primary" plain @click="updateUser">确定提交</el-button>
  </div>
</template>

<script>
import { updateUserInfo } from "@/api/user";
export default {
  data() {
    return {
      user:{
          avatar:'',
          username:'',
          password:'',
          id:''
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file.response)
      this.user.avatar = file.response;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    updateUser(){
        updateUserInfo(this.user)
        this.$store.dispatch('getUserInfo',this.$store.state.token)
        this.$router.go(-1)
    }
  },
  created() {
    this.user.avatar = this.$store.state.userInfo.avatar;
    this.user.id=this.$store.state.userInfo.id
    this.user.username=this.$store.state.userInfo.username
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>