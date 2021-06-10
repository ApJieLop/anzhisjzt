<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">角色列表</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="operationControl">
          <div class="searchbox">
            <div title="角色名称" class="searchboxItem ci-full">
              <span class="itemLabel">角色名称:</span>
              <el-input v-model="searchName" type="text" size="small" clearable placeholder="请输入角色名称" />
            </div>
            <div title="角色类型" class="searchboxItem ci-full">
              <span class="itemLabel">角色类型:</span>
              <el-select clearable size="small" v-model="roleValue" placeholder="请选择">
                <el-option
                  v-for="item in roleType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <el-button class="bgc-bv" round @click="getData()">查询</el-button>
          </div>
          <div class="btnBox">
            <el-button class="bgc-bv" round @click="handleEdit('add')">创建角色</el-button>
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
            width="50px"
            :index="indexMethod"
          />
              <el-table-column label="角色名称" align="center" prop="name" show-overflow-tooltip />
              <el-table-column label="角色类型" align="center" show-overflow-tooltip>
                <span slot-scope="scope">{{roletype(scope.row.parentId)}}</span>
              </el-table-column>
              <el-table-column label="描述" align="center" prop="description" />
              <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip />
              <el-table-column label="操作" align="center" width="110px">
                <div slot-scope="scope" class="flexcc">
                  <el-button
                    :disabled="scope.row.parentId == 0"
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    @click="handleEdit('edit',scope.row.id,scope.row.parentId)"
                  >编辑</el-button>
                  <el-button
                    :disabled="scope.row.parentId == 0"
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    @click="handleDel(scope.row.id)"
                  >删除</el-button>
                </div>
              </el-table-column>
              <Empty slot="empty" />
            </el-table>
          </div>
        </div>
        <PageNum :apiData="apiData" @sizeChange="sizeChange" @getData="getData" />
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
  name: "operate/roleList",
  components: {
    Empty,
    PageNum
  },
  mixins: [List],
  data() {
    return {
      searchName: "",
      roleType: [],
      roleValue: "" // 角色类型
    };
  },
  computed: {},
  methods: {
    roletype(id) {
      if (this.roleType.find(item => item.id == id) == undefined) {
        return "内置角色";
      }
      return this.roleType.find(item => item.id == id).name;
    },
    getData(pageNum = 1) {
      this.getrole();
      const params = {
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      if (this.searchName) {
        params.name = this.searchName;
      }
      if (this.roleValue) {
        params.parentId = this.roleValue;
      }
      this.doFetch({
        url: "/sys/per/role/page",
        params,
        pageNum
      });
    },
    getrole() {
      this.$post("/sys/per/role/basal")
        .then(res => {
          this.roleType = res.data || [];
        })
        .catch(() => {
          return;
        });
    },
    //
    handleEdit(stu, id = "",pid) {
      this.$router.push({
        path: "/web/operate/createRoleType",
        query: { id, stu, pid}
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm("是否确认删除该角色？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/sys/per/role/delete", { deleted: true, id }).then(
            res => {
              if (res.status == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData(-1)
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  beforeRouteLeave: resetKeepAlive,
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.query.refrsh == true) {
         
          this.getData(-1);
        }
         if(oldVal.query.stu =='add'){
            this.searchName = '',
            this.roleValue = '',
            this.pageNum= 1,
            this.getData(-1);
          }
      },
      // 深度观察监听
      deep: true
    }
  }
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
</style>
<style lang="less" scoped>
.addlist {
  h3 {
    padding: 10px 0;
  }
}
.zsBtn {
  margin-left: 20px;
  button {
    height: 40px;
  }
}
.certificate-box {
  > div:last-child {
    border: 0;
  }
}
.card-border {
  padding: 10px;
  border-bottom: 1px dashed #eee;
}
</style>
