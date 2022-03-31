<template>
  <body>
    <Top />
    <!-- 帖子 -->
    <div class="list" v-show="isList">
    <!-- 
      <div class="infinite-list-wrapper" style="overflow: auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li
            v-for="post in posts"
            :key="post.index"
            @click="toSample1(post.id)"
            class="infinite-list-item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="104"
              height="115"
              viewBox="0 0 104 115"
            >
              <image
                id="北_拷贝"
                data-name="北 拷贝"
                width="104"
                height="115"
                xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABzCAYAAAB0DUf5AAAKF0lEQVR4nO2dXWwdxRXHz95c+yZ2bDl1kkKg1EkVoIWmQQk8xGkbKKiEQCFO2koIqQUeyEP7BvSx6mMr9aWtmodKiQRqVaU4rhG0gVaNQfmAhKZpqEnAVHFTxTROTOIYO/7eam68Zu/4nJkz+3F37r3zl1a7M3d3du753TNzdmbs9fL5PKQkL62CLZWfRrWi0qk143PEsYkxRBNAnAo4cNdFgfAY55SIA4gyugP2qWRjY9+bOkcJSgXIBEwciNWssPEpIEpQFCAOBI/5WS2I4w3BZypQC67HAOngYMccQNUGzaTD9xEwGJAFeaZ9kAyE2svXVaPk74dBkOVLEFCvUQGiPEG1x7yolkBhxvYQGNS18jklaU6QgO3DedSxXE61KmxcX9rroGhBhgFxOn1P2uQ8FVisvEoTZsQwFNngVFOm85z5Y10fhHkItVHnVzoUSrLBfek4DIkCq43+VFGcbFzVliPOk8uUjytRWJMGEowgf1bz/bR9Vj50AiYdFCwtg6LAVBoo+VdOwQnSs3M28UNpbtkQwKKiOKrfkGHIe6qPosqsZMkBgexB3hyUMKwwJOoZyCiKw4wdhqQDRIXh1QaI2kBq7sJ9DvYctUDcB1Vy2/nL3w3F/67Vq5d++Hir5sdqPFiq6ujlZi2HXO9UqsBGfqiZk0PqsEqAcQyMwcoheU5q++WQPK395IuwwuU95WFOakAmwdN8nkkTRQUMTjy7YTbUigKkGxFwHsSXrk+Xj0uU0xhZBcYB4klnN6X9ZQ/SGb3aHz7TkInNFtg/ahSHFubEM3rUKI4rByW6jG2nAqQLu50H8cQZ8iLt6EYCLJdr4sqrRJs4WQ5Mcor9oKqTg2WuSDZzfZDlcoAslwNkuVL787ok9fC6tWhpr5zqQ/NNz7dZFQHoO3ffgeZTBjc932a5Js5yOUCWywGyXA6Q5XKALJcDJKmxUFfcbJEDFFLb8hb4yaNb4Mn29dbUyQGa0723t8GPHmyHlU2NcM/qm6yBVBEPqmlLwBCAwhLp/qErcPBMf6Z1ywSQGIqhnvbLKdGkPdW+vrjHJMCNTkzBsbPnM6tjzXqQ+JFsW3erNiAQkHoHBougslDNARJAhNFFP6NT/6UrsOfwyczgQK0BCjp/Thi973ivFYOrNQXoB/fdrT2nd+Ai7D10EgZHRstSJ50yATQ6OVU0BFd3rFqRep0EkH3H38s0IMCUCSARupqEry88/VhqdRH9y6unPoCD7/dn2tdQqunnIPEj2fdOr5VgAtUkIAHm1VN91vQzKtUUING/iH6mEsAEqilAv/rbcQtqYSY3WGq5HCDL5QBZLgfIcjlAlssBslzWhtlixFmMPnOmBZKUmCcaHBmzZkzOKkABFDE4Wm4wYYlR796BNnjlnx8YDeqmISsABVDkdQFZaEVTY/Guoj5iE6MOx84OFOeHslAmgAJPaWttKe5tWoe2srmxNN3UWGz2agYQtoLGdomp76xU9ihOTNYZnV/mqYDG+oXebFrnJFV2QD3MiTrR9u89fBKe/cPrqdcpLGwJ1uDV7Ea/y97ECcOL+RiqmRPhrfg8i+iJWh93McPpiUyCBAEhDCiYdhbRUppzNaLDV5V/J7H2QTwXZaVMAAnvEB2vaNsDj0lSomzMG8TzDfUA2lCoJ//4OMsgIbPnoJ8eOJxaACC8BAMk8qhmjJKAk+UMbGZjcWlGZ0n+4sVqnywVFVAqb91NSkktoQoCmoQUyWYmgKyGEpaAE7cJFdemuIaBbcuqXTQimrkfd/fAltvbYPXyFvbqVHFdMXCxZCFjFEBl96So42DXl/NmM4ZGKNV3eWemSvwXLklJ1QepXqgHofflOKkl20ln1xJxgwQHJr44oBZIBqR7DSX1mROtWDbNISepKGOvBXNSC3sBIdveVBNHkcVeRemkF8d2qD05QQLVdjpIPFHeo/KqeeWkC2Rx33ToREtnN6U3caI4rM3kvLzV6bpmFWC0P3AMEHYh1tE5D+KJazvUnro+iCp4frtw5t0tk2Ojv/Z9/39l/NJWy/f9oalrY3uGzvZtZbwEV/lD9/L54mgP522P2DtU57fC0qb85l3Pf3Xpyht31C1esg08r5G6aZVSGZ+enHht9NKFl469uLtn+Py5ibnmLbz50rEKXHEvAwIFJOz93djronMrb7uzYf3O721t+Mzyjnx94WtVPGo+OzM1eWTs8tD+0we6/nTu+KFhBAIGyCcggdxPBYDAwIswSBRA77YHHlmxZvP9jy5pbunI5eu+Uj7bpafZmenT48NXus79/cj+f738+48Iw2Meo/KcBd4DoSYOmF4kAyLBIMfexid2rb3hi+u2F5Y2dXi5RTdXEhR/dvajiU+udl/68EznW3t/cRqJZuVjDAq3aQMTQGAAiZVeVFefa3/m2Xtabm7rqGtofMjzPLOVHGWS7/sj0+PXDgyfP9d55Dc/Pzo5NjqjAKOCpYIDXEAqSFxQnPySbdnnv1DY8N2nviGCi3x94V7wvPqMqUxPT070jF4a3H+y84W/XOx775qmWTIBRkVxgMEBJiBgQNL1V0CALClvzeb7l91637aHl7Qs61hUV7+xnC+SmpmaPHFt+PIf//3Ga919PQeG5rKjQtFtIMGBKIDktAoSlhdng7u+/f1bVq3buKPQ1Lw9tyi/Ji4ATLMzM/0TI8NdA++e6PrHvj1nIxjaBATlOSAdgwoQRIAEEYFxzilu7c88d1fr6rXb65Y0fMvL5VrjQPF9/+OpsdGXP/7Ph92Hdv/snZjGjgKEDQcIQMCABAxYkDS45htuym98YtfXmz67qqOusPib4HmLSRIlX9kfn5oY/+snFwb2H3tx98GRCwNTZQah7WuINAkIDCBRe8zYujQXFnxuw6bmLz20Y2vDslbRX21Chq3EQ+TRsctDne+/3v3n/rffvCoZKw4QVRoYe+DAAQ0g0ECCCKCwPK6HyZ/Nl/nlxx6/8ZYNm7YXmpp3ivTEyNXO/5442nWq67cD0pfngsE+AwUEEzCc9KcG1gACBAqWRwECA0hgCoa4X1gqg+lAgSEc6j5YfXR58+KMkQUFeIo8rCLy+R6yBwYIFUy5Xqr6q4zO/Yyzp+xB1Uspk0FMFSgIAVBdj0HyQ4b3NUB0norVF5iQdMfYnsrD0rp8VHGW/lIGobyKKouCFJSlah6xelD1BQSASZ58DVY+ltblKxVnGkD2Hiqfcm8MsAxJhoXt5ftTdTRpqjKFElZS8zRJwlI1hZAgICyP05RRaV1+JKUxkZZEE6iCI+dh95LvKadNwanK1OXHUpoznVyvAskgVNMHCm/SGYfyBM6xqvxUoIRVrqnoKLDilKsqx3ooYWWxViBOfwWEl8nXc+7NSZuUnYqyXswRFRYFiXuvOPlllU2rbXTBhfxZHAPqAhRrZONyqCj9iny+qZGtghKW7evVZMOZjBokcV62AoD/AzHQ8NmoaPqqAAAAAElFTkSuQmCC"
              />
            </svg>
            <div class="box">
              <div class="tu">
                <img :src="post.images" />
              </div>

              <div class="wen">
                <div class="label">
                  <div class="label1">#{{ post.categoryName }}</div>
                  <div class="label1" v-for="t in post.tag" :key="t.index">
                    #{{ t }}
                  </div>
                </div>
                <div class="box1">
                  <div class="time1">拾获时间: {{ post.created | format }}</div>
                  <div class="more"></div>
                </div>
                <div class="place">拾获地点: {{ post.findLocation }}</div>
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
        <p v-if="noMore">没有更多了</p>
      </div> -->

      <div
        class="box0"
        v-for="post in posts"
        :key="post.index"
        @click="toSample1(post.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="104"
          height="115"
          viewBox="0 0 104 115"
        >
          <image
            id="北_拷贝"
            data-name="北 拷贝"
            width="104"
            height="115"
            xlink:href="data:img/png;base64,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"
          />
        </svg>
        <div class="box">
          <div class="tu">
            <img :src="post.images" />
          </div>

          <div class="wen">
            <div class="label">
              <div class="label1">#{{ post.categoryName }}</div>
              <div class="label1" v-for="t in post.tag" :key="t.index">
                #{{ t }}
              </div>
            </div>
            <div class="box1">
              <div class="time1">拾获时间: {{ post.created | format }}</div>
              <div class="more"></div>
            </div>
            <div class="place">拾获地点: {{ post.findLocation }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页面找不到 -->
    <div class="page2" v-show="isPage2">
      <div class="page2-img"></div>
      <div class="page2-item1">很遗憾没有找到相关物品，</div>
      <div class="page2-item2">
        <div class="item2-word">建议更换关键词或发布</div>
        <div class="item2-button" @click="toXunwutie">寻物帖</div>
      </div>
    </div>

    <!-- 外部连接 -->
    <div class="page3" v-show="isPage3">
      <div class="page3-img"></div>
      <div class="page3-button">刷新重试</div>
    </div>

    <Bottom />
    <!-- 发布成功 -->
    <div class="success" v-show="isShow9">
      <div class="success-box">
        <div class="success-img"></div>
        <div class="success-item1">发布成功</div>
      </div>
      <div class="success-item2">感谢您的善意!</div>
    </div>
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
      loading: false,
      currentPage: 1,
      isList: true,
      // 发布成功
      isShow9: false,
      // 页面找不到
      isPage2: false,
      // 外部连接
      isPage3: false,
      posts: [
        {
          id: Number,
          campus: Number,
          categoryName: String,
          created: String,
          findLocation: String,
          image: String,
          tags: String,
          tag: Array,
        },
      ],
    };
  },
  computed: {
    noMore() {
      return this.currentPage >= this.pages;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  created() {
    if (
      this.$store.state.campus == "" &&
      this.$store.state.categoryId == "" &&
      this.$store.state.date == ""
    ) {
      getPosts(this.currentPage).then((res) => {
        let pageInfo = res.data.data;
        this.posts=pageInfo.records
        console.log(pageInfo);
        this.currentPage = pageInfo.current;
        this.loading = false;
      });
    }
    if (this.$store.state.campus === "0" || this.$store.state.campus === "1") {
      this.getPostByCampus(this.$store.state.campus);
    }
    if (this.$store.state.categoryId) {
      this.getPostByCategory(this.$store.state.categoryId);
    }
    if (this.$store.state.date) {
      this.getPostByDate();
    }
  },
  methods: {
    load() {
      getPosts(this.currentPage + 1)
        .then((res) => {
          let pageInfo = res.data;
          console.log(pageInfo);
          pageInfo.data.records.forEach(function (item) {
            this.posts.push(item);
          });
          for (let i = 0; i < this.posts.length; i++) {
            var temp = this.posts[i].tags + "";
            this.posts[i].tag = temp.split(" ");
          }
          this.currentPage = pageInfo.current;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("系统错误");
        })
        .finally(() => {});
    },
    toSample1: function (id) {
      this.$router.push(`/Sample1/${id}`);
    },
    toSample2: function () {
      this.$router.push("/Sample2");
    },
    toXunwutie: function () {
      this.$router.push("/Xunwutie");
    },
    getPostByCampus(campus) {
      getPostByCampus(campus).then((res) => {
        this.posts = res.data.data;

        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
      });
    },
    getPostByCategory(categoryId) {
      getPostByCategory(categoryId).then((res) => {
        this.posts = res.data.data;

        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
      });
    },
    getPostByDate(date) {
      getPostByDate(date).then((res) => {
        this.posts = res.data.data;

        for (let i = 0; i < this.posts.length; i++) {
          var temp = this.posts[i].tags + "";
          this.posts[i].tag = temp.split(" ");
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.infinite-list-wrapper {
  width: 100%;
  height: 300px;
  border: 1px solid rebeccapurple;
}
.list {
  width: 100%;
}
.list li {
  height: 30px;
  margin: 5px 0;
  background: #8c939d;
  list-style: decimal;
}
.infinite-list-wrapper p {
  text-align: center;
}
body {
  margin: 0px;
  background-color: rgb(244, 244, 244, 244);
  height: 100%;
  width: 100%;
}
.list {
  height: 100vh;
  padding: 0 6%;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box0 {
  height: 18vh;
  width: 100%;
  margin-bottom: 20px;
}
.box {
  padding: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -39px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(200 200 200);
}
.box1 {
  display: flex;
  flex-direction: row;
}
.more {
  background: url("../assets/more.png");
  background-size: 100% 100%;
  width: 15px;
  height: 20px;
  position: absolute;
  top: 55px;
  right: 20px;
}
svg {
  position: relative;
  margin-left: 15px;
  width: 40px;
  height: 40px;
  z-index: 4;
}
.tu {
  width: 100px;
  background-color: rgb(244, 244, 244, 244);
  border-radius: 10px;
  overflow: hidden;
}
.tu > img {
  height: 100%;
  width: 100%;
}
.wen {
  width: auto;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
}
.label {
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
}
.label1 {
  width: auto;
  border-radius: 20px;
  background-color: #5897aa;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  flex-wrap: wrap;
  margin-right: 5px;
  box-sizing: border-box;
  padding: 4px 10px;
}
.label2 {
  width: auto;
  border-radius: 20px;
  background-color: #589788;
  font-weight: medium;
  font-size: 0.7rem;
  color: #f6f4f4;
  flex-wrap: wrap;
  margin-right: 5px;
  box-sizing: border-box;
  padding: 4px 10px;
}
.time1 {
  height: 20%;
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
.place {
  height: 20%;
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
/* 发布成功 */
.success {
  position: fixed;
  top: 42%;
  left: 23%;
  z-index: 15;
  height: 100px;
  width: 200px;
  background-color: #17a697;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.success-box {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.success-img {
  margin-top: 27px;
  margin-left: 50px;
  height: 15px;
  width: 15px;
  background: url("../assets/fabuchenggong.png");
  background-size: 100% 100%;
}
.success-item1 {
  color: #fefefe;
  margin-top: 22px;
  margin-left: 6px;
  font-size: 1.1rem;
  font-weight: medium;
}
.success-item2 {
  margin-left: 56px;
  color: #fefefe;
  font-size: 0.85rem;
}
/* 页面找不到 */
.page2 {
  height: 100vh;
  padding: 0 6%;
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page2-img {
  height: 200px;
  width: 200px;
  background: url("../assets/yemianzhaobudao.png");
  background-size: 100% 100%;
}
.page2-item1 {
  font-size: 0.9rem;
  font-weight: bold;
  color: #6c6c6c;
}
.page2-item2 {
  display: flex;
}
.item2-word {
  font-size: 0.9rem;
  font-weight: bold;
  color: #6c6c6c;
  padding-top: 20px;
}
.item2-button {
  margin: 15px 6px;
  padding: 6px 10px;
  border: 1.5px #589788 solid;
  border-radius: 55px;
  color: #589788;
  font-weight: bold;
  font-size: 0.9rem;
}
.page3 {
  height: 100vh;
  padding: 0 6%;
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page3-img {
  height: 200px;
  width: 200px;
  background: url("../assets/waibulianjie.png");
  background-size: 100% 100%;
}
.page3-button {
  margin: 15px;
  padding: 10px 20px;
  background-color: #589788;
  color: #fefefe;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 55px;
}
</style>