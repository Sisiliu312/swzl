<template>
  <body>
    <Top />

    <div class="post-list">
      <div class="infinite-list-wrapper" style="overflow: auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li v-for="post in posts" :key="post.index" class="list-item">
            <div class="box" @click="toPostDetail(post.id)">
              <!-- 左边的图片 -->
              <div class="png">
                <!-- 物品图 -->
                <div class="picture">
                  <img :src="post.images" style="height: 120px; width: 120px" />
                </div>
                <!-- 校区图 -->
                <svg
                  v-if="post.campus === 0"
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="50"
                  height="50"
                  viewBox="0 0 104 115"
                >
                  <image
                    id="北_拷贝"
                    data-name="北 拷贝"
                    width="50"
                    height="50"
                    xlink:href="data:img/png;base64,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"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="50"
                  height="50"
                  viewBox="0 0 104 115"
                >
                  <image
                    id="卫"
                    width="50"
                    height="50"
                    xlink:href="data:img/png;base64,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"
                  />
                </svg>
              </div>
              <!-- 右边的文字 -->
              <div class="content">
                <!-- 标签 -->
                <div class="tag">
                  <div class="category-name">#{{ post.categoryName }}</div>
                  <div class="tag-name" v-for="t in post.tag" :key="t.index">
                    #{{ t }}
                  </div>
                </div>
                <!-- 拾获时间和地点 -->
                <div class="find-time">
                  拾获时间: {{ post.created | format }}
                </div>
                <div class="find-place">拾获地点: {{ post.findLocation }}</div>
              </div>
            </div>
          </li>
        </ul>
        <el-row
          style="height: 50px"
          v-if="loading"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
        ></el-row>
        <p v-if="noMore">没有更多啦</p>
      </div>
    </div>

    <Bottom />
  </body>
</template>

<script>
import Top from "../components/Top.vue";
import Bottom from "../components/Bottom.vue";
import {
  getPosts,
  getPostByCampus,
  getPostByCategory,
  getPostByDate,
} from "@/api/post";
export default {
  name: "home",
  components: {
    Top,
    Bottom,
  },
  data() {
    return {
      posts: [
        // {
        //   id: Number,
        //   campus: Number,
        //   categoryName: String,
        //   created: String,
        //   findLocation: String,
        //   image: String,
        //   tags: String,
        //   tag: Array,
        // },
      ],
      loading: false,
      newsList: [],
      pages: 1,
      currentPage: 1,
    };
  },
  computed: {
    noMore() {
      return this.currentPage >= this.pages;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    // store里的状态
    campus() {
      return this.$store.state.campus;
    },
    date() {
      return this.$store.state.date;
    },
    categoryId() {
      return this.$store.state.categoryId;
    },
  },
  watch: {
    // 监听所选校区 种类 日期有无变化
    campus() {
      this.pages= 1,
      this.currentPage = 1;
      this.posts = [];
      this.getPostByCampus(this.$store.state.campus, this.currentPage);
    },
    categoryId() {
      this.pages= 1,
      this.currentPage = 1;
      this.posts = [];
      this.getPostByCategory(this.$store.state.categoryId, this.currentPage);
    },
    date() {
      this.pages= 1,
      this.currentPage = 1;
      this.posts = [];
      this.getPostByDate(this.$store.state.date, this.currentPage);
    },
  },
  created() {
    this.getPosts(this.currentPage);
  },
  methods: {
    // 触发加载
    load() {
      this.loading = true;
      setTimeout(() => {
        if(this.$store.state.campus!=''){
            this.getPostByCampus(this.$store.state.campus, this.currentPage+1);
        }
        if(this.$store.state.categoryId!=''){
          this.getPostByCategory(this.$store.state.categoryId, this.currentPage+1);
        }
        if(this.$store.state.date!=''){
          this.getPostByDate(this.$store.state.date, this.currentPage+1);
        }
        if(this.$store.state.campus==''&&this.$store.state.categoryId==''&&this.$store.state.date==''){
          this.getPosts(this.currentPage + 1);
        }
        this.loading = false;
      }, 1000);
    },
    // 获取所有帖子
    getPosts(pages) {
      getPosts(pages)
        .then((res) => {
          let pageInfo = res.data.data;
          console.log(pageInfo)
          pageInfo.records.forEach((item) => {
            this.posts.push(item);
          });
          for (let i = 0; i < this.posts.length; i++) {
            var temp = this.posts[i].tags + "";
            this.posts[i].tag = temp.split(" ");
          }
          this.currentPage = pageInfo.current;
          this.pages = pageInfo.pages;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 前往帖子的详情页面
    toPostDetail(id) {
      this.$router.push(`/PostDetail/${id}`);
    },
    // 根据校区 种类 时间 查询帖子
    getPostByCampus(campus, currentPage) {
      getPostByCampus(campus, currentPage).then((res) => {
        let pageInfo = res.data.data;
        pageInfo.records.forEach((item) => {
          this.posts.push(item);
        });
        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
        this.currentPage = pageInfo.current;
        this.pages = pageInfo.pages;
        this.loading = false;
      });
    },
    getPostByCategory(categoryId, currentPage) {
      getPostByCategory(categoryId, currentPage).then((res) => {
        let pageInfo = res.data.data;
        pageInfo.records.forEach((item) => {
          this.posts.push(item);
        });
        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
        this.currentPage = pageInfo.current;
        this.pages = pageInfo.pages;
        this.loading = false;
      });
    },
    getPostByDate(date, currentPage) {
      getPostByDate(date, currentPage).then((res) => {
        let pageInfo = res.data.data;
        pageInfo.records.forEach((item) => {
          this.posts.push(item);
        });
        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
        this.currentPage = pageInfo.current;
        this.pages = pageInfo.pages;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="css" scoped>
body {
  margin: 0px;
  background-color: rgb(244, 244, 244, 244);
  height: 100%;
  width: 100%;
}
/* 页面中心 */
.post-list {
  margin: 0;
  height: 100vh;
  padding: 0 6%;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(224, 245, 246);
}
/* 滚动加载组件 */
.infinite-list-wrapper {
  margin-top: 0px;
  width: 100%;
  height: 800px;
  background-color: pink;
}
.list {
  margin: 0%;
  width: 100%;
  padding: 0px;
  padding-top: 20px;
}
.list li {
  height: 100px;
  margin: 50px 0;
  background: #8c939d;
  list-style-type: none;
}
.infinite-list-wrapper p {
  margin-bottom: 70px;
  text-align: center;
}
/* 每一个帖子盒子 */
.list li .box {
  height: 18vh;
  width: 100%;
  display: flex;
  background-color: rgb(255, 255, 255);
}
/* 标签样式 */
.content .tag {
  display: flex;
}
.content .tag .tag-name {
  width: 100px;
  margin: 10px;
  border-radius: 20px;
  background-color: #5897aa;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  box-sizing: border-box;
  padding: 4px 10px;
}
.content .tag .category-name {
  width: 100px;
  margin: 10px;
  border-radius: 20px;
  background-color: #5897aa;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  box-sizing: border-box;
  padding: 4px 10px;
}
</style>