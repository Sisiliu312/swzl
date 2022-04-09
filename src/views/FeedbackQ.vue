<template>
    <div id="root">
        <div id="header">
            <div>
                <div class="return" @click="toBackView"></div>
                <div class="header-message">问题反馈</div>
            </div>
        </div>
        <div id="mainBox">
            <div class="feedbackBox">
                <div class="textInput">
                    <textarea maxlength="500" v-model="content" placeholder="期待你的建议和反馈"></textarea>
                </div>
                <div class="imgBox">
                    <div class="imgContainer" v-for="(src,index) in imgList" :key="src">
                        <img :src="src" />
                        <div class="cancleImgBtn" @click="cancleImg(index)">×</div>
                    </div>
                </div>
                <div class="infoBox">
                    <div class="leftBlock">
                        <div class="addImg_icon">
                            <input class="tu5" type="file" name="file" @change="addImage" />
                        </div>
                        <div class="smallText">{{content.length}}/500</div>
                    </div>
                    <div class="button" @click="sendFeedBack">
                        发送
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { upload } from "@/api/upload.js";
import { sendMail } from "@/api/mail.js";
export default {
    name: 'FeedbackQ',
    data(){
        return{
            content:'',
            imgList:[],
        }
    },
    methods:{
        toBackView() {
            this.$router.go(-1)
        },
        sendFeedBack() {
            alert(this.content + '  此处写接口')
            sendMail(this.content)
        .then((res) => {
            this.$message({
            type: "success",
            message: `反馈成功`,
            });
            this.$router.go(-1)
        })
        .catch((res) => {
            this.$message({
            type: "success",
            message: `反馈成功`,
            });
            this.$router.go(-1)
        });
        },
        addImage(e){
            console.log(e.target.files)
            let formdata = new FormData();
            Array.from(e.target.files).map((item) => {
                formdata.append("file", item);
            });
            console.log(formdata)
            upload(formdata).then((res) => {
                console.log(res.data)
                this.imgList.push(res.data)
            });
        },
        cancleImg(index){
            this.imgList.splice(index,1)
        }
    },
}
</script>

<style scoped lang="css">
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
    .feedbackBox{
        height: 240px;
        padding: 14px 20px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 0 3px 3px #ddd;
    }
    .feedbackBox>.textInput{
        flex: 1;
    }
    .textInput>textarea{
        height: 100%;
        width: 100%;
        resize: none;
        outline: none;
        border: none;
    }
    .feedbackBox>.imgBox{
        height: 56px;
        display: flex;
        /* background-color: red; */
    }
    .imgContainer{
        height: 56px;
        width: 56px;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        margin-right: 6px;
    }
    .imgContainer>img{
        width: 100%;
        min-height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
    .imgContainer>.cancleImgBtn{
        position: absolute;
        right: 4px;
        top: 4px;
        width: 14px;
        height: 14px;
        /* line-height: 10px;
        text-align: center; */
        display: flex;
        justify-content: center;
        align-items: center;

        color: white;
        
        border-radius: 7px;
        font-size: 12px;
        background-color: #00000099;
    }
    .feedbackBox>.infoBox{
        margin-top: 6px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .infoBox>.leftBlock{
        display: flex;
        height: 100%;
        align-items: center;
    }
    .button{
        padding: 5px 20px;
        color: white;
        font-size: 12px;
        border-radius: 5px;
        background-color: rgb(22,166,151);
    }



    .addImg_icon{
        height: 30px;
        width: 30px;
        background: url("../assets/imgC.png") center center / 60% no-repeat;
    }
    .smallText{
        font-size: 12px;
        margin-left: 6px;
        color: rgba(30,30,30,0.6);
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
        color: rgba(92,149,132);
        font-family: SourceHanSansCN-Bold;
    }
    .tu5 {
        height: 100%;
        width: 100%;
        opacity: 0;
    }
    
</style>
