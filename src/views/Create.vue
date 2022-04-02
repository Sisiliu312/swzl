<template>
    <body>
        <div class="top">
            <div class="top1"></div>
            <div class="top2">新建帖子</div>
        </div>
        <div class="middle">
            <div class="middle1"></div>
            <div class="middle2" @click="toZhaolingtie">
                <div class="tu">
                    <div class="tu1"></div>
                </div>
                <div class="zi">招领帖</div>
            </div>
            <div class="middle3"></div>
            <div class="middle2" @click="toXunwutie">
                <div class="tu">
                    <div class="tu2"></div>
                </div>
                <div class="zi">寻物帖</div>
            </div>
            <div class="middle1"></div>
        </div>
        <div class="bottom">
            <div class="bottom2" @click="toHome"></div>
        </div>
    </body>
</template>

<script>
export default {
    name: 'xinjian',
    data(){
        return{
            
        }
    },
    methods:{
        toZhaolingtie(){
            this.$router.push('/CreatePost')
        },
        toXunwutie(){
            this.$router.push('/CreateAsk')
        },
        toHome(){
            this.$router.push('/Home')
        }
    },
}
</script>

<style scoped lang="css">
body{
    background-color: rgb(244, 244, 244);
    display: flex;
    flex-direction: column;
    position:abslute;
    bottom: -20px;
    width: 100vw;
    height: 100%;
    margin: 0px;
}
.top1{
    background-color: white;
    height:30px;
}
.top2{
    background-color: white;
    height: 50px;
    font-weight: Bold;
    font-size: 1.3rem;
    text-align:center;
    color: #589788;
    font-family: SourceHanSansCN-Bold;
}
.middle{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center ;
}
.middle1{
    height: 100px;
}
.middle2{
    background-color: #FEFCFC;
    height:90px;
    width: 310px;
    border-radius: 150px;
    box-shadow: 5px 5px 15px rgba(41, 40, 40, 0.3);
    display: flex;
    flex-direction: row;
    align-items:center ;
}
.zi{
    color: #4E4E4E;
    font-family: SourceHanSansCN-Medium;
    font-size: 1.5rem;
    width: 400px;
    height: 200px;
    margin-left: 40px;
    line-height:200px;
}
.tu{
    background-color:rgb(244,244,244) ;
    margin-left: 30px;
    border-radius: 50px;
    width: 140px;
    height: 60px;
}
.tu1{
    background: url("../assets/zhaolingtie.png");
    background-size:100% 100% ;
    margin-left: 16px;
    margin-top: 15px;
    width: 30px;
    height: 30px;
}
.tu2{
    background: url("../assets/xunwutie.png");
    background-size:100% 100% ;
    margin-left: 16px;
    margin-top: 15px;
    width: 30px;
    height: 30px;
}
.middle3{
    height: 50px;
}
.bottom{
    width: 100%;
    height: 20vh;
    background-color:rgb(244, 244, 244);
    display: flex;
    align-items:center ;
    justify-content: center;
} 
.bottom2{
    height: 70px;
    width: 70px;
    position:fixed;
    bottom:0px;
    background: url("../assets/chahao.png");
    background-color:rgb(244, 244, 244);
    background-size: 100% 100% ;
}

</style>
