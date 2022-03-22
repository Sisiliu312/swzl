<template>
    <body>
        <div class="top1">
            <div class="tu1" @click="toGerenzhongxin"></div>
            <div class="top1-box">我的发布</div>
        </div>

        <!-- 寻物帖招领帖 -->
        <div class="item2">
            <div v-bind:class="isZi51?'zi5':'zi50'" @click="zi5change1">招领帖</div>
            <div v-bind:class="isZi52?'zi5':'zi50'" @click="zi5change2">寻物帖</div>
        </div>

    <!-- 招领帖 -->
    <div class="list" v-show="zhaolingtie">
        <div class="box0" v-show="box01" v-for="post in posts" :key="post.index">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="115" viewBox="0 0 104 115">
                <image id="北_拷贝" data-name="北 拷贝" width="104" height="115" xlink:href="data:img/png;base64,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"/>
            </svg>
            <div class="box" >
                <div class="tu">
                    <img :src="post.images">
                </div>
                  <div class="wen">
                    <div class="label">
                      <div class="label1">#{{post.categoryName}}</div>
                      <div class="label1" v-for="t in post.tags.split(' ')" :key="t.index">{{t}}</div>
                    </div>
                    <div class="box1">
                        <div class="time1">拾获时间: {{ post.created | format }}</div>
                        <div class="more"></div>
                    </div>
                    <div class="place">拾获地点: {{ post.findLocation }}</div>
                    <div class="delete" @click="delete1(post.id)">删除</div>
                  </div>
                <div class="new" v-show="xin1">new!</div>
            </div>
        </div>
    </div>



    <!-- 寻物帖 -->
    <div class="list" v-show="xunwutie">
        <div class="box00" v-show="box001" v-for="ask in asks" :key="ask.index">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="115" viewBox="0 0 104 115">
                <image id="北_拷贝" data-name="北 拷贝" width="104" height="115" xlink:href="data:img/png;base64,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"/>
            </svg>
            <div v-bind:class="isBox01?'box01':'box02'" >
                <div v-bind:class="isTu1?'tu':'tuchange'">
                    <div class="tu01">
                        <img src="">
                    </div>
                </div>
                <div class="wen1">
                    <div class="chahao" v-show="chahao1" @click="delete001"></div>
                    <div class="label3">{{ ask.categoryName }}</div>
                    <div class="detailsbox">
                        <div class="details">{{ ask.tags }}</div>
                    </div>
                    <div class="time2">{{ ask.created }}</div>
                </div>
                <div class="sure" @click="found01" v-show="found1">已找到</div>
                <div class="found1" v-show="sure1"></div>
            </div>
        </div>
    </div>



    <!-- 删除后弹出 -->
    <div class="mask" v-show="attention"></div>
    <div class="deletebox" v-show="attention">
        <div class="delete-top">
            <div class="top-img"></div>
            <div class="top-word">提示</div>
        </div>
        <div class="delete-middle">删除后将不利于失主寻找失物，</div>
        <div class="delete-middle">确定要删除吗？</div>
        <div class="delete-bottom">
            <div class="bottom-button1" @click="quxiao">取消</div>
            <div class="bottom-button2" @click="yiguihuan">已物归原主</div>
        </div>
    </div>
    </body>
</template>

<script>
import {getPostByUser,deletePost} from '@/api/post.js'
import {getAskByUser} from '@/api/ask.js'
export default {
    name: 'wodefabu',
    components: {
    },
    created(){
        getPostByUser(this.$store.state.userInfo.id).then(res=>{
            this.posts=res.data.data
        })
        getAskByUser(this.$store.state.userInfo.id).then(res=>{
            this.asks=res.data.data
        })
    },
    data(){
        return{
            posts:'',
            asks:'',
            xin1:true,
            xin2:false,
            isZi51:false,
            isZi52:true,
            zhaolingtie:true,
            xunwutie:false,
            box01:true,
            box02:true,
            found1:true,
            found2:true,
            sure1:false,
            sure2:false,
            isBox01:true,
            isBox02:true,
            isTu1:true,
            isTu2:true,
            chahao1:false,
            chahao2:false,
            box001:true,
            box002:true,
            attention:false,
            // 判断是否删除
            deletebox1:true,
            deletebox2:true,
        }
    },
    methods:{
        delete1(id){
            this.attention=true,
            this.deletebox1=false
            deletePost(id).then(res=>{
                console.log(res)
            })
        },
        toGerenzhongxin:function(){
            this.$router.push('/Gerenzhongxin')
        },
        zi5change1:function(){
            this.isZi51=false,
            this.isZi52=true,
            this.zhaolingtie=true,
            this.xunwutie=false
        },
        zi5change2:function(){
            this.isZi52=false,
            this.isZi51=true
            this.zhaolingtie=false
            this.xunwutie=true
        },
        delete2:function(){
            this.attention=true
            this.deletebox2=false
        },
        found01:function(){
            this.found1=false,
            this.sure1=true
            this.isBox01=false,
            this.isTu1=false,
            this.chahao1=true
        },
        found02:function(){
            this.found2=false,
            this.sure2=true,
            this.isBox02=false,
            this.isTu2=false,
            this.chahao2=true
        },
        delete001:function(){
            this.box001=false
        },
        delete002:function(){
            this.box002=false
        },
        toSample1:function(){
            this.$router.push('/Sample1')
        },
        toSample2:function(){
            this.$router.push('/Sample2')
        },
        quxiao:function(){
            this.attention=false
        },
        yiguihuan:function(){
            this.attention=false
            if(this.deletebox1==false){
                this.box01=false
            }
            if(this.deletebox2==false){
                this.box02=false
            }
        },
    },
    
}
</script>

<style scoped lang="css">
body{
    background-color: rgb(244,244,244);
    height: auto;
    width: 100%;
    margin: 0px;
}
.top1{
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
.top1-box{
    width: 50%;
    margin-right: 18%;
    margin-top: 10px;
    font-weight: Bold;
    font-size: 1.3rem;
    text-align:center;
    color: #589788;
    font-family: SourceHanSansCN-Bold;
}
.tu1{
    height: 15px;
    width: 8px;
    background-size: 100% 100%;
    margin-top: 20px;
}
.list{
    height: 100vh;
    padding:0 6%;
    padding-top: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.box0{
    height: 18vh;
    width: 100%;
    margin-bottom: 20px;
}
.box{
    padding:12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    top: -39px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #FEFEFE;
    border-radius: 10px;
    box-shadow: 0 0 6px rgb(200 200 200);
}
.box01{
    padding:12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    top: -39px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #FEFEFE;
    border-radius: 10px;
    box-shadow: 0 0 6px rgb(200 200 200);
}
.box02{
    padding:12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    top: -39px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #EEEEEE;
    border-radius: 10px;
    box-shadow: 0 0 6px rgb(200 200 200);
}
.box1{
    display: flex;
    flex-direction: row;
}
.more{
    background: url("../assets/more.png");
    background-size: 100% 100% ;
    width: 10px;
    height: 15px;
    margin-top: 18px;
    position: absolute;
    top: 40px;
    right: 5px;
}
svg{
    position: relative;
    margin-left: 15px;
    width: 40px;
    height: 40px;
    z-index: 4;
}
.tu{
    width: 100px;
    background-color: rgb(244, 244,244,244);
    border-radius: 10px;  
}
.tuchange{
    width: 100px;
    background-color: #DCDCDC;
    border-radius: 10px;  
}
.tu01{
    /* background: url("../assets/beishouji.png"); */
    background-size: 100% 100% ;
    margin:auto;
    margin-top: 13px;
    width: 50px;
    height: 50px;  
}
.tu02{
    background: url("../assets/weishenghuoyongpin.png");
    background-size: 100% 100% ;
    margin:auto;
    margin-top: 13px;
    width: 50px;
    height: 50px;  
}
.wen{
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    margin-right: 16px; 
}
.wen1{
    width: 140px;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    margin-right: 16px; 
    border-right: solid #e6e1e1 1px;
}
.label{
    height: auto;
    display: flex;
    flex-direction: row;    
}
.label1{
    width: auto;
    border-radius:20px;
    background-color: #5897AA;
    font-weight: medium;
    font-size: 0.7rem;
    color:#F6F4F4;
	flex-wrap: wrap;
    margin-right: 3px;
    box-sizing: border-box;
    padding: 4px 10px;
}
.label2{
    width: auto;
    border-radius:20px;
    background-color: #589788;
    font-weight: medium;
    font-size: 0.7rem;
    color:#F6F4F4;
	flex-wrap: wrap;
    margin-right: 5px;
    box-sizing: border-box;
    padding: 4px 10px;
}
.time1{
    padding-top: 10px;
    margin-left: 6px;
    font-size: 0.9rem;
    font-weight: medium;
    color: #6C6D6D;
}
.place{
    padding-top: 10px;
    margin-left: 6px;
    font-size: 0.9rem;
    font-weight: medium;
    color: #6C6D6D;
}
.new{
    color: #D9534F;
    font-weight: bold;
    width: auto;
    height: 20px;
}
.item2{
    height: 34px;
    width: 180px;
    margin: auto;
    margin-top:63px;
    background-color: #FFFFFF;
    border-color:transparent;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align:center;
}
.zi5{
    width: 50%;
    margin-left: 3px;
    color: #6C6C6C;
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 6.5px;
}
.zi50{
    border-radius: 20px;
    padding-top: 6px;
    width: 55%;
    color: #FEFEFE;
    font-size: 0.9rem;
    font-weight: bold;
    background-color: #589788;
}
.box00{
    height: 15vh;
    width: 100%;
    margin-bottom: 20px;
}
.delete{
    position: absolute;
    right: 10px;
    bottom:10px;
    padding:4px 15px;
    border: #D9534F 1px solid;
    border-radius: 50px;
    font-size: 0.80rem;
    color: #D9534F;
    font-weight: bold;
}
.label3{
    margin:3px;
    color: #6C6D6D;
    font-weight: bold;
}
.detailsbox{
    display: flex;
    flex: row;
}
.details{
    color: #6C6D6D;
    font-size: 0.9rem;
    margin: 3px;
}
.time2{
    color: #6C6D6D;
    font-size: 0.9rem;
    position: absolute;
    bottom: 6px;
    left: 135px;
}
.found1{
    background: url("../assets/beisure.png");
    background-size: 100% 100% ;
    margin:auto;
    margin-top: 23px;
    width: 40px;
    height: 40px;  
}
.found2{
    background: url("../assets/weisure.png");
    background-size: 100% 100% ;
    margin:auto;
    margin-top: 23px;
    width: 40px;
    height: 40px;  
}
.sure{
    width: 39px;
    color: #589788;
    border: #589788 1px solid;
    font-size: 0.8rem;
    padding: 4px 6px;
    margin:auto;
    margin-left: 0px;
    margin-right: 0px;
    border-radius: 50px;
}
.chahao{
    height: 10px;
    width: 10px;
    background: url("../assets/xiaochahao.png");
    background-size: 100% 100%;
    position: absolute;
    top: 13px;
    right:90px;
}
.mask{
    z-index: 4;
    height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.2);
    position: fixed;
    bottom: 0px;
}
.deletebox{
    height: 30%;
    width: 70%;
    background-color: #EDF3F2 ;
    position: absolute;
    top: 40%;
    left: 15%;
    z-index: 5;
    border-radius: 15px;
}
.delete-top{
    padding: 15px 80px;
    display: flex;
    flex-direction: row;
}
.top-img{
    height: 25px;
    width: 25px;
    background: url("../assets/attention.png");
    background-size: 100% 100%;
    margin-right: 13px;
}
.top-word{
    margin-top: 2px;
    font-size: 1.1rem;
    color: #F0AD4E;
    font-weight: bold;
}
.delete-middle{
    text-align: center;
    padding-bottom: 8px;
    color: #4E4E4E;
}
.delete-bottom{
    display: flex;
    justify-content: space-around;
    margin-top:15px;
}
.bottom-button1{
    padding:4px 8px;
    color: #4E4E4E;
    font-weight: bold;
    border: #4E4E4E 1px solid;
    border-radius: 15px;
    font-size: 0.9rem;
}
.bottom-button2{
    padding:4px 8px;
    color: #F0AD4E;
    font-weight: bold;
    border: #F2A12F 1px solid;
    border-radius: 15px;
    font-size: 0.9rem;
}
</style>