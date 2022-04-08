<template>
  <body>
    <!-- header -->
    <div class="top1">
      <div class="retrun" @click="toGerenzhongxin"></div>
      <div class="top1-box">我的发布</div>
    </div>

    <!-- 选择帖子种类 -->
    <div class="item2">
      <div
        v-bind:class="isSelectedPost ? 'selected' : 'notSelected'"
        @click="selectedPost"
      >
        招领帖
      </div>
      <div
        v-bind:class="isSelectedAsk ? 'selected' : 'notSelected'"
        @click="selectedAsk"
      >
        寻物帖
      </div>
    </div>

    <!-- 招领帖 -->
    <div class="list" v-show="myPost">
      <div class="box0" v-show="box01" v-for="post in posts" :key="post.index">
        <!-- 北洋园或者卫津路的图 -->
        <svg
          v-if="post.campus === 0"
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
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="104"
          height="115"
          viewBox="0 0 104 115"
        >
          <image
            id="卫"
            width="104"
            height="115"
            xlink:href="data:img/png;base64,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"
          />
        </svg>

        <div class="box">
          <div class="tu">
            <img :src="post.images" style="width: 100px; height: 100px" />
          </div>
          <div class="wen">
            <div class="label">
              <div class="label1">#{{ post.categoryName }}</div>
              <div
                class="label1"
                v-for="t in post.tags.split(' ')"
                :key="t.index"
              >
                {{ t }}
              </div>
            </div>
            <div class="box1">
              <div class="time1">拾获时间: {{ post.created | format }}</div>
              <div class="more" @click="goPostDetail(post.id)"></div>
            </div>
            <div class="place">拾获地点: {{ post.findLocation }}</div>
            <div class="delete" @click="deletePost(post.id)">删除</div>
          </div>
          <!-- <div class="new" v-show="xin1">new!</div> -->
        </div>
      </div>
    </div>

    <!-- 寻物帖 -->
    <div class="list" v-show="myAsk">
      <div class="box00" v-show="box001" v-for="ask in asks" :key="ask.index">
        <svg
          v-if="ask.campus === 0"
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
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="104"
          height="115"
          viewBox="0 0 104 115"
        >
          <image
            id="卫"
            width="104"
            height="115"
            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABzCAYAAAB0DUf5AAAIpUlEQVR4nO2dS3AURRiAeya7WfIEDG8BBQsQH0GKx0EQBYuiAigmwfKCevCAFy9evHj0wsWLVXqw1CooD1B5CCUS0SqjWESJIhWhQMEKRAlEEqh1yXOTHWtDNsx2/r/775md3d5Nf1VTM9M70zP7f/t398xuMlYoFGIBYQVVsaY4QZyWVzvTLfgUKDFRlqgiiHICRtw9MBEWYZs0KIKwoBth9+GDDb1vbBuhKJEgFTF+JBYy7uBjQoSiMEEUCRbxtekAJRtSr4lETdkfEiSTAy1TBBWaNJUO3wHEQEKmlKn2QbwQbM7vV4jw7w+SwONwEsCsEQnCMkE0h7JoOomCgm0BMrB9+W3S1imDBGjuLsOW+XoKFXdwHW4ukyIV6RZE6fQtbuLLRGKh+vINKIhuKXzAsaZMljmTy7I+CMoQbMK2z3cpGHzAHW7ZLQkTKx39iUZxfHBFk41sx9fJL+cjUJPGOBmp8oTk/Un7rJBrAwiZFGidF4WJyTdR/Kcck5NaT0zExHGtU+tmKVnYKA7rN3gZ/Bzro7A68xl+QMBnkDUhxS3LLQm7BlIaxUHBdkuSCcKG4YUmCJsY19y5+xzoOmoK1AtVdNr7wXt9/t9r4dLw1rtVkg+r8s1SUUfPN2s2sL8hnVSMHFczxw+p3aQJowQYkmUDZQZx/GygTBo/fieocn6OZZhBLEhl8DRZptJEYQMGAy1uUAylYIJkdwRMBtGR9en8chq2JMgiMUYQDVnchPHnM0gW9EK/+AwClZhNib/XURxYmYEWdK+jOCpGineUYycSJBt2mwyiQbnlhcbR3AnQHNPEZZeMNnE8Rkzm8H2hKsPIUsdTzEwfpDlGkOYE9tdbKrxTs5c9vmipdpF67ZP3c34OJoM0xwjSHCNIc4wgzdFikNDZ26O8T1lxhD08Zz742oXuLqW6dBygpNBC0JH2U8r7JIOaHP1BHDjRoFTXwTfeVj5+tjBNnOYYQZpjBGmOEaQ5RpDmGEGaYwRpjhGkOUaQ5hhBmmMEaY4RpDla3CwNkuQd7ycEd6uxO+K6UPCCbsWibFf1BlYWmaG037+xaGDnpELBN3H9w0PseEe78n4Xrl8L5HxUmRZ90JnOP5W29yo1CKaFoGRzRZWU3PZAS6M2TVzB90Eprvb2sI3LVk4pT309nmzSznd3jW+nE9NG0Jcd7eNTvmGugzTHCNIcI0hzjCDNMYI0xwjSHCNIc4wgzcnZherWR6vBK3sqyR/PY2C/2fbD4fZTObnLkDNByQAH9VcFQdQr+kAEiWniNMcI0hwjSHOMIM3J2SAhX2//ZxuvGRTIU3cLHE8xUxFkpGQOcixNH6Q5XgSZTPKOcuxMBmmOSJDogXrM9bwcgxg+TrK4pkHNICPGPxRRU+AFyR5Dib1mwPEVUxvYSGQZeiyYQQz0AEJyvLEmDjMLPYrSIIcSOzCelEEC1nYaSTSw7BFl1SQ2twMP9UmHBhxZ3ITZRBnFQW0m5eGthnskBGKkH3BIELQj1NGZDKJBjR0YT1kfhFU8OfVcuvLcyMDgh47j3Mzim9Yax3H64oNDn/Z1dtUQHoIr/KBbodD4V0KUpz1Cz1CdnCLlpaHNb77+TPm8qvrwjMguZlll08zK0OjIyNf9vXcazhxqaI1evzk80by5J4dbFokbn/OCmEAS9Pxu6HHR9rxVj5Q+tXd3TekDM+tCxcVbCvjvkBJj8fjpgTvRpostrV91tZ+LAhIgQQ4iifH9VEoQU8giSBIm0Fq1fcvc5Zs37CmprKizQ6E12YtdcCTGxi4ORWPNXb92NJ0/dvIGEngoY0SZMyV7mKuJY8Qs4gWhYoBla/2+uhULVq+ojZSX1Vm2vTifpDiJxI3huwNHe690Nv702eGLwGiWX4akUJs2piKIKUgirReFw/am/fs2zlq8sC5cWrLTsqxZgUfYA47jxEaHhlui1282nv7487aRgcExgRiRLJEcRhXEBJKooijladPshx6MrHtlz/Pl8+bUh4rDW5llFefYyujoSLy1v/d207nG49/cutw5KGmWVIRhozgGyWFEQYwgSdZfMURkWn3LN2+cvXLbpt0lsyrrisLh9dl8kNRYPH52MBr74q/v245ebm3rmyj2KkU2MU4O8yKIXxdJgsr8TGztyy8sXVS9uj5SUVZrFxUt9ysAIjE2dnU41t/c/ful5t+OHOv0EGgVEVjmMG6ZiQQxD5KYR2GUbcanTftfXVu1bEltuGTGi5ZtV/mR4jjO7fjA4LHb1/45+uNHB3/xGWwvQshyGCKIESQxgiyWaXGVC+aG1u+rf7Zi/ty6cKR4B7Ms2n9Icpyh+PDIt3d7epvOHGr4LtZzK55lEdK+BllHBTEFSdgcCrZsnSqLLVlXXfnYzm01pbNnJvurp4HbVsmLyLaBO9HGP07+cOLqz2f/44LlR4honRHmjCKHSQQxiSTmQRRURs0w/rXJOp98acfCpevW1EYqysb/cms41t/499mO5o7mlm7uzVPFQK8xgQQVMZT1+wGWCGKAFKgME8QUJDFVMcjx3IgCJhPFFOVgx4HOR1Y2CeUeWaoCS1AGnQi/vQXMGUGESCZ/XqLzFwWd+hpljsUDOy8hKjcxRaKYS4Bof0iS4wq8IxEiy1TofBlRkmwZmmNl0LqsHMTLXWZIFFROORGRpFRdouYROg/sfBkgQKWM3weqH1qXlQvx8zUAnz1YOZbekGBeEi8LmvPHx85RpanKqRQ3mfqeJpOyRE0hy6AgqIzSlGHrsnJPBPFFWiaaQJEcvgw6Fn9Mfl1VnKhOWbkvgvymk5pVjAsI1vQxQTbJgoNlAmVZVH8gUtxk66toL7L81CuqR3spbnLxWwE//RVDsozfn3JsyrpK3YGQ6x9zeJWFSaIey095VtHp1zaywQX/mp8AygYo2qDjz6G89Cv89qpB1kqKG91/r8YHTuWuQSa2yy2Msf8BPYwPzpQK9FQAAAAASUVORK5CYII="
          />
        </svg>
        <div v-bind:class="isBox01 ? 'box01' : 'box02'">
          <div v-bind:class="isTu1 ? 'tu' : 'tuchange'">
            <div class="tu01">
              <img src="" />
            </div>
          </div>
          <div class="wen1">
            <div class="label3">{{ ask.categoryName }}</div>
            <div class="detailsbox">
              <div class="details">{{ ask.tags }}</div>
            </div>
            <div class="time2">{{ ask.created }}</div>
          </div>
          <div class="sure" @click="deleteAsk(ask.id)" v-show="found1">
            删除
          </div>
          <div class="found1" v-show="sure1"></div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { getPostByUser, deletePost } from "@/api/post.js";
import { getAskByUser, deleteAsk } from "@/api/ask.js";
export default {
  name: "wodefabu",
  components: {},
  created() {
    getPostByUser(this.$store.state.userInfo.id).then((res) => {
      this.posts = res.data.data;
    });
    getAskByUser(this.$store.state.userInfo.id).then((res) => {
      this.asks = res.data.data;
    });
  },
  data() {
    return {
      posts: "",
      asks: "",
      xin1: true,
      xin2: false,
      isSelectedPost: false,
      isSelectedAsk: true,
      myPost: true,
      myAsk: false,
      box01: true,
      box02: true,
      found1: true,
      found2: true,
      sure1: false,
      sure2: false,
      isBox01: true,
      isBox02: true,
      isTu1: true,
      isTu2: true,
      chahao2: false,
      box001: true,
      box002: true,
    };
  },
  methods: {
    deletePost(id) {
      deletePost(id).then((res) => {
        if (res.data.state === 200) {
          this.$message({
            type: "success",
            message: `${res.data.msg}`,
          });
          location.reload();
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
    },
    toGerenzhongxin() {
      this.$router.push("/MyInfo");
    },
    selectedPost() {
      (this.isSelectedPost = false),
        (this.isSelectedAsk = true),
        (this.myPost = true),
        (this.myAsk = false);
    },
    selectedAsk() {
      (this.isSelectedAsk = false), (this.isSelectedPost = true);
      this.myPost = false;
      this.myAsk = true;
    },

    deleteAsk(id) {
      deleteAsk(id).then((res) => {
        if (res.data.state === 200) {
          this.$message({
            type: "success",
            message: `${res.data.msg}`,
          });
          location.reload();
        } else {
          this.$message({
            type: "error",
            message: `${res.data.msg}`,
          });
        }
      });
    },
    goPostDetail(id) {
      this.$router.push(`PostDetail/${id}`);
    },
  },
};
</script>

<style scoped lang="css">
body {
  background-color: rgb(244, 244, 244);
  height: auto;
  width: 100%;
  margin: 0px;
}
.top1 {
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
.top1-box {
  width: 50%;
  margin-right: 18%;
  margin-top: 10px;
  font-weight: Bold;
  font-size: 1.3rem;
  text-align: center;
  color: #589788;
  font-family: SourceHanSansCN-Bold;
}
.retrun {
  height: 15px;
  width: 8px;
  background: url("../assets/lvsejiantou.png");
  background-size: 100% 100%;
  margin-top: 20px;
}
.list {
  height: 100vh;
  padding: 0 6%;
  padding-top: 8px;
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
  height: 82%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -39px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(200 200 200);
}
.box01 {
  padding: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -39px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(200 200 200);
}
.box02 {
  padding: 12px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -39px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #eeeeee;
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
  width: 10px;
  height: 15px;
  margin-top: 18px;
  position: absolute;
  top: 40px;
  right: 5px;
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
  height: 100px;
  background-color: rgb(244, 244, 244, 244);
  border-radius: 10px;
}
.tuchange {
  width: 100px;
  background-color: #dcdcdc;
  border-radius: 10px;
}
.tu01 {
  /* background: url("../assets/beishouji.png"); */
  background-size: 100% 100%;
  margin: auto;
  margin-top: 13px;
  width: 50px;
  height: 50px;
}
.tu02 {
  background: url("../assets/weishenghuoyongpin.png");
  background-size: 100% 100%;
  margin: auto;
  margin-top: 13px;
  width: 50px;
  height: 50px;
}
.wen {
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
}
.wen1 {
  width: 140px;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  border-right: solid #e6e1e1 1px;
}
.label {
  height: auto;
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
  margin-right: 3px;
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
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
.place {
  padding-top: 10px;
  margin-left: 6px;
  font-size: 0.9rem;
  font-weight: medium;
  color: #6c6d6d;
}
.new {
  color: #d9534f;
  font-weight: bold;
  width: auto;
  height: 20px;
}
.item2 {
  height: 34px;
  width: 180px;
  margin: auto;
  margin-top: 63px;
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
}
.selected {
  width: 50%;
  margin-left: 3px;
  color: #6c6c6c;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 6.5px;
}
.notSelected {
  border-radius: 20px;
  padding-top: 6px;
  width: 55%;
  color: #fefefe;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #589788;
}
.box00 {
  height: 15vh;
  width: 100%;
  margin-bottom: 20px;
}
.delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 15px;
  border: #d9534f 1px solid;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #d9534f;
  font-weight: bold;
}
.label3 {
  margin: 3px;
  color: #6c6d6d;
  font-weight: bold;
}
.detailsbox {
  display: flex;
  flex: row;
}
.details {
  color: #6c6d6d;
  font-size: 0.9rem;
  margin: 3px;
}
.time2 {
  color: #6c6d6d;
  font-size: 0.9rem;
  position: absolute;
  bottom: 6px;
  left: 135px;
}
.found1 {
  background: url("../assets/beisure.png");
  background-size: 100% 100%;
  margin: auto;
  margin-top: 23px;
  width: 40px;
  height: 40px;
}
.found2 {
  background: url("../assets/weisure.png");
  background-size: 100% 100%;
  margin: auto;
  margin-top: 23px;
  width: 40px;
  height: 40px;
}
.sure {
  width: 39px;
  color: #589788;
  border: #589788 1px solid;
  font-size: 0.8rem;
  padding: 4px 6px;
  margin: auto;
  margin-left: 0px;
  margin-right: 0px;
  border-radius: 50px;
}
.chahao {
  height: 10px;
  width: 10px;
  background: url("../assets/xiaochahao.png");
  background-size: 100% 100%;
  position: absolute;
  top: 13px;
  right: 90px;
}
.mask {
  z-index: 4;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0px;
}
.deletebox {
  height: 30%;
  width: 70%;
  background-color: #edf3f2;
  position: absolute;
  top: 40%;
  left: 15%;
  z-index: 5;
  border-radius: 15px;
}
.delete-top {
  padding: 15px 80px;
  display: flex;
  flex-direction: row;
}
.top-word {
  margin-top: 2px;
  font-size: 1.1rem;
  color: #f0ad4e;
  font-weight: bold;
}
.delete-middle {
  text-align: center;
  padding-bottom: 8px;
  color: #4e4e4e;
}
.delete-bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.bottom-button1 {
  padding: 4px 8px;
  color: #4e4e4e;
  font-weight: bold;
  border: #4e4e4e 1px solid;
  border-radius: 15px;
  font-size: 0.9rem;
}
.bottom-button2 {
  padding: 4px 8px;
  color: #f0ad4e;
  font-weight: bold;
  border: #f2a12f 1px solid;
  border-radius: 15px;
  font-size: 0.9rem;
}
</style>