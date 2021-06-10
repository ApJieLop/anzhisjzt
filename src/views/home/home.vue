<template>
  <div class="pageContol listWrap templateList faceStudentstatistics">
    <div class="framePage">
      <!-- <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">数据统计</a>
          <i>></i>
          <a href="javascript:;" @click="$router.back()" class="cur-a"
            >人脸认证统计</a
          >
          <i>></i>
          <a href="javascript:;">人脸认证统计-作弊详情</a>
        </span>
      </div> -->
      <div class="framePage-body">
        <div class="framePage-scroll">
          <div class="ovy-a">
            <div class="home_1">
              <home_1 />
            </div>
            <div class="home_2">
              <div class="home_2_1">达哥威武牛逼《在这写组件》</div>
              <div class="home_2_2">达哥威武牛逼《在这写组件》</div>
            </div>
            <div class="home_3">
              <div class="home_3_1">达哥威武牛逼《在这写组件》</div>
              <div class="home_3_2">
                <div class="home_3_2_shell">达哥威武牛逼《在这写组件》</div>
                <div class="home_3_2_shell">达哥威武牛逼《在这写组件》</div>
              </div>
            </div>
            <div class="home_2" style="margin-left: 2%">
              <div class="home_2_1">达哥威武牛逼《在这写组件》</div>
              <div class="home_2_2">达哥威武牛逼《在这写组件》</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import home_1 from "../../components/home_1.vue";
export default {
  name: "operate/MechanismFaceStudentList",
  components: {
    home_1,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
.home_1 {
  height: 10%;
  width: 100%;
  // overflow: hidden;
  margin-bottom: 1%;
}
.home_2 {
  width: 24.2%;
  height: 88%;
  float: left;
  .home_2_1 {
    width: 100%;
    height: 48%;
    border-radius: 8px;
    border: 1px solid #0c6db5;
  }
  .home_2_2 {
    width: 100%;
    height: 48%;
    border-radius: 8px;
    margin-top: 6%;
    border: 1px solid #0c6db5;
  }
}
.home_3 {
  width: 46.6%;
  height: 88%;
  overflow: hidden;
  min-height: 500px;
  float: left;
  margin-left: 2%;
  .home_3_1 {
    width: 100%;
    height: 63%;
    border-radius: 8px;
    border: 1px solid #0c6db5;
  }
  .home_3_2 {
    width: 100%;
    height: 33%;
    margin-top: 3%;
    .home_3_2_shell {
      width: 49%;
      height: 100%;
      float: left;
      margin-left: 2%;
      border-radius: 8px;
      border: 1px solid #0c6db5;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>