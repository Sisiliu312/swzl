<template>
    <body>
    <div class="return" @click="toHome">
        <div class="img"></div>
    </div>
    <div class="tu"></div>
    <div class="wen">
        <div class="top1">
            <div class="touxiang">
                <div class="tu1"></div>
            </div>
            <div class="zi">
                <div class="nicheng">匿名</div>
                <div class="time">2021-12-08 07:25</div>
            </div>
        </div>
        <div class="top2">
            <div class="label">#电子产品</div>
            <div class="label">#笔记本</div>
            <div class="label">#华为</div>
            <div class="label">#黑</div>
        </div>
        <div class="box">
            <div class="list">
                <div class="list1">详细描述</div>
                <div class="list2">有JOJO键盘膜，捡到时锁屏了，屏保是只猫。</div>
            </div>
            <div class="list">
                <div class="list1">拾获地点</div>
                <div class="list2">北洋园45教B205</div>
            </div>
            <div class="list">
                <div class="list1">放置地点</div>
                <div class="list2">45教一楼大厅保卫处</div>
            </div>
            <div class="list">
                <div class="list1">联系方式</div>
                <div class="list3">
                    <div class="number">12345678900</div>
                    <div class="item">Mobile phone</div>
                </div>
            </div>
        </div>
    </div>
    </body>
</template>

<script>
export default {
    name: 'sample',
    data(){
    },
    methods:{
        toHome:function(){
        this.$router.push('/Home')
        },
}
}
</script>

<style scoped lang="css">
body{
    margin: 0px;
    height: auto;
    width: 100%;
    display:flex;
    flex-direction: column;
}
.return{
    position: absolute;
    height: 40px;
    width: 40px;
    background-color: rgb(255, 255, 255);
    top: 40px;
    left: 40px;
    z-index: 4;
    border-radius: 10px;
}
.img{
    background: url("../assets/lvsejiantou.png");
    background-size:100% 100% ;
    margin-top: 12px;
    margin-left: 12px;
    height: 18px;
    width: 13px;
}
.tu{
    height: 290px;
    width: 100%;
    background-color: rgb(244, 244, 244);
    position: fixed;
    top: 0px;
    z-index: 2;
}
.wen{
    height: auto;
    width: 100%;
    position: absolute;
    top: 270px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    border-radius:30px 30px 0px 0px;
    background-color: white;
}
.top1{
    height: 95px;
    display: flex;
    flex-direction: row;
}
.touxiang{
    width: 20%;
    height: 100%;
}
.tu1{
    border-radius:50px;
    background-color: rgb(244, 244, 244);
    margin-top: 20px;
    margin-left: 30px;
    height: 60px;
    width: 60px;
}
.zi{
    width: 80%;
    height: 100%;
    margin-top: 35px;
    margin-left: 25px;
    font-size: 1rem;
    font-family: SourceHanSansCN-Medium;
    font-weight: medium;
    color: #6C6D6D;
}
.top2{
    height: 30px;
    display: flex;
    flex-direction: row;
}
.label{
    height: 23px;
    width: auto;
    border-radius:20px;
    margin-left: 6px;
    margin-right: 6px;
    padding-left:10px;
    padding-top:4px;
    padding-right:10px;
    background-color: #589788;
    font-size: 0.85rem;
    color:white;
}
.box{
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
}
.list{
    display: flex;
    height: auto;
    flex-direction: row;
    justify-content:space-around;
    margin-top: 15px;
}
.list1{
    width: 30%;
    height: auto;
    font-size: 1rem;
    font-weight: bold;
    color: #4E4E4E;
    padding-top:9px;
    margin-left:15px ;
    margin-right:5px ;
}
.list2{
    width: 100%;
    background-color: #e4ebe9;
    padding: 9px;
    border-radius: 20px;
    color: #2A2A2A;
    margin-right:30px ;
    font-size: medium;
}
.list3{
    width: 100%;
    background-color: #e4ebe9;
    padding: 9px;
    border-radius: 20px;
    margin-right:30px ;
    display: flex;
    flex-direction: row;
}
.number{
    color: #2A2A2A;
    font-size: medium;
    width: auto;
    margin-right: 20px;
}
.item{
    color: #A6A6A6;
    font-size: medium;
    font-size: 0.9rem;
}
</style>
