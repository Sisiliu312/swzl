<template>
<body>
  <div id="total">
    <!-- 顶部栏 -->
    <div class="top"></div>


    <div class="content">


      <div v-bind:class="isBox1?'box':'box0'" @click="toShow1">
        <div class="zi">校区</div>
        <div class="tu">
          <div class="tu1"></div>
          <div v-bind:class="isTu21?'tu2':'tu3'"></div>
        </div>
      </div>



      <div v-bind:class="isBox2?'box':'box0'" @click="toShow2">
        <div class="zi">类别</div>
        <div class="tu">
          <div class="tu1"></div>
          <div v-bind:class="isTu22?'tu2':'tu3'"></div>
        </div>
      </div>



      <div v-bind:class="isBox3?'box':'box0'" @click="toShow3">
        <div class="zi">时间</div>
        <div class="tu">
          <div class="tu1"></div>
          <div v-bind:class="isTu23?'tu2':'tu3'"></div>
        </div>
      </div>
    </div>



    <!-- 菜单1 -->
    <div class="mask" v-show="isShow1" @click="notShow1">
    </div>
    <div class="menu1" v-show="isShow1">
      <div v-bind:class="isZi11?'zi1':'zi10'" @click="change1">
        <div v-bind:class="isZi21?'zi2':'zi20'" >北洋园</div>
      </div>
      <div v-bind:class="isZi12?'zi1':'zi10'" @click="change2">
        <div v-bind:class="isZi22?'zi2':'zi20'">卫津路</div>
      </div>
    </div>

    <!-- 菜单2 -->
    <div class="mask" v-show="isShow2" @click="notShow2">
    </div>
    <div class="menu2" v-show="isShow2" >
      <div class="box1">
        <div v-for="category in categories" :key="category.index" @click="checkCategory(category.id)">
          <div>{{category.categoryName}}</div>
        </div>
      </div>
    </div>



    <!-- 菜单3 -->
    <div class="mask" v-show="isShow3" @click="notShow3">
    </div>
    <div class="menu2" v-show="isShow3" >
      <div id="l_menu3">
        <div>
          {{month}}月
       </div>
       <div>
          <div class="first_time" :style="{backgroundColor:`${time_choice==7?'rgb(88,151,136)':''}`}" @click="timeClick(7)">
            <span :style="{color:`${time_choice==7?'white':'black'}`}">更早</span>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date6==1 ? 1:0}px black`}" @click="timeClick(6)">
            <div :style="{backgroundColor:`${time_choice==6?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==6?'white':'black'}`}">{{date6}}</div>
              <div :style="{color:`${time_choice==6?'white':'rgb(120,120,120)'}`}">{{day6 | formatDay}}</div>
            </div>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date5==1 ? 1:0}px black`}" @click="timeClick(5)">
            <div :style="{backgroundColor:`${time_choice==5?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==5?'white':'black'}`}">{{date5}}</div>
              <div :style="{color:`${time_choice==5?'white':'rgb(120,120,120)'}`}">{{day5 | formatDay}}</div>
            </div>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date4==1 ? 1:0}px black`}" @click="timeClick(4)">
            <div :style="{backgroundColor:`${time_choice==4?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==4?'white':'black'}`}">{{date4}}</div>
              <div :style="{color:`${time_choice==4?'white':'rgb(120,120,120)'}`}">{{day4 | formatDay}}</div>
            </div>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date3==1 ? 1:0}px black`}" @click="timeClick(3)">
            <div :style="{backgroundColor:`${time_choice==3?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==3?'white':'black'}`}">{{date3}}</div>
              <div :style="{color:`${time_choice==3?'white':'rgb(120,120,120)'}`}">{{day3 | formatDay}}</div>
            </div>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date2==1 ? 1:0}px black`}" @click="timeClick(2)">
            <div :style="{backgroundColor:`${time_choice==2?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==2?'white':'black'}`}">{{date2}}</div>
              <div :style="{color:`${time_choice==2?'white':'rgb(120,120,120)'}`}">{{day2 | formatDay}}</div>
            </div>
          </div>
          <div class="other_time" :style="{borderLeft:`solid ${date1==1 ? 1:0}px black`}" @click="timeClick(1)">
            <div :style="{backgroundColor:`${time_choice==1?'rgb(88,151,136)':''}`}">
              <div :style="{color:`${time_choice==1?'white':'black'}`}">{{date1}}</div>
              <div :style="{color:`${time_choice==1?'white':'rgb(120,120,120)'}`}">{{day1 | formatDay}}</div>
            </div>
          </div>
       </div>
      </div>
    </div>

  </div>
</body>
</template>

<script>

import {listCategories} from '@/api/category.js'

export default {
  name: 'top',
  data(){
    return{
    categoryId:'',
    categories:[],

    time_choice:1,
    date1:'',
    date2:'',
    date3:'',
    date4:'',
    date5:'',
    date6:'',

    day1:'',
    day2:'',
    day3:'',
    day4:'',
    day5:'',
    day6:'',
    month:'',
    year:'',
    
    isTu21:true,
    isTu22:true,
    isTu23:true,

    isShow1:false,
    isShow2:false,
    isShow3:false,

    isBox1:true,
    isBox2:true,
    isBox3:true,


    isZi11:true,
    isZi12:true,
    isZi13:true,
    isZi14:true,
    isZi15:true,
    isZi16:true,
    isZi17:true,


    isZi21:true,
    isZi22:true,


    isZi31:true,
    isZi32:true,
    isZi33:true,
    isZi34:true,
    isZi35:true

    }
  },
  created(){
    var now = new Date()
    this.year=now.getFullYear()
    this.month=now.getMonth()+1


    this.date1=now.getDate()


    now.setDate(now.getDate() - 1);
    this.date2=now.getDate()
    now.setDate(now.getDate() - 1);
    this.date3=now.getDate()
    now.setDate(now.getDate() - 1);
    this.date4=now.getDate()
    now.setDate(now.getDate() - 1);
    this.date5=now.getDate()
    now.setDate(now.getDate() - 1);
    this.date6=now.getDate()


    now.setDate(now.getDate() - 1);
    now.setDate(now.getDate() - 1);
    
    this.day1 = now.getDay();

    now.setDate(now.getDate() - 1);
    this.day2=now.getDay()
    now.setDate(now.getDate() - 1);
    this.day3=now.getDay()
    now.setDate(now.getDate() - 1);
    this.day4=now.getDay()
    now.setDate(now.getDate() - 1);
    this.day5=now.getDay()
    now.setDate(now.getDate() - 1);
    this.day6=now.getDay()

  },
  methods:{
    timeClick(which){
      this.time_choice = which
      if(which == 7){
        this.$store.state.date = 'before'
      }else{
        this.$store.state.date = `${this.year}-${this.month>=10?this.month:'0'+this.month}-${this['date'+which]>=10?this['date'+which]:'0'+this['date'+which]}`
      }
      // alert(this.$store.state.date)
    },
    checkCategory(id){
      this.$store.commit('SET_CATEGORYID',id)
    },
    checkDate(date){
      this.$store.commit('SET_DATE',date)
    },
    checkCampus(campus){
      this.$store.commit('SET_CAMPUS',campus)
    },
    toShow1:function(){
      this.isShow1=!this.isShow1;
      this.isShow2=false;
      this.isShow3=false;
      this.isTu21=!this.isTu21;
      this.isTu22=true;
      this.isTu23=true;
      this.isBox1=!this.isBox1;
      this.isBox2=true;
      this.isBox3=true;
    },
    notShow1:function(){
      this.isShow1=false;
      this.isTu21=true;
      this.isBox1=true;
    },
    toShow2:function(){
      listCategories(0).then((res)=>{
        console.log("hahahhah")
        this.categories=res.data.data
      })
      this.isShow2=!this.isShow2;
      this.isShow1=false;
      this.isShow3=false;
      this.isTu22=!this.isTu22;
      this.isTu21=true;
      this.isTu23=true;
      this.isBox2=!this.isBox2;
      this.isBox1=true;
      this.isBox3=true;
    },
    notShow2:function(){
      this.isShow2=false;
      this.isTu22=true;
      this.isBox2=true;
    },
    toShow3:function(){
      this.isShow3=!this.isShow3;
      this.isShow1=false;
      this.isShow2=false;
      this.isTu23=!this.isTu23;
      this.isTu21=true;
      this.isTu22=true;
      this.isBox3=!this.isBox3;
      this.isBox1=true;
      this.isBox2=true;
    },
    notShow3:function(){
      this.isShow3=false;
      this.isTu23=true;
      this.isBox3=true;
    },
    // 点击后颜色改变
    change1:function(){
      this.checkCampus(0)
      this.isZi11=!this.isZi11;
      this.isZi21=!this.isZi21;
      this.isZi12=true;
      this.isZi22=true;
    },
    change2:function(){
      this.checkCampus(1)
      this.isZi12=!this.isZi12;
      this.isZi22=!this.isZi22;
      this.isZi11=true;
      this.isZi21=true;
    },
    change3:function(){
      this.isZi13=!this.isZi13;
      this.isZi31=!this.isZi31;
      this.isZi14=true;
      this.isZi32=true;
      this.isZi15=true;
      this.isZi33=true;
      this.isZi16=true;
      this.isZi34=true;
      this.isZi17=true;
      this.isZi35=true;
    },
    change4:function(){
      this.isZi13=true;
      this.isZi31=true;
      this.isZi14=!this.isZi14;
      this.isZi32=!this.isZi32;
      this.isZi15=true;
      this.isZi33=true;
      this.isZi16=true;
      this.isZi34=true;
      this.isZi17=true;
      this.isZi35=true;
  },
  change5:function(){
      this.isZi13=true;
      this.isZi31=true;
      this.isZi14=true;
      this.isZi32=true;
      this.isZi15=!this.isZi15;
      this.isZi33=!this.isZi33;
      this.isZi16=true;
      this.isZi34=true;
      this.isZi17=true;
      this.isZi35=true;
  },
  change6:function(){
      this.isZi13=true;
      this.isZi31=true;
      this.isZi14=true;
      this.isZi32=true;
      this.isZi15=true;
      this.isZi33=true;
      this.isZi16=!this.isZi16;
      this.isZi34=!this.isZi34;
      this.isZi17=true;
      this.isZi35=true;
  },
  change7:function(){
      this.isZi13=true;
      this.isZi31=true;
      this.isZi14=true;
      this.isZi32=true;
      this.isZi15=true;
      this.isZi33=true;
      this.isZi16=true;
      this.isZi34=true;
      this.isZi17=!this.isZi17;
      this.isZi35=!this.isZi35;
  },
}
}
</script>

<style scoped lang="css">
body{
  margin: 0px;
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
}
#total{
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  z-index: 10;
}
.content{
  padding: 0px;
  box-sizing: border-box;
  display: flex;
  height: 50px;
  width: 100%;
  background-color: #FFFFFF;
  justify-content: space-around;
}

.top{
  background-color: white;
  width: 100%;
  height: 10px;
}
.box {
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: center;
}
.box0{
  background-color: rgb(248, 248, 248);
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: center;
}
.zi{
  height: 100%;
  width: 70%;
  font-display: row;
  font-size: 1.2rem;
  color:#6C6C6D;
  margin-top: 8px;
  margin-left: 35px;
  font-family: SourceHanSansCN-Bold;
  font-weight: Bold;
}
.tu{
  height: 100%;
  width: 30%;
}
.tu1{
  width: 30%;
  width: 40px;
  height: 10px;
}
.tu2{
  height: 10px;
  width: 15px;
  margin-top: 8px;
  background: url("../assets/daosanjiao.png");
  background-size: 100% 100%;
}
.tu3{
  height: 10px;
  width: 15px;
  margin-top: 8px;
  background: url("../assets/zhengsanjiao.png");
  background-size: 100% 100%;
}
.mask{
	/* height: 85%; */
  top: 60px;
	width: 100%;
	background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom: 0px;
	z-index: 9;
}
.menu1{
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-evenly;
  background: rgb(248, 248, 248);
  justify-content: space-around;
  border-radius: 0px 0px 15px 15px;
  z-index: 10;
}

.zi1{
  margin-top: 8px;
  border-color:#589788;
  border-width:2px;
  border-style: solid; 
  border-radius:25px ;
  justify-content:center;
  height: 30px;
  width: 90px;
}
/* 点击后背景颜色改变 */
.zi10{
  margin-top: 8px;
  border-color:#589788;
  border-width:2px;
  border-style: solid; 
  border-radius:25px ;
  justify-content:center;
  background-color:#589788 ;
  height: 30px;
  width: 90px;
}

.zidanyi{
  margin-top: 8px;
  justify-content:center;
  height: 30px;
  width: 90px;
}
.zi2{
  font-weight: Bold;
  font-size: 1rem;
  color: #589788;
  margin-top: 3px;
  margin-left: 20px;
}
/* 点击后颜色改变 */
.zi20{
  font-weight: Bold;
  font-size: 1rem;
  color: white;
  margin-top: 3px;
  margin-left: 20px;
}


.menu2{
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 0px 0px 20px 20px;
  background: rgb(248, 248, 248);
  z-index: 12;
}
.box1{
  padding: 0px;
  display: flex;
  margin: 0px;
  height: 50px;
  flex-direction: row;
  justify-content:space-evenly;
  justify-content: space-around;
}
.zi3{
  font-weight: Bold;
  font-size: 0.9rem;
  color: #589788;
  margin-top: 5px;
  margin-left: 16px;
}
/* menu3时间 */
#l_menu3{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 5vw;
}
#l_menu3>div:nth-child(1){
  height: 30%;
  font-family: SourceHanSansCN-Bold;
  font-weight: Bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#l_menu3>div:nth-child(2){
  height: 60%;
  display: flex;
  
}
#l_menu3>div:nth-child(2)>div{
  width: calc(100% / 7);
  height: 100%;
  box-sizing: border-box;
}
#l_menu3>div:nth-child(2)>div.first_time{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(100vw / 14);
  /* background-color: rgb(88,151,136); */
}
#l_menu3>div:nth-child(2)>div.first_time>span{
  width: 18px;
  font-size: 18px;
  /* color: white; */
}
#l_menu3>div:nth-child(2)>div.other_time>div{
  height: 100%;
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: calc(100vw / 14);
  /* background-color: rgb(88,151,136); */
  /* color: white; */
}
/* 点击后颜色改变 */
.zi30{
  font-weight: Bold;
  font-size: 0.9rem;
  color: white;
  margin-top: 5px;
  margin-left: 16px;
}
</style>