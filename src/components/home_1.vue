<template>
  <div class="home_1">
    <div class="t1">
      <div class="t1_1">
        <p class="p1">#FFD061</p>
        <p class="p2">#85AEDC</p>
      </div>
      <div class="t1_1">
        <p class="p1">#FFD061</p>
        <p class="p2">#85AEDC</p>
      </div>
    </div>
    <div class="t2">
      <p class="p1">#FFD061</p>
      <p class="p2">#85AEDC</p>
    </div>
    <div class="t2">
      <p class="p1">#FFD061</p>
      <p class="p2">#85AEDC</p>
    </div>
    <div class="t2">
      <p class="p1">#FFD061</p>
      <p class="p2">#85AEDC</p>
    </div>
    <div class="t1">
      <div class="t1_1">
        <p class="p1">#FFD061</p>
        <p class="p2">#85AEDC</p>
      </div>
      <div class="t1_1">
        <p class="p1">#FFD061</p>
        <p class="p2">#85AEDC</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home_1",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
.framePage .framePage-body {
  padding-top: 0;
}
.home_1 {
  width: 100%;
  // overflow: hidden;
  .t1,
  .t2 {
    float: left;
    background: #060250;
    border-radius: 8px;
    margin-left: 2%;
    border: 1px solid #0c6db5;
  }
  .t1 {
    width: 24.2%;
    padding: 1% 0;
    .t1_1 {
      width: 50%;
      float: left;
      .p1 {
        text-align: center;
        color: #ffd061;
        font-size: 18px;
      }
      .p2 {
        text-align: center;
        color: #85aedc;
        margin-top: 6px;
      }
    }
    &:first-child {
      margin-left: 0;
    }
  }

  .t2 {
    width: 14.2%;
    padding: 1% 0;
    .p1 {
      text-align: center;
      color: #ffd061;
      font-size: 18px;
    }
    .p2 {
      text-align: center;
      color: #85aedc;
      margin-top: 6px;
    }
  }
}
</style>