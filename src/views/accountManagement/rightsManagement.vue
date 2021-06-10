<template>
  <div class="pageContol">
    <div class="framePage">
      <div class="framePage-title">
        <nuxt-link to class="cur-a">权限管理</nuxt-link>
      </div>
      <div class="framePage-halfBody">
        <div class="framePage-article">
          <div class="ovy-a">
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              accordion
              highlight-current
              :expand-on-click-node="false"
              @node-click="getNodeD"
              node-key="id"
              :default-expanded-keys="['0']"

            />
          </div>
        </div>
        <div class="framePage-body">
          <div class="operationControl">
            <div class="searchBox" />
            <div class="searchBtns">
              <el-button
                class="bgc-green"
                type="success"
                size="small"
                @click="doadd('addChild')"
              >新增子节点</el-button>
              <el-button class="bgc-orange" type="warning" size="small" @click="opEdit()">修改</el-button>
              <el-button class="bgc-red" type="danger" size="small" @click="opDel()">删除</el-button>
            </div>
          </div>
          <div class="framePage-scroll">
            <div class="ovy-a">
              <el-form ref="formData" :model="formData" :rules="rules" class="formBox-seat">
                <el-form-item label="父级名称" class="itembox">
                  <el-input v-model="formData.parentName" :disabled="true" />
                </el-form-item>
                <el-form-item label="菜单名称" class="itembox" prop="name">
                  <el-input v-model="formData.name" :disabled="disabled" placeholder="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单排序" class="itembox" prop="orderId">
                  <el-input v-model="formData.orderId" :disabled="disabled" @keyup.native="number" />
                </el-form-item>
                <el-form-item label="菜单图标" class="itembox">
                  <el-input v-model="formData.icon" :disabled="disabled" placeholder="请输入图标" />
                </el-form-item>
                <el-form-item label="菜单URL" class="itembox">
                  <el-input v-model="formData.url" :disabled="disabled" placeholder="请输入url" />
                </el-form-item>
                <el-form-item label="菜单描述" class="itembox">
                  <el-input
                    v-model="formData.description"
                    :disabled="disabled"
                    placeholder="请输入描述"
                  />
                </el-form-item>
                <el-form-item v-if="show" class="itembox itembtnbox">
                  <el-button type="primary" size="medium" @click="doSubmit('formData')">提交</el-button>
                  <el-button size="medium" @click="doReset()">重置</el-button>
                  <el-button type="danger" size="medium" @click="doCancel">取消</el-button>
                  <el-button type="warning" size="medium" @click="operation" v-if="disabled2">操作</el-button>
                </el-form-item>
              </el-form>
              <div style="margin-bottom: 20px;" v-if="disabled3">
                <el-button size="small" @click="addRest">新增</el-button>
                <el-button size="small" @click="modifyRest">编辑</el-button>
                <el-button size="small" @click="delRest">删除</el-button>
              </div>
              <el-tabs type="card" v-if="disabled3" v-model="opsId">
                <el-tab-pane v-for="(item, index) in opsList" :key="index" :label="item.name" :name="item.id" lazy>
                  <template v-for="(item2, index2) in opsList[index].perMenuOpsRestList">
                    <el-row :gutter="20" style="margin-top: 20px" :key="index2">
                      <el-col :span="9">{{item2.uri}}</el-col>
                    </el-row>
                  </template>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增/编辑" :visible.sync="dialogVisibleNum" width="50%" @close="doClose">
      <div>
        <el-form ref="baseform" label-width="8rem" label-position="left" class="form" :rules="rules" :model="baseform">
          <el-form-item label="操作名称" prop="restName">
            <el-input v-model="baseform.restName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="操作标识" prop="mark">
            <el-input v-model="baseform.mark" size="small"></el-input>
          </el-form-item>
          <div v-for="(item, index) in baseform.counter" :key="index">
            <el-form-item :label="`API接口${(index + 1)}`" :inline=true>
                <el-input v-model="item.uri" size="small"></el-input>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)"></el-button>
            </el-form-item>
          </div>
          <el-button type="primary" icon="el-icon-edit" @click="addMark()" circle></el-button>
        </el-form>
        <span style="display:flex;justify-content:flex-end;">
            <el-button @click="dialogVisibleNum = false">取 消</el-button>
            <el-button type="primary" @click="saveRest('baseform')">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let formReset = {};
export default {
  name:'operate/rightsManagement',
  data() {
    return {
      show: false,
      stu: "", // 状态
      disabled: false,
      disabled1: false,
      disabled2: false,
      disabled3: false,
      treeData: [ // 树形菜单
        {
          childList: [],
          name: "根目录",
          parentId: 0,
          id:'0'
        }
      ],
      defaultProps: { // tree组件配置
        children: "childList",
        label: "name"
      },
      formData: { // 提交的表单
        parentId: "",
        parentName: "培训管理",
        name: "",
        orderId: "",
        icon: "",
        url: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        orderId: [
          { required: true, message: "请输入菜单序号", trigger: "blur" }
        ],
        mark: [{ required: true, message: '请输入操作标识' }],
        restName: [{ required: true, message: '请输入操作名称' }],
        uri: [{ required: true, message: '请输入API接口1' }]
      },
      data: [],// 树的数据
      apiUrl: "insert", // 后台接口url
      treeNode: {}, // 树点击时缓存的节点信息
      opsList: [
        {
          perMenuOpsRestList: []
        }
      ],
      dialogVisibleNum: false,
      name: '',
      mark: '',
      baseform: {
        mark: '',
        restName: '',
        counter: []
      },
      opsId: '',
      treeId: ''
    };
  },
  created: function() {
    this.disabled = true;
    this.disabled1 = true;
    this.getTreeG();
  },
  methods: {
    //只能输入数字
    number() {
      this.formData.orderId = this.formData.orderId.replace(/[^\.\d]/g, "");
      this.formData.orderId = this.formData.orderId.replace(".", "");
    },
    //获取树结构
    getTreeG() {
      const that = this;
      that
        .$post("/sys/per/menu/tree")
        .then(data => {
          if (data.status == 0) {
            const resData = data.data || [];
            this.treeData[0].childList = resData;
          }
        })
        .catch(error => {
          return;
        });
    },
    //获取树节点
    getNodeD(data, node) {
      this.formData.parentId = data.id || 0;
      this.treeNode = data;
      this.apiUrl = "modify";
      // 存个选中的id 好像还不行
      this.keyId = new Array(data.id)
      this.keyId = [Number(this.keyId[0])]
      this.formData.parentName = data.name || "培训管理";
      this.formData.name = data.name;
      this.formData.orderId = data.orderId || 0;
      this.formData.url = data.url || "";
      this.formData.description = data.description || "";
      this.formData.icon = data.icon || "";
      this.formData.id = data.id || "";

      this.formData.parentName = node.parent.data.name || "培训管理";
      this.disabled2 = this.formData.url != '';
      this.disabled3 = false;
      formReset = { ...this.formData };
    },
    //新增
    doadd(str) {
      if (this.formData.parentId === "") {
        this.$message({
          type: "warning",
          message: "请选择菜单节点"
        });
        return;
      }
      this.apiUrl = "insert";
      this.stu = "add";
      this.show = true;
      this.disabled = false;
      formReset = {
        parentId: this.treeNode.id || 0,
        name: "",
        parentName: this.treeNode.name,
        orderId: 0,
        url: "",
        description: "",
        icon: ""
      };
      this.doReset();
    },
    //修改
    opEdit() {
      if (this.formData.parentId === "") {
        this.$message({
          type: "warning",
          message: "请选择菜单节点"
        });
        return;
      } else if (this.formData.parentId === 0) {
        this.$message({
          type: "warning",
          message: "请选择根目录下的子菜单"
        });
        return;
      }
      this.show = true;
      this.disabled = false;
      this.stu = "edit";
      this.apiUrl = "modify";
      this.formData = {
        ...this.formData,
        parentId: this.treeNode.parentId,
        id: this.treeNode.id
      };
    },
    // 重置
    doReset() {
      this.formData = { ...formReset };
      this.$refs["formData"].resetFields();
    },
    //删除
    opDel() {
      this.apiUrl = "modify";
      if (this.formData.parentId === "") {
        this.$message({
          type: "warning",
          message: "请选择要删除菜单"
        });
        return;
      }
      this.$confirm("是否确定删除操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/sys/per/menu/" + this.apiUrl, {
            id: this.treeNode.id,
            deleted: true
          })
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getTreeG();
                this.empty();
              }
            })
            .catch(() => {
              return;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //取消
    doCancel() {
      this.empty();
      this.show = false;
      this.disabled = true;
    },
    // 操作
    operation() {
      this.disabled3 = !this.disabled3;
      this.$post("/sys/per/menu/ops-rest", this.formData)
          .then(res => {
            this.opsList = res.data || []
          })
          .catch(error => {
            console.log(error);
          });
    },
    //提交
    doSubmit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          const that = this;
          that
            .$post("/sys/per/menu/" + this.apiUrl, this.formData)
            .then(data => {
              this.$message({
                type: "success",
                message: "提交成功"
              });
              this.treeData[0].children = [];
              this.getTreeG();
              this.empty();
              this.disabled = true;
              this.disabled1 = true;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    // 清空
    empty() {
      this.formData = {
        name: "",
        id: null,
        // delFlag: "0", // 0--正常 1--删除
        parentName: "培训管理",
        parentId: "",
        orderId: 0,
        icon: "",
        url: "",
        description: ""
      };
      this.$refs["formData"].resetFields();
    },
    doClose() {

    },
    // 添加一行uri输入框
    addMark() {
      this.baseform.counter.push({})
    },
    // 删除一行uri输入框
    deleteItem(item, index) {
      this.baseform.counter.splice(index, 1)
    },
    // 操作接口-新增
    addRest() {
      this.dialogVisibleNum = true
      this.baseform.counter = []
      this.opsId = ''
      this.baseform.mark = ''
      this.baseform.restName = ''
      this.addMark()
    },
    // 操作接口-编辑
    modifyRest() {
      if (this.opsId == '0') {
        this.$message({
          type: "warning",
          message: "请选择操作类型"
        });
        return;
      }
      this.dialogVisibleNum = true
      const params = {
        id: this.opsId == '0' ? '' : this.opsId
      };
      this.$post("/sys/per/menu/ops-id", params)
          .then(res => {
            this.baseform.mark = res.data.mark || '',
            this.baseform.restName = res.data.name || '',
            this.baseform.counter = res.data.perMenuOpsRestList || []
          })
          .catch(error => {
            console.log(error);
          });
    },
    // 操作接口-删除
    delRest() {
      if (this.opsId == '0') {
        this.$message({
          type: "warning",
          message: "请选择操作类型"
        });
        return;
      }
      const params = {
        id: this.opsId == '0' ? '' : this.opsId
      };
      this.$post("/sys/per/menu/del-id", params)
          .then(res => {
            this.$post("/sys/per/menu/ops-rest", this.formData)
                .then(res => {
                  this.opsList = res.data || []
                  this.opsId = '0'
                })
                .catch(error => {
                  console.log(error);
                });
          })
          .catch(error => {
            console.log(error);
          });
    },
    // 操作接口-保存
    saveRest(baseform) {
      this.$refs[baseform].validate(valid => {
        if (this.baseform.counter.length === 0 || this.baseform.counter[0].uri === undefined) {
          this.$message({
            type: "warning",
            message: "请填写API接口"
          });
          return false;
        }
        if (valid) {
          this.dialogVisibleNum = false
          const params = {
            opsRestList: this.baseform.counter || [],
            menuId: this.treeNode.id,
            name: this.baseform.restName,
            mark: this.baseform.mark,
            id: this.opsId == '0' ? '' : this.opsId
          };
          this.$post("/sys/per/menu/ops-insert", params)
              .then(res => {
                this.$post("/sys/per/menu/ops-rest", this.formData)
                    .then(res => {
                      this.opsList = res.data || []
                      this.opsId = '0'
                    })
                    .catch(error => {
                      console.log(error);
                    });
              })
              .catch(error => {
                console.log(error);
              });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.framePage-halfBody {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.framePage-halfBody .framePage-article {
  background-color: #fff;
  margin-right: 0.675rem;
  height: 100%;
  padding: 1rem 0.675rem;
  box-sizing: border-box;
  width: 25%;
  min-width: 20rem;
}
.formBox-seat {
  width: 70%;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}
.formBox-seat .itembox {
  display: flex;
}
.formBox-seat .itembox > label {
  width: 6rem;
}
.formBox-seat .el-form-item {
  margin-bottom: 15px;
}
.formBox-seat .itembox .el-form-item__content {
  flex: 1;
}
.formBox-seat .itembox .el-form-item__content .el-select {
  width: 100%;
}

</style>
