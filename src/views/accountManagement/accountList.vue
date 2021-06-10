<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">账号列表</a>
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
            <div title="角色名称" class="searchboxItem ci-full">
              <span class="itemLabel">角色名称:</span>
              <el-input
                v-model="realRoleName"
                type="text"
                clearable
                size="small"
                placeholder="请输入角色名称"
              />
            </div>
          </div>
          <div class="searchbox" style="padding-top:10px">
            <div title="角色类型" class="searchboxItem ci-full">
              <span class="itemLabel">角色类型:</span>
              <el-select
                clearable
                size="small"
                v-model="roleId"
                @change="roleChange"
                placeholder="请选择"
              >
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in roleType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div title="是否启用" class="searchboxItem ci-full">
              <span class="itemLabel" style="width:6rem">是否启用:</span>
              <el-select
                clearable
                size="small"
                v-model="state"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in openList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div title="监管区域" class="searchboxItem ci-full">
              <span class="itemLabel" style="width:6rem">监管区域:</span>
              <el-cascader
                :props="{ emitPath: false, checkStrictly: true }"
                v-model="cityId"
                :options="cityTree"
                @change="handleCascader"
                clearable
                filterable
                size="small"
              ></el-cascader>
            </div>
            <div title="监管类型" class="searchboxItem ci-full">
              <span class="itemLabel">监管类型:</span>
              <el-cascader
                :props="{
                  emitPath: false,
                  value: 'id',
                  label: 'label',
                  children: 'children',
                  checkStrictly: true,
                }"
                v-model="trainTypeId"
                :options="trainTypeList"
                @change="handleTrainType"
                clearable
                size="small"
              ></el-cascader>
            </div>
          </div>
          <div class="searchbox" style="padding-top:10px">
            <div title="归属单位" class="searchboxItem ci-full">
              <span class="itemLabel">归属单位:</span>
              <el-input
                v-model="compName"
                type="text"
                size="small"
                clearable
                placeholder="请输入归属单位"
              >
                <el-select
                  v-model="compType"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="机构" value="1"></el-option>
                  <el-option label="代理商" value="2"></el-option>
                </el-select>
              </el-input>
            </div>
            <div class="btnBox" style="margin-left:20px">
              <el-button
                style="margin-left:20px"
                class="bgc-bv"
                round
                @click="getData()"
                >查询</el-button
              >
              <el-button class="bgc-bv" round @click="handleCreate('add')"
                >创建账号</el-button
              >
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
                label="角色名称"
                align="left"
                prop="realRoleName"
                show-overflow-tooltip
                min-width="100"
              />
              <el-table-column
                label="角色类型"
                align="center"
                show-overflow-tooltip
                min-width="100"
              >
                <span slot-scope="scope">{{ roletype(scope.row.roleId) }}</span>
              </el-table-column>
              <el-table-column
                label="归属单位"
                align="left"
                show-overflow-tooltip
                min-width="200"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.roleId == '-3'">{{
                    scope.row.companyName
                  }}</span>
                  <span v-else>{{ scope.row.compName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="最后登录时间"
                  align="left"
                  show-overflow-tooltip
                  width="180"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.lastLoginTime | momentWu }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否启用" align="center" min-width="100">
                <div slot-scope="scope" class="table-switch">
                  <el-switch
                    :width="20"
                    v-model="scope.row.state"
                    active-value="10"
                    inactive-value="20"
                    active-color="#13ce66"
                    @change="
                      (val) => {
                        handleStu(val, scope.row.adminId);
                      }
                    "
                  ></el-switch>
                  <span>{{ scope.row.state == 10 ? "启用" : "禁用" }}</span>
                </div>
              </el-table-column>
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
                    @click="handleCreate('edit', scope.row.adminId)"
                    >编辑</el-button
                  >
                  <!-- 隐藏删除按钮 <el-button
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    @click="handleDel(scope.row.adminId)"
                  >删除</el-button>-->
                  <el-button
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    @click="handlePassword(scope.row.adminId)"
                    >重置密码</el-button
                  >
                  <el-button
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    :disabled="scope.row.lock == false"
                    @click="handleLock(scope.row.adminName)"
                    >解除锁定</el-button
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
    <el-dialog
      title="重置密码"
      :visible.sync="DialogVisible"
      width="30%"
      center
    >
      <div class="flexdcc">
        <p>是否将用户密码重置？</p>
        <p>重置后，变为初始密码Aa123456</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPassword" class="bgc-bv"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      compName: "",
      adminName: "",
      fullname: "",
      realRoleName: "",
      mobile: "",
      roleId: "", // 角色类型
      state: "", // 是否启用
      trainTypeId: "", // 监管类型
      trainTypeList: [], // 培训类型
      cityId: "", // 监管区域
      cityTree: [], // 行政区划
      openList: [
        // 是否启用
        {
          label: "全部",
          value: "",
        },
        {
          label: "启用",
          value: "10",
        },
        {
          label: "禁用",
          value: "20",
        },
      ],
      roleType: [],
      compType: "1",
    };
  },
  computed: {},
  created() {
    this.getcity();
    this.getTableHeight();
    this.getTraintype();
  },
  methods: {
    roletype(id) {
      // switch (id) {
      //   case "1":
      //     return "运营";
      //   case "2":
      //     return "监管";
      //   case "3":
      //     return "机构";
      //   case "-1":
      //     return "市场";
      //   default:
      //     return "";
      // }
      return this.roleType.find((item) => item.id == id).name;
    },
    roleChange(val) {
      console.log(val);
      if (val == "-3") {
        this.compType = "2";
      } else if (val == "3") {
        this.compType = "1";
      } else {
        this.compType = "";
      }
    },
    getData(pageNum = 1) {
      if (this.compName) {
        if (this.compType == "") {
          this.$message({
            message: "请选择归属单位类型",
            type: "error",
          });
          return false;
        }
      }
      const params = {
        pageNum: pageNum,
        pageSize: this.pageSize,
      };
      if (this.adminName) {
        params.adminName = this.adminName;
      }

      if (this.compType) {
        params.compType = this.compType;
      }
      if (this.compType === "1") {
        console.log("5555");
        if (this.compName && this.compType == "1") {
          params.compName = this.compName;
        }
      } 
      if(this.compType === "2") {
        console.log("666");
        if (this.compName && this.compType == "2") {
          params.companyName = this.compName;
        }
      }
      if (this.fullname) {
        params.fullname = this.fullname;
      }
      if (this.mobile) {
        params.mobile = this.mobile;
      }
      if (this.realRoleName) {
        params.realRoleName = this.realRoleName;
      }
      if (this.roleId) {
        params.roleId = this.roleId;
      }
      if (this.roleId === "-3") {
        if (this.compName) {
          params.companyName = this.compName;
        }
      }
      // if (this.roleId !== "-3") {
      //   if (this.compName) {
      //     params.compName = this.compName;
      //   }
      // }
      if (this.state) {
        params.state = this.state;
      }
      if (this.cityId) {
        params.areaId = this.cityId;
      }
      if (this.trainTypeId) {
        params.trainTypeId = this.trainTypeId;
      }
      this.getrole(() => {
        this.doFetch({
          url: "/sys/admin/page",
          params,
          pageNum,
        });
      });
    },
    getrole(callback) {
      this.$post("/sys/per/role/basal")
        .then((res) => {
          this.roleType = res.data || [];
          callback();
        })
        .catch(() => {
          return;
        });
    },
    // 修改
    handleCreate(stu, id = "") {
      this.$router.push({
        path: "/web/operate/accountEdit",
        query: { id, stu },
      });
    },
    /**
     * 修改状态
     */
    handleStu(state, adminId) {
      this.$post("/sys/admin/modifyStat", {
        adminId,
        state,
      }).then((res) => {
        if (res.status == "0") {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.getData(-1);
        }
      });
    },
    /**
     *  行政区划
     */
    getcity() {
      this.$post("/sys/area/tree")
        .then((res) => {
          this.cityTree = res.data || [];
        })
        .catch(() => {
          return;
        });
    },
    /**
     * 获取培训类型
     */
    getTraintype() {
      this.$post("/sys/category/train-type/tree").then((res) => {
        if (res.status == "0") {
          this.trainTypeList = res.data;
        }
      });
    },
    handleCascader(val) {
      console.log(val);
    },
    handleTrainType(val) {
      console.log(val);
    },
    // 重置密码
    handlePassword(id) {
      this.DialogVisible = true;
      this.adminId = id;
    },
    doPassword() {
      this.$post("/sys/admin/restPassword", { adminId: this.adminId }).then(
        (res) => {
          if (res.status == "0") {
            this.$message({
              type: "success",
              message: "密码重置成功",
            });
            this.DialogVisible = false;
            this.getData(-1);
          }
        }
      );
    },
    handleLock(adminName) {
         this.$confirm("账号是否解除锁定？", "解除锁定", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$post("/sys/admin/unlock", { adminName }).then((res) => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "解锁成功!",
              });
              this.getData(-1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解除锁定",
          });
        });
    },
    // 删除
    handleDel(adminId) {
      this.$confirm("是否确认删除该账号？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$post("/sys/admin/delete", { adminId }).then((res) => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData(-1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
            (this.realRoleName = ""),
            (this.roleId = ""),
            (this.state = ""),
            (this.cityId = ""),
            (this.trainTypeId = ""),
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
