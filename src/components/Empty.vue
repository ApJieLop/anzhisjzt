<template>
  <div class="empty-seat">
    <div class="empty-img flexdc">
      <img src="../assets/empty.png" />
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Empty"
};
</script>
<style lang="less" scoped>
.empty-seat {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -100px;
  span {
    text-align: center;
    color: #b8b8b8;
  }
  img {
    width: 10.9375rem;
  }
}
</style>
