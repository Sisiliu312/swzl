<template>
    <body>
        <div class="top1">
            <div class="tu1" @click="toXinjian"></div>
            <div class="top1-box">寻物帖</div>
        </div>

        <div class="top2">请认真填写以下信息, 这将会帮助我们匹配到失主</div>
        <div class="top3"></div>

        <div class="middle">
            <div class="middle1">
                <div class="zi2">基本信息</div>
                <div class="box1">
                    <div class="tu2"></div>
                    <div class="zi3">物品类别</div>


                    <div class="item1"  v-show="chose1">
                        <div class="zi4" @click="toShow1">请选择物品类别</div>
                        <div class="tu13" @click="toShow1"></div>
                    </div>

                    <!-- 物品类别选择后改变 -->
                    <div class="choseAfter" v-show="chose1After">
                        <div class="choseAfter1">{{ categoryFinal.categoryName }}</div>
                        <div class="choseAgain" @click="toShow1">(点击更改标签)</div>
                    </div>

                </div>
                <div class="box1">
                    <div class="tu3"></div>
                    <div class="zi3">所在校区</div>
                    <div class="item2">
                        <div v-bind:class="isZi51?'zi5':'zi50'" @click="zi5change1">北洋园</div>
                        <div v-bind:class="isZi52?'zi5':'zi50'" @click="zi5change2">卫津路</div>
                    </div>
                </div>

            </div>
            

            <div class="middle2">
                <div class="zi2">详细特征</div>
                <div class="box1" v-show="wupinyanse">

                    <div class="tu6"></div>

                    <div class="zi3" v-for="tag in tags" :key="tag.index">{{tag.tagName}}</div>
                    <div class="item1" v-for="tag in tags" :key="tag.index" v-show="chose2">
                        <div class="zi4">请选择{{tag.tagName}}</div>
                        <div class="tu13" @click="toShow6(tag.tagContent)"></div>

                        <!-- 标签详情 -->
                        <div class="mask" v-show="isShow6">
                        </div>
                        <div  class="menu6" v-show="isShow6">
                            <div class="menu1-top">
                                <div class="menu1-img" @click="notShow"></div>
                                <div class="menu1-word">请选择{{tag.tagName}}颜色</div>
                            </div>
                            <div class="menu6-middle">
                                <div v-for="t in tagContent" :key="t.index" @click="tagOK(t)">{{t}}</div>
                            </div>
                                <div class="menu1-bottom" @click="Ok2">确定</div>
                        </div>
                    </div>





                    <!-- 选择后改变 -->
                    <div class="choseAfter" v-show="chose2After">
                        <div class="choseAfter1">{{ message2 }}</div>
                        <div class="choseAgain" @click="toShow6">(点击更改标签)</div>
                    </div>
                    
                </div>


            </div>
            
            
        </div>

        <!-- 白色背景 -->
        <div class="white"></div>


        <div class="bottom">
            <div class="zi6" @click="publish()">发 布</div>
        </div>




        <!-- 覆盖 -->
        <!-- 一级类别 -->
        <div class="mask" v-show="isShow1">
        </div>
        <div  class="menu1" v-show="isShow1">
            <div class="menu1-top">
                <div class="menu1-img" @click="notShow"></div>
                <div class="menu1-word">请选择物品类别</div>
            </div>
            <div class="menu1-middle">
                <div v-for="category in categories" :key="category.index" @click="categoryOK(category)">{{category.categoryName}}</div>
            </div>
            <div class="menu1-bottom" @click="toShow(categoryFinal.id)">下一步</div>
        </div>



        <!-- 覆盖 -->
        <!-- 二级类别 -->
        <div class="mask" v-show="isShow3">
        </div>
        <div  class="menu3" v-show="isShow3">
            <div class="menu1-top">
                <div class="menu1-img" @click="notShow"></div>
                <div class="menu1-word">请选择物品类别</div>
            </div>
            <div class="menu3-middle">
                <div v-for="category in categories" :key="category.index" @click="categoryTwoOK(category)">{{category.categoryName}}</div>
            </div>
            <div class="menu2-bottom">
                <div class="menu2-bottom1" @click="toShow1">上一步</div>
                <div class="menu2-bottom2" @click="Ok1">确定</div>
            </div>
        </div>



        <!-- 发布失败 -->
        <div class="fail" v-show="isShow8">
            <div class="fail-box">
                <div class="fail-img"></div>
                <div class="fail-item1">发布失败</div>
            </div>
            <div class="fail-item2">请重新再试一次!</div>
        </div>
        <!-- 填写不完整 -->
        <div class="incomplete" v-show="isShow10">
            <div class="incomplete-box">
                <div class="incomplete-img"></div>
                <div class="incomplete-item1">发布失败</div>
            </div>
            <div class="incomplete-item2">请检查是否填写完整!</div>
        </div>

    </body>
</template>

<script>

import {publish} from '@/api/ask.js'
import {listCategories} from '@/api/category.js'
import {listTags} from '@/api/tags.js'
export default {
name: 'Xunwutie',
data(){
    return{
        ask:{
            tags:''
        },
        categories:[],
        tags:[],
        tagContent:[],
        categoryFinal:{},
        // 物品类别
        chose1:true,
        chose1After:false,
        message1:"#物品类别",
        // 物品颜色
        wupinyanse:true,
        chose2:true,
        chose2After:false,
        message2:"#物品颜色",
        // 物品品牌
        wupinpinpai:false,
        chose3:true,
        chose3After:false,
        message3:"#物品品牌",
        // 证件卡号
        zhengjiankahao:false,
        // 其他描述
        qitamiaoshu:true,
        // 联系方式
        message4:"手机号",
        // 菜单1
        isShow1:false,
        isMenu1item1: true,
        isMenu1item2: true,
        isMenu1item3: true,
        isMenu1item4: true,
        isMenu1item5: true,
        //卡或证件
        isShow3:false,
        isMenu3item1:true,
        isMenu3item2:true,
        isMenu3item3:true,
        isMenu3item4:true,
        isMenu3item5:true,
        isMenu3item6:true,
        isMenu3item7:true,
        isMenu3item8:true,
        isMenu3item9:true,
        //电子产品
        isShow2:false,
        isMenu2item1:true,
        isMenu2item2:true,
        isMenu2item3:true,
        isMenu2item4:true,
        isMenu2item5:true,
        isMenu2item6:true,
        isMenu2item7:true,
        isMenu2item8:true,
        isMenu2item9:true,
        isMenu2item10:true,
        isMenu2item11:true,
        isMenu2item12:true,
        isMenu2item13:true,
        isMenu2item14:true,
        isMenu2item15:true,
        //学习用品
        isShow4:false,
        isMenu4item1:true,
        isMenu4item2:true,
        isMenu4item3:true,
        isMenu4item4:true,
        isMenu4item5:true,
        isMenu4item6:true,
        isMenu4item7:true,
        isMenu4item8:true,
        isMenu4item9:true,
        //生活用品
        isShow5:false,
        isMenu5item1:true,
        isMenu5item2:true,
        isMenu5item3:true,
        isMenu5item4:true,
        isMenu5item5:true,
        isMenu5item6:true,
        isMenu5item7:true,
        isMenu5item8:true,
        isMenu5item9:true,
        isMenu5item10:true,
        isMenu5item11:true,
        isMenu5item12:true,
        // 选择校区
        isZi51:true,
        isZi52:true,
        // 选择物品颜色
        isShow6:false,
        isMenu6item1:true,
        isMenu6item2:true,
        isMenu6item3:true,
        isMenu6item4:true,
        isMenu6item5:true,
        isMenu6item6:true,
        isMenu6item7:true,
        isMenu6item8:true,
        isMenu6item9:true,
        isMenu6item10:true,
        // 选择物品品牌笔记本
        isShow7:false,
        isMenu7item1:true,
        isMenu7item2:true,
        isMenu7item3:true,
        isMenu7item4:true,
        isMenu7item5:true,
        isMenu7item6:true,
        isMenu7item7:true,
        isMenu7item8:true,
        isMenu7item9:true,
        isMenu7item10:true,
        isMenu7item11:true,
        isMenu7item12:true,
        // 物品品牌手机
        isShow71:false,
        isMenu71item1:true,
        isMenu71item2:true,
        isMenu71item3:true,
        isMenu71item4:true,
        isMenu71item5:true,
        isMenu71item6:true,
        isMenu71item7:true,
        isMenu71item8:true,
        isMenu71item9:true,
        isMenu71item10:true,
        isMenu71item11:true,
        isMenu71item12:true,
        // 选择物品品牌相机
        isShow72:false,
        isMenu72item1:true,
        isMenu72item2:true,
        isMenu72item3:true,
        isMenu72item4:true,
        isMenu72item5:true,
        isMenu72item6:true,
        isMenu72item7:true,
        isMenu72item8:true,
        isMenu72item9:true,
        isMenu72item10:true,
        isMenu72item11:true,
        isMenu72item12:true,
        isMenu72item13:true,
        isMenu72item14:true,
        isMenu72item15:true,
        // 物品品牌平板
        isShow73:false,
        isMenu73item1:true,
        isMenu73item2:true,
        isMenu73item3:true,
        isMenu73item4:true,
        isMenu73item5:true,
        isMenu73item6:true,
        isMenu73item7:true,
        isMenu73item8:true,
        isMenu73item9:true,
        isMenu73item10:true,
        //联系方式
        contact1:false,
        contact2:true,
        contact3:false,
        isZi7:true, 
        isContact:true, 
        isTu12:true,
        isZi81:true,
        isZi82:true,
        // 发布失败
        isShow8:false,
        // 填写不完整
        isShow10:false,
    }
},
created(){
    this.ask.userId=this.$store.state.userInfo.id
},
methods:{
    toXinjian:function(){
        this.$router.push('/Xinjian')
    },
    publish(){
        this.ask.tags=this.ask.tags.trim()
        publish(this.ask).then((res)=>{
            console.log(res)
        })
    },
    categoryOK(category){
        this.categoryFinal=category
    },
    categoryTwoOK(category){
        this.ask.categoryId=category.id
        this.categoryFinal=category
        listTags(parseInt(category.id)).then((res)=>{
            console.log(res)
            this.tags=res.data.data
        })
    },
    tagOK(tag){
        this.ask.tags+=tag+" "
    },
    // 菜单一
    menu1change1:function(){
        this.isMenu1item1=!this.isMenu1item1,
        this.isMenu1item2=true,
        this.isMenu1item3=true,
        this.isMenu1item4=true,
        this.isMenu1item5=true
    },
    menu1change2:function(){
        this.isMenu1item2=!this.isMenu1item2,
        this.isMenu1item1=true,
        this.isMenu1item3=true,
        this.isMenu1item4=true,
        this.isMenu1item5=true
    },
    menu1change3:function(){
        this.isMenu1item3=!this.isMenu1item3,
        this.isMenu1item2=true,
        this.isMenu1item1=true,
        this.isMenu1item4=true,
        this.isMenu1item5=true
    },
    menu1change4:function(){
        this.isMenu1item4=!this.isMenu1item4,
        this.isMenu1item2=true,
        this.isMenu1item3=true,
        this.isMenu1item1=true,
        this.isMenu1item5=true
    },
    menu1change5:function(){
        this.isMenu1item5=!this.isMenu1item5,
        this.isMenu1item2=true,
        this.isMenu1item3=true,
        this.isMenu1item4=true,
        this.isMenu1item1=true,
        this.isShow1=false,
        this.isShow2=false,
        this.chose1=false,
        this.chose1After=true,
        this.message1="#其他物品"
    },
    // 切换菜单
    toShow1(){
        listCategories(0).then((res)=>{
            this.categories=res.data.data
        })
        this.isShow1=true,
        this.isShow3=false,
        this.isShow2=false,
        this.isShow4=false,
        this.isShow5=false
    },
    toShow(id){
        console.log(id)
        listCategories(id).then((res)=>{
            this.categories=res.data.data
        })
        this.isShow3=true;
    },
    notShow:function(){
        this.isShow1=false
        this.isShow2=false
        this.isShow3=false
        this.isShow4=false
        this.isShow5=false
        this.isShow6=false
        this.isShow7=false
        this.isShow71=false
        this.isShow72=false
        this.isShow73=false
    },
    Ok1:function(){
        this.isShow1=false,
        this.isShow3=false,
        this.isShow2=false,
        this.isShow4=false,
        this.isShow5=false,
        this.chose1=false,
        this.chose1After=true
    },
    Ok2:function(){
        this.isShow6=false,
        this.chose2=false,
        this.chose2After=true
    },
    Ok3:function(){
        this.isShow7=false,
        this.isShow71=false,
        this.isShow72=false,
        this.isShow73=false,
        this.chose3=false,
        this.chose3After=true
    },
    // 卡或证件
    menu3change1:function(){
        this.isMenu3item1=!this.isMenu3item1,
        this.isMenu3item2=true,
        this.isMenu3item3=true,
        this.isMenu3item4=true,
        this.isMenu3item5=true,
        this.isMenu3item6=true,
        this.isMenu3item7=true,
        this.isMenu3item8=true,
        this.isMenu3item9=true,
        this.message1="#校园卡"
    },

    // 切换校区
    zi5change1:function(){
        this.ask.campus=0
        this.isZi51=!this.isZi51,
        this.isZi52=true
    },
    zi5change2:function(){
        this.ask.campus=1
        this.isZi52=!this.isZi52,
        this.isZi51=true
    },
    // 物品颜色
    toShow6(tagContent){
        var s = tagContent+''
        this.tagContent=s.split(',')
        console.log(this.tagContent)
        this.isShow6=true
    },
    menu6change1:function(){
        this.isMenu6item1=!this.isMenu6item1,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#红色"
    },
    menu6change2:function(){
        this.isMenu6item2=!this.isMenu6item2,
        this.isMenu6item1=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#紫色"
    },
    menu6change3:function(){
        this.isMenu6item3=!this.isMenu6item3,
        this.isMenu6item2=true,
        this.isMenu6item1=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#橙色"
    },
    menu6change4:function(){
        this.isMenu6item4=!this.isMenu6item4,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item1=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#黑色"
    },
    menu6change5:function(){
        this.isMenu6item5=!this.isMenu6item5,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item1=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#黄色"
    },
    menu6change6:function(){
        this.isMenu6item6=!this.isMenu6item6,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item1=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#白色"
    },
    menu6change7:function(){
        this.isMenu6item7=!this.isMenu6item7,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item1=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#绿色"
    },
    menu6change8:function(){
        this.isMenu6item8=!this.isMenu6item8,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item1=true,
        this.isMenu6item9=true,
        this.isMenu6item10=true,
        this.message2="#灰色"
    },
    menu6change9:function(){
        this.isMenu6item9=!this.isMenu6item9,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item1=true,
        this.isMenu6item10=true,
        this.message2="#蓝色"
    },
    menu6change10:function(){
        this.isMenu6item10=!this.isMenu6item10,
        this.isMenu6item2=true,
        this.isMenu6item3=true,
        this.isMenu6item4=true,
        this.isMenu6item5=true,
        this.isMenu6item6=true,
        this.isMenu6item7=true,
        this.isMenu6item8=true,
        this.isMenu6item9=true,
        this.isMenu6item1=true,
        this.message2="#其他"
    },
    //物品品牌笔记本
    toShow7:function(){
        if(this.isMenu2item1==false){
            this.isShow71=true,
            this.isShow7=false,
            this.isShow72=false,
            this.isShow73=false
        }
        if(this.isMenu2item13==false){
            this.isShow7=true,
            this.isShow71=false,
            this.isShow72=false,
            this.isShow73=false
        }
        if(this.isMenu2item8==false){
            this.isShow72=true,
            this.isShow7=false,
            this.isShow71=false,
            this.isShow73=false
        }
        if(this.isMenu2item5==false){
            this.isShow72=false,
            this.isShow7=false,
            this.isShow71=false,
            this.isShow73=true
        }
        
    },
    menu7change1:function(){
        this.isMenu7item1=!this.isMenu7item1,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#联想"
    },
    menu7change2:function(){
        this.isMenu7item2=!this.isMenu7item2,
        this.isMenu7item1=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#惠普"
    },
    menu7change3:function(){
        this.isMenu7item3=!this.isMenu7item3,
        this.isMenu7item2=true,
        this.isMenu7item1=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#戴尔"
    },
    menu7change4:function(){
        this.isMenu7item4=!this.isMenu7item4,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item1=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#苹果"
    },
    menu7change5:function(){
        this.isMenu7item5=!this.isMenu7item5,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item1=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#华硕"
    },
    menu7change6:function(){
        this.isMenu7item6=!this.isMenu7item6,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item1=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#小米"
    },
    menu7change7:function(){
        this.isMenu7item7=!this.isMenu7item7,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item1=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="华为"
    },
    menu7change8:function(){
        this.isMenu7item8=!this.isMenu7item8,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item1=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#神州"
    },
    menu7change9:function(){
        this.isMenu7item9=!this.isMenu7item9,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item1=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#微星"
    },
    menu7change10:function(){
        this.isMenu7item10=!this.isMenu7item10,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item1=true,
        this.isMenu7item11=true,
        this.isMenu7item12=true,
        this.message3="#微软"
    },
    menu7change11:function(){
        this.isMenu7item11=!this.isMenu7item11,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item1=true,
        this.isMenu7item12=true,
        this.message3="#宏基"
    },
    menu7change12:function(){
        this.isMenu7item12=!this.isMenu7item12,
        this.isMenu7item2=true,
        this.isMenu7item3=true,
        this.isMenu7item4=true,
        this.isMenu7item5=true,
        this.isMenu7item6=true,
        this.isMenu7item7=true,
        this.isMenu7item8=true,
        this.isMenu7item9=true,
        this.isMenu7item10=true,
        this.isMenu7item11=true,
        this.isMenu7item1=true,
        this.message3="#其他"
    },
    // 物品品牌手机
    menu71change1:function(){
        this.isMenu71item1=!this.isMenu71item1,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#苹果"
    },
    menu71change2:function(){
        this.isMenu71item2=!this.isMenu71item2,
        this.isMenu71item1=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#华为"
    },
    menu71change3:function(){
        this.isMenu71item3=!this.isMenu71item3,
        this.isMenu71item2=true,
        this.isMenu71item1=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#小米"
    },
    menu71change4:function(){
        this.isMenu71item4=!this.isMenu71item4,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item1=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#OPPO"
    },
    menu71change5:function(){
        this.isMenu71item5=!this.isMenu71item5,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item1=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#vivo"
    },
    menu71change6:function(){
        this.isMenu71item6=!this.isMenu71item6,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item1=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#荣耀"
    },
    menu71change7:function(){
        this.isMenu71item7=!this.isMenu71item7,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item1=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="三星"
    },
    menu71change8:function(){
        this.isMenu71item8=!this.isMenu71item8,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item1=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#联想"
    },
    menu71change9:function(){
        this.isMenu71item9=!this.isMenu71item9,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item1=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#中兴"
    },
    menu71change10:function(){
        this.isMenu71item10=!this.isMenu71item10,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item1=true,
        this.isMenu71item11=true,
        this.isMenu71item12=true,
        this.message3="#LG"
    },
    menu71change11:function(){
        this.isMenu71item11=!this.isMenu71item11,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item1=true,
        this.isMenu71item12=true,
        this.message3="#一加"
    },
    menu71change12:function(){
        this.isMenu71item12=!this.isMenu71item12,
        this.isMenu71item2=true,
        this.isMenu71item3=true,
        this.isMenu71item4=true,
        this.isMenu71item5=true,
        this.isMenu71item6=true,
        this.isMenu71item7=true,
        this.isMenu71item8=true,
        this.isMenu71item9=true,
        this.isMenu71item10=true,
        this.isMenu71item11=true,
        this.isMenu71item1=true,
        this.message3="#其他"
    },
    //物品品牌相机
    menu72change1:function(){
        this.isMenu72item1=!this.isMenu72item1,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#尼康"
    },
    menu72change2:function(){
        this.isMenu72item2=!this.isMenu72item2,
        this.isMenu72item1=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu7item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#佳能"
    },
    menu72change3:function(){
        this.isMenu72item3=!this.isMenu72item3,
        this.isMenu72item2=true,
        this.isMenu72item1=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#索尼"
    },
    menu72change4:function(){
        this.isMenu72item4=!this.isMenu72item4,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item1=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#徕卡"
    },
    menu72change5:function(){
        this.isMenu72item5=!this.isMenu72item5,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item1=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#松下"
    },
    menu72change6:function(){
        this.isMenu72item6=!this.isMenu72item6,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item1=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#富士"
    },
    menu72change7:function(){
        this.isMenu72item7=!this.isMenu72item7,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item1=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="理光"
    },
    menu72change8:function(){
        this.isMenu72item8=!this.isMenu72item8,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item1=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#适马"
    },
    menu72change9:function(){
        this.isMenu72item9=!this.isMenu72item9,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item1=true,
        this.isMenu72item10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#三星"
    },
    menu72change10:function(){
        this.isMenu72item10=!this.isMenu72item10,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item1=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#卡西欧"
    },
    menu72change11:function(){
        this.isMenu72item11=!this.isMenu72item11,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu72item10=true,
        this.isMenu72item1=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#哈苏"
    },
    menu72change12:function(){
        this.isMenu72item12=!this.isMenu72item12,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu7i2tem10=true,
        this.isMenu72item11=true,
        this.isMenu72item1=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#奥林巴斯"
    },
    menu72change13:function(){
        this.isMenu72item13=!this.isMenu72item13,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu7i2tem10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item1=true,
        this.isMenu72item14=true,
        this.isMenu72item15=true,
        this.message3="#宾得"
    },
    menu72change14:function(){
        this.isMenu72item14=!this.isMenu72item14,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu7i2tem10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item1=true,
        this.isMenu72item15=true,
        this.message3="#SICAM"
    },
    menu72change15:function(){
        this.isMenu72item15=!this.isMenu72item15,
        this.isMenu72item2=true,
        this.isMenu72item3=true,
        this.isMenu72item4=true,
        this.isMenu72item5=true,
        this.isMenu72item6=true,
        this.isMenu72item7=true,
        this.isMenu72item8=true,
        this.isMenu72item9=true,
        this.isMenu7i2tem10=true,
        this.isMenu72item11=true,
        this.isMenu72item12=true,
        this.isMenu72item13=true,
        this.isMenu72item14=true,
        this.isMenu72item1=true,
        this.message3="#其他"
    },
    // 物品品牌平板
    menu73change1:function(){
        this.isMenu73item1=!this.isMenu73item1,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#苹果iPad"
    },
    menu73change2:function(){
        this.isMenu73item2=!this.isMenu73item2,
        this.isMenu73item1=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#微软Surface"
    },
    menu73change3:function(){
        this.isMenu73item3=!this.isMenu73item3,
        this.isMenu73item2=true,
        this.isMenu73item1=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#华为MatePad Pro"
    },
    menu73change4:function(){
        this.isMenu73item4=!this.isMenu73item4,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item1=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#三星Tab S"
    },
    menu73change5:function(){
        this.isMenu73item5=!this.isMenu73item5,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item1=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#联想Yoga Pad Pro"
    },
    menu73change6:function(){
        this.isMenu73item6=!this.isMenu73item6,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item1=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#华为MatePad"
    },
    menu73change7:function(){
        this.isMenu73item7=!this.isMenu73item7,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item1=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="荣耀V系列"
    },
    menu73change8:function(){
        this.isMenu73item8=!this.isMenu73item8,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item1=true,
        this.isMenu73item9=true,
        this.isMenu73item10=true,
        this.message3="#联想小新"
    },
    menu73change9:function(){
        this.isMenu73item9=!this.isMenu73item9,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item1=true,
        this.isMenu73item10=true,
        this.message3="#小米平板5系列"
    },
    menu73change10:function(){
        this.isMenu73item10=!this.isMenu73item10,
        this.isMenu73item2=true,
        this.isMenu73item3=true,
        this.isMenu73item4=true,
        this.isMenu73item5=true,
        this.isMenu73item6=true,
        this.isMenu73item7=true,
        this.isMenu73item8=true,
        this.isMenu73item9=true,
        this.isMenu73item1=true,
        this.message3="#华为M6"
    },
    // 联系方式
    contactChange:function(){
        this.contact1=!this.contact1,
        this.isContact=!this.isContact,
        this.isZi7=!this.isZi7, 
        this.isTu12=!this.isTu12
    },
    contactChange1:function(){
        this.contact1=false,
        this.contact2=true,
        this.contact3=false,
        this.isContact=!this.isContact,
        this.isZi7=!this.isZi7,
        this.isTu12=!this.isTu12,
        this.isZi81=!this.isZi81,
        this.isZi82=true,
        this.message4="手机号"
    },
    contactChange2:function(){
        this.contact1=false,
        this.contact2=false,
        this.contact3=true,
        this.isContact=!this.isContact,
        this.isZi7=!this.isZi7,
        this.isTu12=!this.isTu12,
        this.isZi81=true,
        this.isZi82=!this.isZi82,
        this.message4="QQ号"
    },
},
}
</script>

<style scoped lang="css">
body{
    height: 100%;
    width: 100%;
    background-color: white;
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
    background: url("../assets/lvsejiantou.png");
    background-size: 100% 100%;
    margin-top: 20px;
}
.top2{
    position: fixed;
    top: 50px;
    height: 25px;
    width: 100%;
    background-color: #589788;
    font-family: SourceHanSansCN-Medium;
    font-size: 0.9rem;
    color: #FEFEFE;
    font-weight: medium;
    text-align:center;
    padding-top:12px;
    z-index: 3;
}
.top3{
    background-color: #589788;
    position: fixed;
    top: 85px;
    height: 15px;
    width: 100%;
}
.middle{
    height: auto;
    width: 100%;
    position: absolute;
    top:90px;
    z-index: 2;
    background-color: white;
    border-radius:15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
}
.middle1{
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
}
.zi2{
    margin: 20px;
    margin-left: 30px;
    font-size: 1.3rem;
    color: #4E4E4E;
    font-weight: bold;
    font-family: SourceHanSansCN-Bold;
}
.box1{
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 3px;
}
.tu2{
    height: 20px;
    width: 20px;
    background: url("../assets/wupinleibie.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.zi3{
    width: 80px;
    margin-left: 3px;
    color: #4E4E4E;
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 6.5px;
}
.item1{
    height: 33px;
    width: 180px;
    margin-top: 2px;
    background-color: #E6EDEB;
    border-color:transparent;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
}
.item0{
    height: 30px;
    width: 180px;
    background-color: #E6EDEB;
    border-color:transparent;
    border-radius: 20px;
    font-size: 0.9rem;
}
.zi4{
    width: 145px;
    margin-top: 6px;
    margin-left: 15px;
    color: #6C6C6C;
    font-size: 0.9rem;
    font-weight: regular;
}
.tu13{
    height: 15px;
    width: 9px;
    background: url("../assets/huisejiantou.png");
    background-size: 100% 100%;
    margin-top: 8px;
}
.tu3{
    height: 20px;
    width: 20px;
    background: url("../assets/suozaixiaoqu.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.item2{
    height: 34px;
    width: 180px;
    background-color: #E6EDEB;
    border-color:transparent;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align:center;
}
.box2{
    height: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 3px;
}
.box2-top{
    display: flex;
}
.tu4{
    height: 20px;
    width: 20px;
    background: url("../assets/shangchuanzhaopian.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.item3{
    display: flex;
    flex-direction: row;
}
.tu5{
    height: 80px;
    width: 80px;
    background: url("../assets/tianjiatupian.png");
    background-size: 100% 100%;
    margin-top: 20px;
    margin-left: 40px;
}
.item3-zi{
    height: 23px;
    width: 125px;
    background-color: #E6EDEB;
    border-color:transparent;
    border-radius: 20px;
    text-align:center;
    margin-top: 68px;
    margin-left: 10px;
    font-size: 0.8rem;
    padding-top: 5px;
    color: #589788;
    font-weight: regular;
}
.middle2{
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
}
.tu6{
    height: 20px;
    width: 20px;
    background: url("../assets/wupinyanse.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.tu7{
    height: 20px;
    width: 20px;
    background: url("../assets/wupinpinpai.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.tu8{
    height: 20px;
    width: 20px;
    background: url("../assets/qitamiaoshu.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.item6{
    height: 80px;
    width: 280px;
    margin-left: 35px;
    background-color: #E6EDEB;
    border-color:transparent;
    border-radius: 15px;
    font-size: 1rem;
    padding-top: 0px;
}
.middle3{
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
}
.tu9{
    height: 20px;
    width: 20px;
    background: url("../assets/shihuodidian.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.tu10{
    height: 20px;
    width: 20px;
    background: url("../assets/fangzhididian.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.tu15{
    height: 20px;
    width: 20px;
    background: url("../assets/zhengjiankahao.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.middle4{
    margin-bottom: 100px;
}
.tu11{
    height: 20px;
    width: 20px;
    background: url("../assets/lianxifangshi.png");
    background-size: 100% 100%;
    margin-left: 25px;
    margin-right: 12px;
    margin-top: 7px;
}
.tu12{
    height: 8px;
    width: 10px;
    background: url("../assets/daosanjiao.png");
    background-size: 100% 100%;
    margin-top: 7px;
    margin-left: 8px;
}
/* 改变后变为倒三角 */
.tu120{
    height: 8px;
    width: 10px;
    background: url("../assets/zhengsanjiao.png");
    background-size: 100% 100%;
    margin-top: 5px;
    margin-left: 8px;
}
/* 联系方式 */

.contact{
    height: 80px;
    width: 75px;
    margin-left: 3px;
    margin-right: 5px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
}
.contact0{
    height: 80px;
    width: 75px;
    margin-left: 3px;
    margin-right: 5px;
    border-radius: 4px;
    background-color: #EFEFEF;
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
}
.zi7{
    height: 35px;
    color: #4E4E4E;
    font-size: 0.9rem;
    font-weight: bold;
    padding-top: 6.5px;
    display: flex;
    padding-left: 6px;
}
/* 点击后改变 */
.zi70{
    height: 35px;
    background-color: #EFEFEF;
    color: #6C6C6C;
    font-size: 0.9rem;
    font-weight: bold;
    padding-top: 6.5px;
    display: flex;
    padding-left: 6px;
}
.zi8{
    height: 35px;
    color: #6C6C6C;
    font-size: 0.9rem;
    font-weight: bold;
    padding-top: 3px;
    background-color: #EFEFEF;
    padding-left: 6px;
}
.zi80{
    height: 35px;
    background-color: #589788;
    color: #FEFEFE;
    font-size: 0.9rem;
    font-weight: bold;
    padding-top: 3px;
    padding-left: 4px;
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
.bottom{
    height: 60px;
    width: 100%;
    background-color: white;
    position: fixed;
    bottom:0px;
    z-index: 3;
}
.zi6{
    background-color: #17A697;
    height: 31px;
    padding-top: 5px;
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 30px;
    text-align:center;
    -top: 10px;
    color: #FDFEFE;
    font-size: 1.1rem;
    font-weight: bold;
}

/* 覆盖 */
.mask{
    z-index: 4;
    height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.5);
    position: fixed;
    bottom: 0px;
}
/* 菜单1*/
.menu1{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:55%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
.menu1-top{
    height: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 28px;
    margin-left: 28px;
    margin-right: 28px;
}
.menu1-img{
    height: 18px;
    width: 18px;
    background: url("../assets/xiaochahao.png");
    background-size: 100% 100%;
}
.menu1-word{
    margin-left: 90px;
    color: #4E4E4E;
    font-size: 1.15rem;
    margin-top: -3.2px;
    font-weight: medium;
}
.menu1-middle{
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
}
.menu1-item{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
}
/* 点击后变色 */
.menu1-item-change{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: white;
    background-color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
}
.menu1-bottom{
    margin-top: 20px;
    margin-left: 80%;
    color: #17A697;
    font-weight: medium;
}

.choseAfter{
    display: flex;
    flex-direction: row;
}
/* 点击后改变 */
.choseAfter1{
    width: auto;
    padding-left: 14px;
    padding-right: 14px;
    background: #589788;
    color: white;
    padding-top: 3px;
    height: 22px;
    text-align:center;
    border: #589788 1.5px solid;
    margin-top: 2px;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 5px;
}
.choseAgain{
    margin-top: 10px;
    margin-left: 20px; 
    font-size: 0.82rem;
    color: #589788;
}
/* 卡或证件 */
.menu3{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:43%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
.menu3-middle{
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
}
.menu3-box{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
}
.menu3-item{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu3-item-change{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: white;
    background-color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu3-bottom{
    margin-top: 20px;
    color: #17A697;
    font-weight: medium;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
}
.menu3-bottom1{
    margin-left: 7%;
}
.menu3-bottom2{
    margin-right: 7%;
}
/* 电子产品 */
.menu2{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:55%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
.menu2-middle{
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
}
.menu2-box{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
}
.menu2-item{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu2-item1{
    padding-top: 2.5px;
    height: 22px;
    width: 120px;
    text-align:center;
    color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu2-item-change{
    padding-top: 2.5px;
    height: 22px;
    width: 80px;
    text-align:center;
    color: white;
    background-color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu2-item1-change{
    padding-top: 2.5px;
    height: 22px;
    width: 120px;
    text-align:center;
    color: white;
    background-color: #589788;
    border: #589788 1.5px solid;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: medium;
    margin-left: 15px;
    margin-right: 15px;
}
.menu2-bottom{
    margin-top: 20px;
    font-weight: medium;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
}
.menu2-bottom1{
    margin-left: 7%;
    color: #6C6C6C;
}
.menu2-bottom2{
    margin-right: 7%;
    color: #17A697;
}
/* 生活用品 */
.menu5{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:50%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
.menu5-middle{
    width: 100%;
    height: 190px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
}
.menu5-box{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
}
/* 物品颜色 */
.menu6{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:50%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
.menu6-middle{
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items:center;
}
.menu6-box{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
}
/* 物品品牌笔记本 */
.menu7{
    position: fixed;
    bottom: 0;
    z-index: 4;
    height:55%;
    width: 100%;
    background-color: #EDF3F2;
    border-radius: 20px 20px 0px 0px;
}
/* 发布失败 */
.fail{
    position: fixed;
    top:42%;
    left: 23%;
    z-index: 15;
    height: 100px;
	width: 200px;
	background-color: #D9534F;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.fail-box{
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.fail-img{
    margin-top: 27px;
    margin-left: 50px;
    height: 15px;
    width: 15px;
    background: url("../assets/fabushibai.png");
    background-size: 100% 100%;
}
.fail-item1{
    color: #FEFEFE;
    margin-top: 22px;
    margin-left: 6px;
    font-size: 1.2rem;
    font-weight: medium;
}
.fail-item2{
    margin-left: 49px;
    color: #FEFEFE;
    font-size: 0.9rem;
}
/* 填写不完整 */
.incomplete{
    position: fixed;
    top:42%;
    left: 23%;
    z-index: 15;
    height: 100px;
	width: 200px;
	background-color: #F0AD4E;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.incomplete-box{
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.incomplete-img{
    margin-top: 27px;
    margin-left: 50px;
    height: 15px;
    width: 15px;
    background: url("../assets/tianxiebuwanzheng.png");
    background-size: 100% 100%;
}
.incomplete-item1{
    color: #FEFEFE;
    margin-top: 22px;
    margin-left: 6px;
    font-size: 1.1rem;
    font-weight: medium;
}
.incomplete-item2{
    margin-left: 36px;
    color: #FEFEFE;
    font-size: 0.85rem;
}
.white{
    width: 100%;
    height: 600px;
    background-color: white;
}
</style>
