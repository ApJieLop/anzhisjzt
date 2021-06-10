<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="$router.back()">角色类型列表</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">{{ title }}</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="framePage-scroll">
          <div class="ovy-a">
            <div class="form-box" style="width:70%">
              <el-form ref="ruleForm" label-width="7rem" class="form" :model="ruleForm">
                <el-form-item label="角色名称：" required>
                  <el-input size="small" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色类型：" required>
                  <el-select
                    @change="roleTypeChange"
                    clearable
                    size="small"
                    v-model="ruleForm.parentId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in roleType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色描述：">
                  <el-input
                    type="textarea"
                    resize="none"
                    v-model="ruleForm.description"
                    placeholder="请输入不超过100字的角色描述"
                    maxlength="100"
                  ></el-input>
                </el-form-item>
                <el-form-item label="设置权限：" required v-show="showTree">
                  <div class="roletree" style="padding-top:10px">
                    <el-tree
                      ref="tree"
                      :props="defaultProps"
                      :data="data"
                      highlight-current
                      default-expand-all
                      :expand-on-click-node="false"
                      show-checkbox
                      node-key="id"
                      @check="checkChange"
                    >
                      <div slot-scope="{ node, data }" class="flexdc treeList">
                        <div v-if="data.level == 1" class="level1">
                          <span class="pTree">
                            {{ data.name }}
                            <span style="margin-left:5px">{{data.description || ''}}</span>
                          </span>
                        </div>
                        <div v-else-if="data.level == 2" class="level2">
                          <span style="border:0;" class="childTree df">
                            <span class="level2-parent">
                              {{data.name}}
                              <span style="margin-left:5px">{{data.description || ''}}</span>
                            </span>
                            <!-- <span class="level2-child df">
                              <el-checkbox>新增课件</el-checkbox>
                              <el-checkbox>编辑课件</el-checkbox>
                              <el-checkbox>预览课件</el-checkbox>
                            </span>-->
                          </span>
                        </div>

                        <span></span>
                      </div>
                    </el-tree>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn-box flexcc" style="width:70%;padding-bottom: 10px;">
              <el-button @click="dohandleOk" class="bgc-bv">取 消</el-button>
              <el-button v-if="stu === 'add'" class="bgc-bv" @click="doAddSave">确 定</el-button>
              <el-button v-else class="bgc-bv" @click="doEditSave">确 定</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "operate/createRoleType",
  components: {},
  data() {
    return {
      title: "创建角色类型",
      data: [],
      // 基本信息
      ruleForm: {
        name: "", // 角色名称
        description: "", // 角色描述
        parentId: "" // 角色类型
      },
      roleType: [],
      education: [],
      userType: [],
      defaultProps: {
        children: "childList",
        label: "name"
      },
      selectId: [], //
      displayIds: [], // 回显的子id集合
      userMenuIds: [], // 回显的id全部集合
      stu: "add",
      id: "", // 编辑时的id
      showTree: false
    };
  },
  created() {
    this.init();
    this.id = this.$route.query.id || "";
    this.stu = this.$route.query.stu || "add";
    if (this.stu == "edit") {
      this.getroleById(this.$route.query.id);
      this.title = "编辑角色类型";
      this.showTree = true;
      this.doEdit(this.$route.query.id, this.$route.query.pid);
    }
  },
  computed: {},
  methods: {
    init() {
      this.getrole();
      this.getmenu();
    },
    //
    doEdit(id, pid) {
      this.$post("/sys/per/menu/roleId", {
        roleId: pid
      })
        .then(res => {
          if (res.status == "0") {
            this.$post("/sys/per/menu/roleId", {
              roleId: id
            })
              .then(ret => {
                this.setChecked(res.data, true, true);
                if (ret.status == "0") {
                  this.userMenuIds = ret.data.map(i => i.id);
                  this.selectId = ret.data;
                  this.setChecked(ret.data, false, false);
                }
              })
              .catch(() => {
                return;
              });
          }
        })
        .catch(() => {
          return;
        });
    },
    roleTypeChange(val) {
      this.showTree = true;
      this.$post("/sys/per/menu/roleId", {
        roleId: val
      })
        .then(res => {
          if (res.status == "0") {
            this.setChecked(res.data, true, true);
            this.setChecked(this.selectId);
          }
        })
        .catch(() => {
          return;
        });
    },
    check() {
      if (!this.ruleForm.name.trim()) {
        this.$message.error("请输入角色名称");
        return false;
      }
      if (!this.ruleForm.parentId) {
        this.$message.error("角色类型不能为空");
        return false;
      }
      if (
        this.ruleForm.description.trim() &&
        this.ruleForm.description.length > 100
      ) {
        this.$message.error("角色描述不能超过100字");
        return false;
      }
      // if (
      //   !this.selectId.length &&
      //   !this.userMenuIds.length
      // ) {
      //   this.$message.error("权限不能为空");
      //   return false;
      // }
      return true;
    },
    checkChange(node, data) {
      let checkedlist = data.checkedNodes.filter(i => !i.disabled);
      let halfCheckedlist = data.halfCheckedNodes.filter(i => !i.disabled);
      this.selectId = [...checkedlist, ...halfCheckedlist]; // 选中的id
    },
    doAddSave() {
      let includesId = this.selectId.map(i => i.id);
      let menuRelationList = includesId.map(item => {
        return {
          menuId: item
        };
      });
      const params = {
        name: this.ruleForm.name,
        menuRelationList: menuRelationList,
        description: this.ruleForm.description,
        parentId: this.ruleForm.parentId
      };
      if (this.check()) {
        this.$post("/sys/per/role/insert", params)
          .then(res => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "新增成功"
              });
              this.dohandleOk();
            }
          })
          .catch(() => {
            return;
          });
      }
    },
    doEditSave() {
      let includesId = this.selectId.map(i => i.id);
      let del = this.userMenuIds.filter(i => !includesId.includes(i));
      let add = includesId.filter(i => !this.userMenuIds.includes(i));
      del = del.map(i => {
        return {
          deleted: true,
          menuId: i
        };
      });
      add = add.map(i => {
        return {
          menuId: i,
          deleted: false
        };
      });
      const params = {
        name: this.ruleForm.name,
        menuRelationList: [...del, ...add],
        description: this.ruleForm.description,
        parentId: this.ruleForm.parentId,
        id: this.id
      };

      if (this.check()) {
        this.$post("/sys/per/role/modify", params)
          .then(res => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.dohandleOk();
            }
          })
          .catch(() => {
            return;
          });
      }
    },
    //回显form
    getroleById(id) {
      this.$post("/sys/per/role/id", {
        id
      })
        .then(res => {
          if (res.status == "0") {
            this.ruleForm = { ...res.data };
          }
        })
        .catch(() => {
          return;
        });
    },
    // 设置勾选  +  禁用
    setChecked(list = [], disabled = false, clean = false) {
      list = list.map(i => i.id);
      for (let i = 0; i < this.data.length; i++) {
        if (list.indexOf(this.data[i].id) != -1) {
          if (disabled) {
            this.$set(this.data[i], "disabled", true);
          }
          this.$refs.tree.setChecked(this.data[i], true);
        } else {
          if (clean) {
            this.$refs.tree.setChecked(this.data[i], false);
            this.$set(this.data[i], "disabled", false);
          }
        }
        if (this.data[i].childList.length > 0) {
          for (let j = 0; j < this.data[i].childList.length; j++) {
            if (list.indexOf(this.data[i].childList[j].id) != -1) {
              if (disabled) {
                this.$set(this.data[i].childList[j], "disabled", true);
              }
              this.$refs.tree.setChecked(this.data[i].childList[j], true);
            } else {
              if (clean) {
                this.$refs.tree.setChecked(this.data[i].childList[j], false);
                this.$set(this.data[i].childList[j], "disabled", false);
              }
            }
          }
        }
      }
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
    getmenu() {
      this.$post("/sys/per/menu/tree")
        .then(res => {
          const resData = res.data || [];
          this.createTree(resData);
        })
        .catch(() => {
          return;
        });
    },
    createTree(data) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.level = 1;
        if (element.childList && element.childList.length) {
          for (let j = 0; j < element.childList.length; j++) {
            element.childList[j].level = 2;
          }
        }
      }
      this.data = data;
    },
    /**
     * 返回
     */
    dohandleOk() {
      setTimeout(() => {
        this.$router.push({
          path: "/web/operate/roleList",
          query: {
            refrsh: true
          }
        });
      }, 300);
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
.roletree {
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #5c6be8 !important;
    border-color: #5c6be8 !important;
  }
  .custom-tree-node {
    width: 100%;
  }
  .el-tree-node__content {
    height: 100%;
    border-bottom: 1px solid #ccc;
    .el-checkbox {
      margin-left: 10px;
    }
  }
  .el-tree {
    border: 1px solid #ccc;
    border-bottom: 0;

    > div {
      > .el-tree-node__content {
        background-color: #eee;
        height: 30px;
        padding-left: 10px;
      }
      > .el-tree-node__children {
        .el-tree-node {
          background-color: #fff;
          .el-tree-node__content {
            padding: 10px 0 10px 18px;
            .level2-parent {
              padding-right: 20px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .el-tree-node__expand-icon {
    display: none;
  }
}
</style>

