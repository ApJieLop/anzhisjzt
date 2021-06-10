<template>
  <div id="app" >
    <router-view />
  </div>
</template>

<style lang="less">
@import "./style/reset";
@import "./style/common";
@import "./style/base";
@import "./style/form";
@import "./style/public";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
body .el-table th.gutter {
    display: table-cell !important;
  }

  body .el-table colgroup.gutter {
    display: table-cell !important;
  }
</style>
