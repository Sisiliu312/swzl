<template>
    <body>
        <div class="top1">
            <div class="tu1" @click="toXinjian"></div>
            <div class="top1-box">招领帖</div>
        </div>

        <div class="top2">请认真填写以下信息, 这将会帮助我们匹配到失主</div>
        <div class="top3"></div>

        <div class="middle">
            <div class="middle1">
                <div class="zi2">基本信息</div>

                <!-- 物品类别 -->
                <div class="box1">
                    <div class="tu2"></div>
                    <div class="zi3">物品类别</div>


                    <div class="item1" v-show="chose1" @click="toShowCategoryOne">
                        <div class="zi4">请选择物品类别</div>
                        <div class="tu13"></div>
                    </div>

                    <!-- 物品类别选择后改变 -->
                    <div class="choseAfter" v-show="choseCategoryAfter">
                        <div class="choseAfter1">{{ categoryTwo.categoryName }}</div>
                        <div class="choseAgain" @click="toShowCategoryOne">(点击更改标签)</div>
                    </div>

                </div>

                <!-- 选择校区 -->
                <div class="box1">
                    <div class="tu3"></div>
                    <div class="zi3">所在校区</div>
                    <div class="item2">
                        <div v-bind:class="isZi51?'zi5':'zi50'" @click="zi5change1">北洋园</div>
                        <div v-bind:class="isZi52?'zi5':'zi50'" @click="zi5change2">卫津路</div>
                    </div>
                </div>



                <!-- 上传图片 -->
                <div class="box2">
                    <div class="box2-top">
                    <div class="tu4"></div>
                    <div class="zi3">上传照片</div>
                    </div>
                    <div class="item3">
                        <div id="addFileBtn">
                            <img :src="addFileBtnPic" v-if="addFileBtnPic">
                            <input class="tu5" type="file" name="file" @change="upload">
                        </div>
                        <div class="item3-zi">限上传一张照片</div>
                    </div>
                </div>

            </div>
            

            <div class="middle2">

                <div class="zi2">详细特征</div>
                <div class="box1" v-show="wupinyanse">

                    <div class="tu6"></div>

                    <div class="item1" v-for="tag in tagList" :key="tag.index" v-show="chose2">

                        <!-- 点击后出现标签详情 -->
                        <div class="zi3" @click="toShowTagContent(tag.tagContent)">{{tag.tagName}}</div>
                        <div class="zi4" @click="toShowTagContent(tag.tagContent)">请选择{{tag.tagName}}</div>
                        <div class="tu13" @click="toShowTagContent(tag.tagContent)"></div>
                        
                        
                    </div>

                    <!-- 选择后改变 -->
                    <div class="choseAfter" v-show="chose2After">
                        <div class="choseAfter1">{{ message2 }}</div>
                        <div class="choseAgain" @click="toShowTagContent">(点击更改标签)</div>
                    </div>
                    
                </div>





                <div class="box3" v-show="qitamiaoshu">
                    <div class="box1">
                    <div class="tu8"></div>
                    <div class="zi3">其他描述</div>
                </div>
                    <textarea class="item6" type="text" placeholder="请填写其他特征" v-model="post.description"></textarea>
                </div>
            </div>
            
            
            <!-- 拾获地点和放置地点 -->
            <div class="middle3">
                <div class="zi2">其他信息</div>
                <div class="box1">
                    <div class="tu9"></div>
                    <div class="zi3">拾获地点</div>
                    <input class="item0" type="text" placeholder="如XX教A407走廊" v-model="post.findLocation">
                </div>
                <div class="box1">
                    <div class="tu10"></div>
                    <div class="zi3">放置地点</div>
                    <input class="item0" type="text" placeholder="填写捡拾者处或其他地点" v-model="post.nowLocation">
                </div>
            </div>

            

            <!-- 联系方式 -->
            <div class="middle4">
                <div class="zi2">联系方式</div>
                <div class="box1">
                    <input class="item0" placeholder="请填写您的联系方式" v-show="contact2" v-model="post.contact">
                </div>
            </div>        

            
        </div>

        <!-- 发布按钮 -->
        <div class="bottom">
            <div v-bind:class="isZi6?'zi6':'zi60'" @click="publish()">发 布</div>
        </div>


        <!-- 一级类别 -->
        <div class="mask" v-show="showCategoryOne">
        </div>
        <div  class="menu1" v-show="showCategoryOne">
            <div>
                <el-radio-group v-model="categoryOneId">
                <el-radio-button style="margin:20px" v-for="category in categoryOneList" :label="category.id" :key="category.index">{{category.categoryName}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="menu1-bottom" @click="toShowCategoryTwo(categoryOneId)">下一步</div>
        </div>

        <!-- 二级类别 -->
        <div class="mask" v-show="showCategoryTwo">
        </div>
        <div  class="menu3" v-show="showCategoryTwo">
            <div class="menu1-top">
                <div class="menu1-img" @click="notShow"></div>
                <div class="menu1-word">请选择物品类别</div>
            </div>
            <div>
                <el-radio-group v-model="categoryTwo">
                <el-radio-button style="margin:20px" v-for="category in categoryTwoList" :label="category" :key="category.index">{{category.categoryName}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="menu2-bottom">
                <div class="menu2-bottom1" @click="toShowCategoryOne">上一步</div>
                <div class="menu2-bottom2" @click="confirmCategory()">确定</div>
            </div>
        </div>


        <!-- 标签详情 -->
        <div class="mask" v-show="showTagContent">
        </div>
        <div  class="menu6" v-show="showTagContent">
            <div class="menu1-top">
                <div class="menu1-img" @click="notShow"></div>
                <div class="menu1-word">请选择</div>
            </div>
            <div class="menu6-middle">
                <el-radio-group v-model="smallTagDetail">
                    <el-radio-button style="margin:20px" v-for="smallTag in tagContent" :label="smallTag" :key="smallTag.index">{{smallTag}}</el-radio-button>
                </el-radio-group>
            </div>
                <div class="menu1-bottom" @click="tagOK">确定</div>
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
import {publish} from '@/api/post.js'
import {upload} from '@/api/upload.js'
import {listCategories} from '@/api/category.js'
import {listTags} from '@/api/tags.js'

export default {
name: 'zhaolingtie',
data(){
    return{
        categoryOneId: '',
        categoryTwo: {},
        addFileBtnPic:'',
        smallTagDetail: '',
        post:{
            tags:''
        },
        categoryOneList:[],
        categoryTwoList:[],
        tagList:[],
        tagContent:[],
        // 物品类别
        chose1:true,
        choseCategoryAfter:false,
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
        showCategoryOne:false,



        //二级标签
        showCategoryTwo:false,

        


        // 选择校区
        isZi51:true,
        isZi52:true,
        // 选择物品颜色
        showTagContent:false,
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
        // 发布
        isZi6:true
    }
},
created(){
    this.post.userId=this.$store.state.userInfo.id
},
methods:{
    toXinjian:function(){
        this.$router.push('/Xinjian')
    },
    publish(){
        this.post.tags=this.post.tags.trim()
        publish(this.post).then((res)=>{
            console.log(res)
        })
    },
    upload(e){
        let formdata = new FormData()
        Array.from(e.target.files).map(item => {
         formdata.append("file", item)
       })
       upload(formdata).then((res)=>{
           this.post.images=res.data
           this.addFileBtnPic = res.data
       })
    },

    confirmCategory(){
        let categoryTwoId=this.categoryTwo.id
        this.post.categoryId=categoryTwoId
        
        listTags(categoryTwoId).then((res)=>{
            this.tagList=res.data.data
        })

        this.showCategoryTwo=false,
        this.isShow4=false,
        this.isShow5=false,
        this.chose1=false,
        this.choseCategoryAfter=true
    },
    tagOK(){
        console.log(this.smallTagDetail)
        this.post.tags += this.smallTagDetail+" "
        console.log(this.post.tags)
        this.showTagContent=false,
        this.chose2=false,
        this.chose2After=true
    },
    

    
    // 切换菜单
    toShowCategoryOne(){
        listCategories(0).then((res)=>{
            this.categoryOneList=res.data.data
        })
        this.showCategoryOne=true,
        this.showCategoryTwo=false,

        this.isShow4=false,
        this.isShow5=false
    },
    toShowCategoryTwo(id){
        listCategories(id).then((res)=>{
            this.categoryTwoList=res.data.data
        })
        this.showCategoryTwo=true;
        this.showCategoryOne=false;
    },
    notShow:function(){


        this.showCategoryTwo=false
        this.isShow4=false
        this.isShow5=false
        this.showTagContent=false
        this.isShow7=false
        this.isShow71=false
        this.isShow72=false
        this.isShow73=false
    },

    Ok3:function(){
        this.isShow7=false,
        this.isShow71=false,
        this.isShow72=false,
        this.isShow73=false,
        this.chose3=false,
        this.chose3After=true
    },

    // 切换校区
    zi5change1:function(){
        this.post.campus=0
        this.isZi51=!this.isZi51,
        this.isZi52=true
    },
    zi5change2:function(){
        this.post.campus=1
        this.isZi52=!this.isZi52,
        this.isZi51=true
    },
    // 物品颜色
    toShowTagContent(tagContent){
        var s = tagContent
        this.tagContent=s.split(',')
        this.showTagContent=true
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
    background-color: white;
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
#addFileBtn{
    height: 80px;
    width: 80px;
    background: url("../assets/tianjiatupian.png");
    background-size: 100% 100%;
    margin-top: 20px;
    margin-left: 40px;
    position: relative;
}
#addFileBtn>img{
    height: 100%;
    width: 100%;
    position: absolute;
}
.tu5{
    height: 100%;
    width: 100%;
    opacity: 0;
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
    border-radius: 10px;
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
.zi60{
    background-color: #128075;
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
    top: 0;
	left: 0;
    right: 0;
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
    left: 0;
    right: 0;
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
</style>
