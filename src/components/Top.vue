<template>
  <body>
    <div id="total">
      <div class="top"></div>

      <!-- 校区 类别 日期  header -->
      <div class="content">
        <div :class="isCheckedCampus ? 'box' : 'box0'" @click="showCampus">
          <div class="zi">校区</div>
          <div class="tu">
            <div class="tu1"></div>
            <div :class="campusArrow ? 'reversedTriangle' : 'triangle'"></div>
          </div>
        </div>

        <div :class="isCheckedCategory ? 'box' : 'box0'" @click="showCategory">
          <div class="zi">类别</div>
          <div class="tu">
            <div class="tu1"></div>
            <div :class="categoryArrow ? 'reversedTriangle' : 'triangle'"></div>
          </div>
        </div>

        <div :class="isCheckedDate ? 'box' : 'box0'" @click="showDate">
          <div class="zi">时间</div>
          <div class="tu">
            <div class="tu1"></div>
            <div :class="dateArrow ? 'reversedTriangle' : 'triangle'"></div>
          </div>
        </div>
      </div>

      <!-- 校区 -->
      <div class="mask" v-show="isShowCampus" @click="notShowCampus"></div>
      <div class="menu1" v-show="isShowCampus">
        <div
          :class="checkedBei ? 'backgroud-white' : 'backgroud-green'"
          @click="checkBei"
        >
          <div :class="checkedBei ? 'word-green' : 'word-white'">北洋园</div>
        </div>
        <div
          :class="checkedWei ? 'backgroud-white' : 'backgroud-green'"
          @click="checkWei"
        >
          <div :class="checkedWei ? 'word-green' : 'word-white'">卫津路</div>
        </div>
      </div>

      <!-- 种类 -->
      <div class="mask" v-show="isShowCategory" @click="notShowCategory"></div>
      <div class="menu2" v-show="isShowCategory">
        <div class="box1">
          <div class="label.category">
            <el-radio-group v-model="categoryId" @change="checkCategory()">
              <el-radio-button
                v-for="category in categories"
                :label="category.id"
                :key="category.index"
                >{{ category.categoryName }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
      </div>

      <!-- 日期 -->
      <div class="mask" v-show="isShowDate" @click="notShowDate"></div>
      <div class="menu2" v-show="isShowDate">
        <div id="l_menu3">
          <div>{{ date1.get("month") + 1 }}月</div>
          <div>
            <div
              class="first_time"
              :style="{
                backgroundColor: `${time_choice == 7 ? 'rgb(88,151,136)' : ''}`,
              }"
              @click="timeClick(7)"
            >
              <span
                :style="{ color: `${time_choice == 7 ? 'white' : 'black'}` }"
                >更早</span
              >
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date6 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date6)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 6 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 6 ? 'white' : 'black'}` }"
                >
                  {{ date6.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 6 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day6 | formatDay }}
                </div>
              </div>
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date5 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date5)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 5 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 5 ? 'white' : 'black'}` }"
                >
                  {{ date5.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 5 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day5 | formatDay }}
                </div>
              </div>
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date4 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date4)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 4 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 4 ? 'white' : 'black'}` }"
                >
                  {{ date4.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 4 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day4 | formatDay }}
                </div>
              </div>
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date3 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date3)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 3 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 3 ? 'white' : 'black'}` }"
                >
                  {{ date3.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 3 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day3 | formatDay }}
                </div>
              </div>
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date2 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date2)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 2 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 2 ? 'white' : 'black'}` }"
                >
                  {{ date2.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 2 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day2 | formatDay }}
                </div>
              </div>
            </div>
            <div
              class="other_time"
              :style="{ borderLeft: `solid ${date1 == 1 ? 1 : 0}px black` }"
              @click="timeClick(date1)"
            >
              <div
                :style="{
                  backgroundColor: `${
                    time_choice == 1 ? 'rgb(88,151,136)' : ''
                  }`,
                }"
              >
                <div
                  :style="{ color: `${time_choice == 1 ? 'white' : 'black'}` }"
                >
                  {{ date1.get("date") }}
                </div>
                <div
                  :style="{
                    color: `${time_choice == 1 ? 'white' : 'rgb(120,120,120)'}`,
                  }"
                >
                  {{ day1 | formatDay }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { listCategories } from "@/api/category.js";

export default {
  name: "top",
  data() {
    return {
      // 选择的种类id
      categoryId: "",
      //查询到的种类
      categories: [],

      // 选择的第几个日期
      time_choice: 1,

      // 日期
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      date5: "",
      date6: "",
      // 周几
      day1: "",
      day2: "",
      day3: "",
      day4: "",
      day5: "",
      day6: "",

      // 校区、种类、日期旁边的箭头
      campusArrow: true,
      categoryArrow: true,
      dateArrow: true,

      // 是否展示校区 种类 日期的选择
      isShowCampus: false,
      isShowCategory: false,
      isShowDate: false,

      // 校区 种类 日期 是否被选中
      isCheckedCampus: true,
      isCheckedCategory: true,
      isCheckedDate: true,

      // 北洋园和卫津路是否被选中
      checkedBei: true,
      checkedWei: true,
    };
  },
  created() {
    // 页面创建时获取时间
    this.date1 = this.$moment();
    this.date2 = this.$moment().subtract(1, "days");
    this.date3 = this.$moment().subtract(2, "days");
    this.date4 = this.$moment().subtract(3, "days");
    this.date5 = this.$moment().subtract(4, "days");
    this.date6 = this.$moment().subtract(5, "days");

    this.day1 = this.date1.get("day");
    this.day2 = this.date2.get("day");
    this.day3 = this.date3.get("day");
    this.day4 = this.date4.get("day");
    this.day5 = this.date5.get("day");
    this.day6 = this.date6.get("day");
  },
  methods: {
    // 更换日期
    timeClick(date) {
      this.time_choice = this.which;
      if (date === 7) {
        this.$store.commit("SET_DATE", "before");
      } else {
        this.$store.commit("SET_DATE", date.format("yyyy-MM-DD"));
      }
    },
    //更换种类id
    checkCategory() {
      this.$store.commit("SET_CATEGORYID", this.categoryId);
    },
    // 更换校区
    checkCampus(campus) {
      this.$store.commit("SET_CAMPUS", campus);
    },
    showCampus() {
      this.isShowCampus = !this.isShowCampus;
      this.isShowCategory = false;
      this.isShowDate = false;
      this.campusArrow = !this.campusArrow;
      this.categoryArrow = true;
      this.dateArrow = true;
      this.isCheckedCampus = !this.isCheckedCampus;
      this.isCheckedCategory = true;
      this.isCheckedDate = true;
    },
    notShowCampus() {
      this.isShowCampus = false;
      this.campusArrow = true;
      this.isCheckedCampus = true;
    },
    showCategory() {
      listCategories(0).then((res) => {
        this.categories = res.data.data;
      });
      this.isShowCategory = !this.isShowCategory;
      this.isShowCampus = false;
      this.isShowDate = false;
      this.categoryArrow = !this.categoryArrow;
      this.campusArrow = true;
      this.dateArrow = true;
      this.isCheckedCategory = !this.isCheckedCategory;
      this.isCheckedCampus = true;
      this.isCheckedDate = true;
    },
    notShowCategory() {
      this.isShowCategory = false;
      this.categoryArrow = true;
      this.isCheckedCategory = true;
    },
    showDate() {
      this.isShowDate = !this.isShowDate;
      this.isShowCampus = false;
      this.isShowCategory = false;
      this.dateArrow = !this.dateArrow;
      this.campusArrow = true;
      this.categoryArrow = true;
      this.isCheckedDate = !this.isCheckedDate;
      this.isCheckedCampus = true;
      this.isCheckedCategory = true;
    },
    notShowDate() {
      this.isShowDate = false;
      this.dateArrow = true;
      this.isCheckedDate = true;
    },
    // 点击后颜色改变
    checkBei() {
      this.checkCampus(0);
      this.checkedBei = !this.checkedBei;
      this.checkedWei = true;
    },
    checkWei() {
      this.checkCampus(1);
      this.checkedWei = !this.checkedWei;
      this.checkedBei = true;
    },
  },
};
</script>

<style scoped lang="css">
body {
  margin: 0px;
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
}
#total {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  z-index: 10;
}
.content {
  padding: 0px;
  box-sizing: border-box;
  display: flex;
  height: 49px;
  width: 100%;
  background-color: #ffffff;
  justify-content: space-around;
}

.top {
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
.box0 {
  background-color: rgb(248, 248, 248);
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: center;
}
.zi {
  height: 100%;
  width: 70%;
  font-display: row;
  font-size: 1.2rem;
  color: #6c6c6d;
  margin-top: 8px;
  margin-left: 35px;
  font-family: SourceHanSansCN-Bold;
  font-weight: Bold;
}
.tu {
  height: 100%;
  width: 30%;
}
.tu1 {
  width: 30%;
  width: 40px;
  height: 10px;
}
.reversedTriangle {
  height: 10px;
  width: 15px;
  margin-top: 8px;
  background: url("../assets/daosanjiao.png");
  background-size: 100% 100%;
}
.triangle {
  height: 10px;
  width: 15px;
  margin-top: 8px;
  background: url("../assets/zhengsanjiao.png");
  background-size: 100% 100%;
}
.mask {
  /* height: 85%; */
  top: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0px;
  z-index: 9;
}
.menu1 {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: rgb(248, 248, 248);
  justify-content: space-around;
  border-radius: 0px 0px 15px 15px;
  z-index: 10;
}

.backgroud-white {
  margin-top: 8px;
  border-color: #589788;
  border-width: 2px;
  border-style: solid;
  border-radius: 25px;
  justify-content: center;
  height: 30px;
  width: 90px;
}
/* 点击后背景颜色改变 */
.backgroud-green {
  margin-top: 8px;
  border-color: #589788;
  border-width: 2px;
  border-style: solid;
  border-radius: 25px;
  justify-content: center;
  background-color: #589788;
  height: 30px;
  width: 90px;
}

.zidanyi {
  margin-top: 8px;
  justify-content: center;
  height: 30px;
  width: 90px;
}
.word-green {
  font-weight: Bold;
  font-size: 1rem;
  color: #589788;
  margin-top: 3px;
  margin-left: 20px;
}
/* 点击后颜色改变 */
.word-white {
  font-weight: Bold;
  font-size: 1rem;
  color: white;
  margin-top: 3px;
  margin-left: 20px;
}
/* 类别 */
.menu2 {
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 0px 0px 20px 20px;
  background: rgb(248, 248, 248);
  z-index: 12;
}
.box1 {
  padding: 0px;
  display: flex;
  margin: 0px;
  height: 17.5vh;
  flex-direction: row;
  justify-content: space-evenly;
  justify-content: space-around;
}
.zi3 {
  font-weight: Bold;
  font-size: 0.9rem;
  color: #589788;
  margin-top: 5px;
  margin-left: 16px;
}
.el-radio-button{
  margin:10px;
  border:5px;
  font-weight: Bold;
  font-size: 0.9rem;
  color: #589788;
}
/* menu3时间 */
#l_menu3 {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 5vw;
}
#l_menu3 > div:nth-child(1) {
  height: 30%;
  font-family: SourceHanSansCN-Bold;
  font-weight: Bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#l_menu3 > div:nth-child(2) {
  height: 60%;
  display: flex;
}
#l_menu3 > div:nth-child(2) > div {
  width: calc(100% / 7);
  height: 100%;
  box-sizing: border-box;
}
#l_menu3 > div:nth-child(2) > div.first_time {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(100vw / 14);
  /* background-color: rgb(88,151,136); */
}
#l_menu3 > div:nth-child(2) > div.first_time > span {
  width: 18px;
  font-size: 18px;
  /* color: white; */
}
#l_menu3 > div:nth-child(2) > div.other_time > div {
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
.zi30 {
  font-weight: Bold;
  font-size: 0.9rem;
  color: white;
  margin-top: 5px;
  margin-left: 16px;
}
</style>