<template>
<body>
    <footer>
		<!-- 底部栏 -->
        <div class="box" @click="toHome">
            <div class="tu1"></div>
            <div class="zi1">招领</div>
        </div>
        <div class="box" @click="toXinjian">
            <div class="tu2"></div>
        </div>
        <div class="box" @click="toGerenzhongxin">
            <div class="tu3"></div>
            <div class="zi2">我的</div>
        </div>
    </footer>
	<transition name="opacity">
		<div id="createBox" v-if="showCreate">
			<Create/>
		</div> 
	</transition>
</body>
</template>

<script>
import Create from "../components/Create.vue";
export default {
    name: 'bottom',
	components: {
		Create
  	},
	data(){
        return{
            showCreate:false,
        }
    },
	methods:{
		fatherMethod(){
			this.showCreate = false
		},
		toXinjian:function(){
			this.showCreate = true
		},
		toGerenzhongxin:function(){
			this.$router.push('/MyInfo')
		},
		toHome:function(){
			this.$router.push('/Home')
		}
	},
}
</script>

<style scoped lang="css">


.opacity-enter-active, .opacity-leave-active {
	transition: opacity 1s;
}
.opacity-enter, .opacity-leave-to {
	opacity: 0;
}
.opacity-enter-to, .opacity-leave {
	opacity: 1;
}


#createBox{
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 0;
	z-index: 999;
	/* background-color: red; */
	/* display: none; */
}
body{
	margin: 0px;
	width: 100%;
	/* overflow-x: hidden; */
}
footer{
	width: 100%;
	margin: 0px;
	box-shadow: 5px 5px 15px rgba(41, 40, 40, 0.3);
	height: 125px;
	display: flex;
	justify-content: space-around;
	box-sizing: border-box;
	background-color: white;
	position: fixed;
	bottom: -62px;
	box-shadow: 6px 5px 15px rgba(40, 40, 40, 0.5);
}
.box{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 200px;
	height: 100px;

}
.tu1{
	width: 30px;
	height: 30px;
	background: url("../assets/zhaoling.png");
	background-size:100% 100% ;
	margin-top: 15px;
}
.tu2{
	width: 60px;
	height:60px;
	position: fixed;
	bottom: 10px;
	background: url("../assets/dajiahao.png");
	background-size:100% 100% ;
}
.tu3{
	width: 30px;
	margin-top: 15px;
	height: 32px;
	background: url("../assets/wode.png");
	background-size:100% 100%;

}
.zi1{
	color: #589788;
	height: 100%;
	font-size: 0.9rem;
	font-weight: Bold;
	text-align:center;
}
.zi2{
	color: #CDCDCD;
	height: 100%;
	font-size: 0.9rem;
	font-weight: Bold;
	text-align:center;
}
</style>
