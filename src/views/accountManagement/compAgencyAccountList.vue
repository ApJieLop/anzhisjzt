<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">代理商机构关联</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="operationControl flexdc" style="align-items: flex-start; ">
          <div class="searchbox" style="margin-bottom:5px">
            <div title="账户名称" class="searchboxItem ci-full">
              <span class="itemLabel">账户名称:</span>
              <el-input
                v-model="adminName"
                type="text"
                size="small"
                clearable
                placeholder="请输入账户名称"
              />
            </div>
            <div title="使用人姓名" class="searchboxItem ci-full">
              <span class="itemLabel" style="min-width:6rem">使用人姓名:</span>
              <el-input
                v-model="fullname"
                type="text"
                size="small"
                clearable
                placeholder="请输入使用人姓名"
              />
            </div>
            <div title="使用人电话" class="searchboxItem ci-full">
              <span class="itemLabel" style="min-width:6rem">使用人电话:</span>
              <el-input
                v-model="mobile"
                type="text"
                size="small"
                clearable
                placeholder="请输入使用人电话"
              />
            </div>
            <div class="btnBox" style="margin-left:20px">
              <el-button
                  style="margin-left:20px"
                  class="bgc-bv"
                  round
                  @click="getData()"
              >查询</el-button>
            </div>
          </div>
        </div>
        <div class="framePage-scroll">
          <div class="ovy-a">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :height="tableHeight"
              size="small"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="tableHeader"
              stripe
            >
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="100px"
                :index="indexMethod"
              />
              <el-table-column
                label="账号名称"
                align="left"
                prop="adminName"
                show-overflow-tooltip
                min-width="100"
              />
              <el-table-column
                  label="角色名称"
                  align="left"
                  prop="realRoleName"
                  show-overflow-tooltip
                  min-width="100"
              />
              <el-table-column
                label="使用人姓名"
                align="left"
                prop="fullname"
                show-overflow-tooltip
                min-width="100"
              />
              <el-table-column
                label="使用人电话"
                align="left"
                prop="mobile"
                show-overflow-tooltip
                min-width="100"
              />
              <el-table-column
                label="操作"
                align="center"
                width="200px"
                fixed="right"
              >
                <div slot-scope="scope" class="flexcc">
                  <el-button
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    @click="handleCreate(scope.row.adminId)"
                    >关联机构</el-button
                  >
                </div>
              </el-table-column>
              <Empty slot="empty" />
            </el-table>
          </div>
        </div>
        <PageNum
          :apiData="apiData"
          @sizeChange="sizeChange"
          @getData="getData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Empty from "@/components/Empty.vue";
import PageNum from "@/components/PageNum.vue";
import List from "@/mixins/List";
import { resetKeepAlive } from "@/utils/common";
export default {
  name: "operate/accountList",
  components: {
    Empty,
    PageNum,
  },
  mixins: [List],
  data() {
    return {
      DialogVisible: false,
      adminName: "",
      fullname: "",
      mobile: ""
    };
  },
  computed: {},
  created() {
    this.getTableHeight();
  },
  methods: {
    getData(pageNum = 1) {

      const params = {
        pageNum: pageNum,
        pageSize: this.pageSize,
      };
      if (this.adminName) {
        params.adminName = this.adminName;
      }
      if (this.fullname) {
        params.fullname = this.fullname;
      }
      if (this.mobile) {
        params.mobile = this.mobile;
      }
      params.roleId = -5;
      this.doFetch({
        url: "/sys/admin/agency/page",
        params,
        pageNum,
      });
    },
    // 修改
    handleCreate(id = "") {
      this.$router.push({
        path: "/web/operate/compAgencyBindList",
        query: {adminId: id},
      });
    },
    //
    getTableHeight(opDom = true, page = true) {
      let tHeight =
        window.innerHeight - (3 + 1.35 + 3.25 + 0.675 + 2 + 1.35 + 4) * 16;
      if (opDom) {
        tHeight -= 40 + 40 + 0.675 * 16 + 1;
      }
      if (page) {
        tHeight -= 32;
      }
      this.tableHeight = tHeight;
    },
  },
  beforeRouteLeave: resetKeepAlive,
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.query.refrsh == true) {
          this.getData(-1);
        }
        if (oldVal.query.stu == "add") {
          // console.log(oldVal.meta.level)
          (this.adminName = ""),
            (this.compName = ""),
            (this.fullname = ""),
            (this.mobile = ""),
            (this.pageNum = 1),
            this.getData(-1);
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style lang="less">
.addlist {
  .el-icon-plus:before {
    content: "\e6d9";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.table-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-switch__core {
    width: 40px !important;
  }
  .el-switch__core:after {
    background-color: #fff;
  }
  span {
    line-height: 20px;
    margin-left: 5px;
  }
}
</style>
<style lang="less" scope>
.el-input-group__prepend {
  width: 6rem;
}
</style>
