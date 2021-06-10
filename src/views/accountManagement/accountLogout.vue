<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">账号注销</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="seachStyle">
          <el-row :gutter="20">
            <el-col :sm="12" :md="8" :lg="6" class="searchList">
              <span class="listLabel">姓名:</span>
              <el-input
                class="listInput"
                v-model="searchData.userName"
                placeholder="请输入姓名"
                size="small"
                clearable
              />
            </el-col>
            <el-col :sm="12" :md="8" :lg="6" class="searchList">
              <span class="listLabel">注销手机号:</span>
              <el-input
                class="listInput"
                v-model="searchData.mobile"
                placeholder="请输入注销手机号"
                size="small"
                clearable
              />
            </el-col>
            <el-col :sm="12" :md="8" :lg="6" class="searchList">
              <span class="listLabel">身份证号:</span>
              <el-input
                class="listInput"
                v-model="searchData.idcard"
                placeholder="请输入身份证号"
                size="small"
                clearable
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :sm="12" :md="8" :lg="6" class="searchList">
              <span class="listLabel">注销申请时间:</span>

              <el-date-picker
                v-model="searchData.applyLogoutDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择注销申请时间"
                size="small"
              ></el-date-picker>
            </el-col>

            <el-col :sm="12" :md="8" :lg="4" class="searchList">
              <div class="listBtn">
                <el-button type="primary" class="listBtnS" round @click="getData()">查询</el-button>
              </div>
            </el-col>
          </el-row>
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
                label="姓名"
                align="center"
                prop="userName"
                show-overflow-tooltip
                min-width="100"
              />

              <el-table-column
                label="注销手机号"
                align="center"
                prop="mobile"
                show-overflow-tooltip
                min-width="100"
              />
              <el-table-column
                label="身份证号"
                align="center"
                prop="idcard"
                show-overflow-tooltip
                min-width="160"
              />
              <el-table-column
                label="申请注销时间"
                align="center"
                prop="applyLogoutDate"
                show-overflow-tooltip
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.applyLogoutDate|moment}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="注销到期时间"
                align="center"
                prop="expireDate"
                show-overflow-tooltip
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.expireDate|moment}}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" width="140px" fixed="right">
                <div slot-scope="scope" class="flexcc">
                  <el-button
                    type="text"
                    style="padding:0px 5px"
                    size="mini"
                    :disabled="!scope.row.enable"
                    @click="handlePassword(scope.row.deleteId)"
                  >确认注销</el-button>
                </div>
              </el-table-column>
              <Empty slot="empty" />
            </el-table>
          </div>
        </div>
        <PageNum :apiData="apiData" @sizeChange="sizeChange" @getData="getData" />
      </div>
    </div>
    <el-dialog title="注销" :visible.sync="DialogVisible" width="30%" center>
      <div class="flexdcc">
        <p>是否确认注销该账户？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPassword" class="bgc-bv">确 定</el-button>
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
  name: "operate/accountLogout",
  components: {
    Empty,
    PageNum
  },
  mixins: [List],
  data() {
    return {
      DialogVisible: false,
      deleteId: "",
      searchData: {
        userName: "",
        mobile: "",
        idcard: "",
        applyLogoutDate: ""
      }
    };
  },
  computed: {},
  created() {},
  beforeRouteLeave: resetKeepAlive,
  methods: {
    // 确认注销
    handlePassword(id) {
      this.DialogVisible = true;
      this.deleteId = id;
    },
    //确认
    doPassword() {
      this.$post("/bis/user/delete/doLogoutUser", { deleteId: this.deleteId })
        .then(re => {
          if (re.status == 0) {
            this.DialogVisible = false;
            this.getData(-1);
          } else {
            this.DialogVisible = true;
          }
        })
        .catch(re => {
          
        });
    },
    getData(pageNum = 1) {
      const params = {
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      if (this.searchData.userName) {
        params.userName = this.searchData.userName;
      }
      if (this.searchData.mobile) {
        params.mobile = this.searchData.mobile;
      }
      if (this.searchData.idcard) {
        params.idcard = this.searchData.idcard;
      }
      if (this.searchData.applyLogoutDate) {
        params.applyLogoutDate = this.searchData.applyLogoutDate;
      }

      this.doFetch({
        url: "/bis/user/delete/listLogoutUser",
        params,
        pageNum
      });
    }
  },

  watch: {}
};
</script>

<style lang="less" scoped>
.seachStyle {
  .searchList {
    .listLabel {
      min-width: 88px !important;
    }
  }
}
</style>
