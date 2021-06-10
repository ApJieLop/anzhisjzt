<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="$router.back()">代理商机构关联</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">机构关联列表</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="operationControl flexdc" style="align-items: flex-start; ">
          <div class="searchbox" style="margin-bottom:5px">
            <div title="账户名称" class="searchboxItem ci-full">
              <span class="itemLabel">机构名称:</span>
              <el-input
                  v-model="compName"
                  type="text"
                  size="small"
                  clearable
                  placeholder="请输入机构名称"
              />
            </div>
            <div title="开始日期" class="searchboxItem ci-full">
              <span class="listLabel">开始日期:</span>
              <el-date-picker
                  class="listInput"
                  clearable
                  size="small"
                  v-model="startDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
            <div title="结束日期" class="searchboxItem ci-full">
              <span class="listLabel">结束日期:</span>
              <el-date-picker
                  class="listInput"
                  clearable
                  size="small"
                  v-model="endDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
            <div class="btnBox" style="margin-left:20px">
              <el-button
                  style="margin-left:20px"
                  class="bgc-bv"
                  round
                  @click="getData()"
              >查询</el-button>
              <el-button class="bgc-bv" round @click="handleAdd()"
              >新增</el-button>
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
                  label="机构名称"
                  align="left"
                  prop="compName"
                  show-overflow-tooltip
                  min-width="100"
              />
              <el-table-column
                  label="有效开始时间"
                  align="left"
                  prop="startDate"
                  show-overflow-tooltip
                  min-width="100"
              />
              <el-table-column
                  label="有效结束时间"
                  align="left"
                  prop="endDate"
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
                      size="mini"
                      style="padding:0 5px"
                      @click="editBind(scope.row)"
                  >编辑</el-button
                  >
                  <el-button
                      type="text"
                      size="mini"
                      style="padding:0 5px"
                      @click="deleteBind(scope.row.id)"
                  >删除</el-button
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
    <el-dialog :title="bindTitle" :visible.sync="dialogFormVisible"  :before-close="closeDocsDialog" width="35%">
      <el-form :model="bindForm" style="width:100%" :rules="rules" ref="bindForm">
        <el-form-item label="关联机构" prop="compId" label-width="130px" >

          <el-select
              clearable
              size="small"
              v-model="bindForm.compId"
              filterable
              remote
              :remote-method="getCompanyList"
              placeholder="请至少输入三个字搜索"
          >
            <el-option
                size="small"
                v-for="item in CompanyList"
                :key="item.compId"
                :label="item.compName"
                :value="item.compId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间起止" label-width="130px" prop="date">
          <el-date-picker
              class="listInput"
              clearable
              size="small"
              v-model="bindForm.startEndDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer flexcc">
        <el-button @click="closeDocsDialog">取 消</el-button>
        <el-button class="bgc-bv" type="primary" @click="doOk(bindForm)">确 定</el-button>
      </div>
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
      mobile: "",
      adminId: null,
      startDate: null,
      endDate: null,
      dialogFormVisible: false,
      CompanyList: [],
      bindTitle: "新增关联机构",
      bindForm: {
        id: null,
        compId: null,
        startEndDate: null
      },
      rules: {
        compId: [
          { required: true, message: "请选择绑定机构", trigger: "blur" }
        ],
        startEndDate: [{ required: true, message: "请输入有效开始结束时间", trigger: "blur" }]
      },
    };
  },
  computed: {},
  created() {
    this.adminId = this.$route.query.adminId;
    this.getData();
    this.getTableHeight();
  },
  methods: {
    getData(pageNum = 1) {

      const params = {
        pageNum: pageNum,
        pageSize: this.pageSize,
      };
      params.adminId = this.adminId;
      if (this.compName) {
        params.compName = this.compName;
      }
      if (this.startDate && this.startDate.length > 0) {
        params.startDateStart = this.startDate[0];
        params.startDateEnd = this.startDate[1];
      }
      if (this.endDate && this.endDate.length > 0) {
        params.endDateStart = this.endDate[0];
        params.endDateEnd = this.endDate[1];
      }
      this.doFetch({
        url: "/sys/admin/compBindList",
        params,
        pageNum,
      });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.bindTitle = "新增关联机构";
      this.bindForm = {
        id: null,
        compId: null,
        startDate: null,
        endDate: null,
        adminId: this.adminId
      };
      this.CompanyList = [];
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
    editBind(row) {
      this.bindTitle = "修改关联机构";
      this.bindForm = {
        id: row.id,
        compId: row.compId,
        startEndDate: [row.startDate.replaceAll("/", "-"), row.endDate.replaceAll("/", "-")],
        adminId: this.adminId
      };
      this.getCompany(row.compId);
      this.dialogFormVisible = true;
    },
    //取消
    closeDocsDialog(){
      this.dialogFormVisible = false;
      this.bindForm = {
        id: null,
        compId: null,
        startDate: null,
        endDate: null,
        adminId: this.adminId
      };
    },
    // 弹窗确定
    doOk(bindForm) {
      this.$refs.bindForm.validate((valid) => {
        if (valid) {
          //新增
          let data = {
            id: bindForm.id || null,
            compId: bindForm.compId,
            startDate: bindForm.startEndDate[0],
            endDate: bindForm.startEndDate[1],
            adminId: bindForm.adminId
          };
          this.$post("/sys/admin/saveOrUpdateCompBind", data)
              .then(res => {
                if (res.status == "0") {
                  this.$message({
                    type: "success",
                    message: this.bindForm.id === null ? "添加成功" : "修改成功"
                  });
                  this.bindForm.id = null;
                  this.bindForm.compId = null;
                  this.bindForm.startDate = null;
                  this.bindForm.endDate = null;
                  this.dialogFormVisible = false;
                  this.getData();
                }
              })
              .catch(() => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 资源提供者1
    getCompanyList(query) {
      if (query.trim().length >= 3) {
        this.$post("/sys/company/queryCompanyList", { compName: query })
            .then(res => {
              if (res.status == 0) {
                this.CompanyList = res.data || [];
              }
            })
            .catch(() => {
              return;
            });
      } else {
        this.CompanyList = [];
      }
    },
    /**
     * 单位回显接口
     */
    getCompany(id) {
      this.$post("/sys/company/id", { compId: id }).then((res) => {
        this.CompanyList = [res.data];
      });
    },
    //删除
    deleteBind(id) {
      this.doDel({
        url: "/sys/admin/deleteCompBind",
        msg: "确定删除关联机构吗？",
        ps: {
          type: "post",
          data: { id },
        },
      });
    }
  },
  beforeRouteLeave: resetKeepAlive,
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.query.refrsh == true) {
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
