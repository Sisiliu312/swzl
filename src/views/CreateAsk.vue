<template>
  <body>
    <!-- 头部标签 -->
    <div class="header">
      <div class="return" @click="toXinjian"></div>
      <div class="header-message">寻物帖</div>
    </div>
    <!-- 提示信息 -->
    <div class="prompt">请认真填写以下信息, 这将会帮助我们匹配到失主</div>
    <div class="division"></div>

    <!-- 主体 -->
    <div class="main">
      <!-- 基本信息 -->
      <div class="basic-message">
        <div class="zi2">基本信息</div>
        <!-- 物品类别 -->
        <div class="basic-box">
          <div class="tu2"></div>
          <div class="zi3">物品类别</div>

          <div class="item1" v-show="choseCategory" @click="toShowCategoryOne">
            <div class="zi4">请选择物品类别</div>
            <div class="tu13"></div>
          </div>

          <!-- 物品类别选择后改变 -->
          <div class="choseAfter" v-show="choseCategoryAfter">
            <div class="choseAfter1">{{ categoryTwo.categoryName }}</div>
            <div class="choseAgain" @click="toShowCategoryOne">
              (点击更改标签)
            </div>
          </div>
        </div>
        <!-- 选择校区 -->
        <div class="basic-box">
          <div class="tu3"></div>
          <div class="zi3">所在校区</div>
          <div class="item2">
            <div v-bind:class="isZi51 ? 'zi5' : 'zi50'" @click="zi5change1">
              北洋园
            </div>
            <div v-bind:class="isZi52 ? 'zi5' : 'zi50'" @click="zi5change2">
              卫津路
            </div>
          </div>
        </div>
      </div>

      <!-- 详细信息 -->
      <div class="detail-message">
        <div class="zi2">详细特征</div>
        <div class="basic-box">
          <div class="tu6"></div>

          <el-select v-model="selectedTag" placeholder="请选择标签">
            <el-option
              v-for="tag in tagList"
              :key="tag.index"
              :label="tag.tagName"
              :value="tag.tagName"
            >
            </el-option>
          </el-select>

          <!-- 点击后出现标签详情 -->

          <div class="zi3" @click="toShowTagContent(selectedTag)">
            请选择{{ selectedTag }}
          </div>

          <!-- 选择后改变 -->
          <div class="choseAfter" v-show="chose2After">
            <div class="choseAfter1">{{ this.ask.tags }}</div>
            <div class="choseAgain" @click="resetTag">(点击重置标签)</div>
          </div>
        </div>
      </div>
      <!-- 发布按钮 -->
      <div class="bottom">
        <div v-bind:class="isZi6 ? 'zi6' : 'zi60'" @click="publish()">发 布</div>
      </div>
    </div>

    

    <!-- 一级类别 -->
    <div class="mask" v-show="showCategoryOne"></div>
    <div class="menu1" v-show="showCategoryOne">
      <div class="menu1-top">
          <div class="menu1-img" @click="notShow"></div>
          <div class="menu1-word">请选择物品类别</div>
      </div>
      <div>
        <el-radio-group v-model="categoryOneId">
          <el-radio-button
            style="margin: 20px"
            v-for="category in categoryOneList"
            :label="category.id"
            :key="category.index"
            >{{ category.categoryName }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="menu1-bottom" @click="toShowCategoryTwo(categoryOneId)">
        下一步
      </div>
    </div>

    <!-- 二级类别 -->
    <div class="mask" v-show="showCategoryTwo"></div>
    <div class="menu3" v-show="showCategoryTwo">
      <div class="menu1-top">
        <div class="menu1-img" @click="notShow"></div>
        <div class="menu1-word">请选择物品类别</div>
      </div>
      <div>
        <el-radio-group v-model="categoryTwo">
          <el-radio-button
            style="margin: 20px"
            v-for="category in categoryTwoList"
            :label="category"
            :key="category.index"
            >{{ category.categoryName }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="menu2-bottom">
        <div class="menu2-bottom1" @click="toShowCategoryOne">上一步</div>
        <div class="menu2-bottom2" @click="confirmCategory()">确定</div>
      </div>
    </div>

    <!-- 标签详情 -->
    <div class="mask" v-show="showTagContent"></div>
    <div class="menu6" v-show="showTagContent">
      <div class="menu1-top">
        <div class="menu1-img" @click="notShow"></div>
        <div class="menu1-word">请选择</div>
      </div>
      <div class="menu6-middle">
        <el-radio-group v-model="smallTagDetail">
          <el-radio-button
            style="margin: 20px"
            v-for="smallTag in tagContent"
            :label="smallTag"
            :key="smallTag.index"
            >{{ smallTag }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="menu1-bottom" @click="tagOK">确定</div>
    </div>
  </body>
</template>

<script>
import { publish } from "@/api/ask.js";
import { listCategories } from "@/api/category.js";
import { listTags } from "@/api/tags.js";

export default {
  name: "zhaolingtie",
  data() {
    return {
      ask: {
        tags: "",
      },
      selectedTag: "",

      addFileBtnPic: "",
      // 选取的标签内容
      smallTagDetail: "",

      // 一级种类的列表
      categoryOneList: [],
      // 二级种类的列表
      categoryTwoList: [],
      // 所有标签的列表
      tagList: [],
      // 标签内容的列表
      tagContent: [],



      chose2After: false,

      // 其他描述
      otherDescription: true,

      // 选取一级种类的id
      categoryOneId: "",
      // 最终选好的二级种类
      categoryTwo: {},

      // 是否要选择种类
      choseCategory: true,
      // 是否选择完种类
      choseCategoryAfter: false,

      // 是否展示一级菜单
      showCategoryOne: false,
      // 是否展示二级菜单
      showCategoryTwo: false,
      // 是否展示标签内容
      showTagContent: false,

      // 选择校区
      isZi51: true,
      isZi52: true,

      //联系方式
      contact2: true,

      isZi7: true,
      isContact: true,
      isTu12: true,
      isZi81: true,
      isZi82: true,
      // 发布
      isZi6: true,
    };
  },
  created() {
    this.ask.userId = this.$store.state.userInfo.id;
  },
  methods: {
    // 重置所选标签
    resetTag() {
      this.ask.tags = "";
      this.chose2After = false;
    },
    toXinjian: function () {
      this.$router.go(-1)
    },

    // 发布帖子
    publish() {
      this.ask.tags = this.ask.tags.trim();
      publish(this.ask).then((res) => {
        if (res.data.state === 200) {
          this.$message({
            type: "success",
            message: `${res.data.msg}`,
          });
          this.$router.push("/");
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
    },


    // 确定最终物品种类
    confirmCategory() {
      let categoryTwoId = this.categoryTwo.id;
      this.ask.categoryId = categoryTwoId;

      listTags(categoryTwoId).then((res) => {
        this.tagList = res.data.data;
      });

      (this.showCategoryTwo = false),
        (this.isShow4 = false),
        (this.isShow5 = false),
        (this.choseCategory = false),
        (this.choseCategoryAfter = true);
    },
    tagOK() {
      this.ask.tags += this.smallTagDetail + " ";
      console.log(this.ask.tags);
      (this.showTagContent = false), (this.chose2After = true);
    },

    // 切换菜单
    toShowCategoryOne() {
      listCategories(0).then((res) => {
        this.categoryOneList = res.data.data;
      });
      (this.showCategoryOne = true),
        (this.showCategoryTwo = false),
        (this.isShow4 = false),
        (this.isShow5 = false);
    },
    toShowCategoryTwo(id) {
      listCategories(id).then((res) => {
        this.categoryTwoList = res.data.data;
      });
      this.showCategoryTwo = true;
      this.showCategoryOne = false;
    },
    notShow: function () {
      this.showCategoryTwo = false;
      this.isShow4 = false;
      this.isShow5 = false;
      this.showTagContent = false;
      this.isShow7 = false;
      this.isShow71 = false;
      this.isShow72 = false;
      this.isShow73 = false;
    },

    // 切换校区
    zi5change1: function () {
      this.ask.campus = 0;
      (this.isZi51 = !this.isZi51), (this.isZi52 = true);
    },
    zi5change2: function () {
      this.ask.campus = 1;
      (this.isZi52 = !this.isZi52), (this.isZi51 = true);
    },
    // 物品颜色
    toShowTagContent(selectedTag) {
      let that = this;

      this.tagList.forEach(function (item) {
        if (item.tagName === selectedTag) {
          var s = item.tagContent;
          that.tagContent = s.split(",");
        }
      });
      this.showTagContent = true;
    },
  },
};
</script>

<style scoped lang="css">
body {
  background-color: white;
  height: auto;
  width: 100%;
  margin: 0px;
}
.header {
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
.header-message {
  width: 50%;
  margin-right: 18%;
  margin-top: 10px;
  font-weight: Bold;
  font-size: 1.3rem;
  text-align: center;
  color: #589788;
  font-family: SourceHanSansCN-Bold;
}
.return {
  height: 15px;
  width: 8px;
  background: url("../assets/lvsejiantou.png");
  background-size: 100% 100%;
  margin-top: 20px;
}
.prompt {
  position: fixed;
  top: 50px;
  height: 25px;
  width: 100%;
  background-color: #589788;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.9rem;
  color: #fefefe;
  font-weight: medium;
  text-align: center;
  padding-top: 12px;
  z-index: 3;
}
.division {
  background-color: #589788;
  position: fixed;
  top: 85px;
  height: 15px;
  width: 100%;
}
.main {
  height: 101%;
  width: 100%;
  position: absolute;
  top: 90px;
  z-index: 2;
  background-color: white;
  border-radius: 15px 15px 0px 0px;
  display: flex;
  flex-direction: column;
}
.basic-message {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
.zi2 {
  margin: 20px;
  margin-left: 30px;
  font-size: 1.3rem;
  color: #4e4e4e;
  font-weight: bold;
  font-family: SourceHanSansCN-Bold;
}
.basic-box {
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 3px;
}
.tu2 {
  height: 20px;
  width: 20px;
  background: url("../assets/wupinleibie.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.zi3 {
  width: 80px;
  margin-left: 3px;
  color: #4e4e4e;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 6.5px;
}
.item1 {
  height: 33px;
  width: 180px;
  margin-top: 2px;
  background-color: #e6edeb;
  border-color: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
}
.item0 {
  height: 30px;
  width: 180px;
  background-color: #e6edeb;
  border-color: transparent;
  border-radius: 20px;
  font-size: 0.9rem;
}
.zi4 {
  width: 145px;
  margin-top: 6px;
  margin-left: 15px;
  color: #6c6c6c;
  font-size: 0.9rem;
  font-weight: regular;
}
.tu13 {
  height: 15px;
  width: 9px;
  background: url("../assets/huisejiantou.png");
  background-size: 100% 100%;
  margin-top: 8px;
}
.tu3 {
  height: 20px;
  width: 20px;
  background: url("../assets/suozaixiaoqu.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.item2 {
  height: 34px;
  width: 180px;
  background-color: #e6edeb;
  border-color: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
}
.image-box {
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3px;
}
.box2-top {
  display: flex;
}
.tu4 {
  height: 20px;
  width: 20px;
  background: url("../assets/shangchuanzhaopian.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.item3 {
  display: flex;
  flex-direction: row;
}
#addFileBtn {
  height: 80px;
  width: 80px;
  background: url("../assets/tianjiatupian.png");
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 40px;
  position: relative;
}
#addFileBtn > img {
  height: 100%;
  width: 100%;
  position: absolute;
}
.tu5 {
  height: 100%;
  width: 100%;
  opacity: 0;
}
.item3-zi {
  height: 23px;
  width: 125px;
  background-color: #e6edeb;
  border-color: transparent;
  border-radius: 20px;
  text-align: center;
  margin-top: 68px;
  margin-left: 10px;
  font-size: 0.8rem;
  padding-top: 5px;
  color: #589788;
  font-weight: regular;
}
.detail-message {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
.tu6 {
  height: 20px;
  width: 20px;
  background: url("../assets/wupinyanse.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.tu7 {
  height: 20px;
  width: 20px;
  background: url("../assets/wupinpinpai.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.tu8 {
  height: 20px;
  width: 20px;
  background: url("../assets/qitamiaoshu.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.item6 {
  height: 80px;
  width: 280px;
  margin-left: 35px;
  background-color: #e6edeb;
  border-color: transparent;
  border-radius: 10px;
  font-size: 1rem;
  padding-top: 0px;
}
.middle3 {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
.tu9 {
  height: 20px;
  width: 20px;
  background: url("../assets/shihuodidian.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.tu10 {
  height: 20px;
  width: 20px;
  background: url("../assets/fangzhididian.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}

.middle4 {
  margin-bottom: 100px;
}
.tu11 {
  height: 20px;
  width: 20px;
  background: url("../assets/lianxifangshi.png");
  background-size: 100% 100%;
  margin-left: 25px;
  margin-right: 12px;
  margin-top: 7px;
}
.tu12 {
  height: 8px;
  width: 10px;
  background: url("../assets/daosanjiao.png");
  background-size: 100% 100%;
  margin-top: 7px;
  margin-left: 8px;
}
/* 改变后变为倒三角 */
.tu120 {
  height: 8px;
  width: 10px;
  background: url("../assets/zhengsanjiao.png");
  background-size: 100% 100%;
  margin-top: 5px;
  margin-left: 8px;
}
/* 联系方式 */

.contact {
  height: 80px;
  width: 75px;
  margin-left: 3px;
  margin-right: 5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}
.contact0 {
  height: 80px;
  width: 75px;
  margin-left: 3px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}
.zi7 {
  height: 35px;
  color: #4e4e4e;
  font-size: 0.9rem;
  font-weight: bold;
  padding-top: 6.5px;
  display: flex;
  padding-left: 6px;
}
/* 点击后改变 */
.zi70 {
  height: 35px;
  background-color: #efefef;
  color: #6c6c6c;
  font-size: 0.9rem;
  font-weight: bold;
  padding-top: 6.5px;
  display: flex;
  padding-left: 6px;
}
.zi8 {
  height: 35px;
  color: #6c6c6c;
  font-size: 0.9rem;
  font-weight: bold;
  padding-top: 3px;
  background-color: #efefef;
  padding-left: 6px;
}
.zi80 {
  height: 35px;
  background-color: #589788;
  color: #fefefe;
  font-size: 0.9rem;
  font-weight: bold;
  padding-top: 3px;
  padding-left: 4px;
}
.zi5 {
  width: 50%;
  margin-left: 3px;
  color: #6c6c6c;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 6.5px;
}
.zi50 {
  border-radius: 20px;
  padding-top: 6px;
  width: 55%;
  color: #fefefe;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #589788;
}
.bottom {
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background-color: white;
  z-index: 3;
}
.zi6 {
  background-color: #17a697;
  height: 31px;
  padding-top: 5px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 30px;
  text-align: center;
  -top: 10px;
  color: #fdfefe;
  font-size: 1.1rem;
  font-weight: bold;
}
.zi60 {
  background-color: #128075;
  height: 31px;
  padding-top: 5px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 30px;
  text-align: center;
  -top: 10px;
  color: #fdfefe;
  font-size: 1.1rem;
  font-weight: bold;
}

/* 覆盖 */
.mask {
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0px;
}
/* 菜单1*/
.menu1 {
  position: fixed;
  bottom: 0;
  z-index: 4;
  height: 65%;
  width: 100%;
  background-color: #edf3f2;
  border-radius: 20px 20px 0px 0px;
}
.menu1-top {
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 28px;
  margin-left: 28px;
  margin-right: 28px;
}
.menu1-img {
  height: 18px;
  width: 18px;
  background: url("../assets/xiaochahao.png");
  background-size: 100% 100%;
}
.menu1-word {
  margin-left: 90px;
  color: #4e4e4e;
  font-size: 1.15rem;
  margin-top: -3.2px;
  font-weight: medium;
}

.menu1-bottom {
  margin-top: 20px;
  margin-left: 80%;
  color: #17a697;
  font-weight: medium;
}

.choseAfter {
  display: flex;
  flex-direction: row;
}
/* 点击后改变 */
.choseAfter1 {
  width: auto;
  padding-left: 14px;
  padding-right: 14px;
  background: #589788;
  color: white;
  padding-top: 3px;
  height: 22px;
  text-align: center;
  border: #589788 1.5px solid;
  margin-top: 2px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: medium;
  margin-left: 5px;
}
.choseAgain {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 0.82rem;
  color: #589788;
}
/* 卡或证件 */
.menu3 {
  position: fixed;
  bottom: 0;
  z-index: 4;
  height: 43%;
  width: 100%;
  background-color: #edf3f2;
  border-radius: 20px 20px 0px 0px;
}

/* 电子产品 */
.menu2 {
  position: fixed;
  bottom: 0;
  z-index: 4;
  height: 55%;
  width: 100%;
  background-color: #edf3f2;
  border-radius: 20px 20px 0px 0px;
}

.menu2-bottom {
  margin-top: 20px;
  font-weight: medium;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.menu2-bottom1 {
  margin-left: 7%;
  color: #6c6c6c;
}
.menu2-bottom2 {
  margin-right: 7%;
  color: #17a697;
}

/* 物品颜色 */
.menu6 {
  position: fixed;
  bottom: 0;
  z-index: 4;
  height: 50%;
  left: 0;
  right: 0;
  background-color: #edf3f2;
  border-radius: 20px 20px 0px 0px;
}
.menu6-middle {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

</style>
