<template>
  <div class="pageNum">
    <el-pagination
      :total="parseInt(apiData.total)"
      :page-size="Math.ceil(apiData.size)"
      :current-page="apiData.current"
      background
      :page-sizes="[10, 20, 30, 40,50,100,200,500]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="getData"
    />
  </div>
</template>
<script>
export default {
  name: "PageNum",
  props: {
    apiData: {
      type: Object,
      default: function() {
        return {
          total: 1,
          size: 1,
          current: 1
        };
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    getData(current) {
      this.$emit("getData", current);
    }
  }
};
</script>
<style lang="less">
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #5c6be8;
}
</style>
