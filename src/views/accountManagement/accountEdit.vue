<template>
  <div class="pageContol listWrap templateList">
    <div class="framePage">
      <div class="framePage-title">
        <span>
          <em>当前位置：</em>
          <a href="javascript:;">账号管理</a>
          <i>></i>
          <a href="javascript:;" @click="$router.back()">账号列表</a>
          <i>></i>
          <a href="javascript:;" @click="init" class="cur-a">{{ title }}</a>
        </span>
      </div>
      <div class="framePage-body">
        <div class="framePage-scroll">
          <div class="ovy-a">
            <div class="form-box">
              <el-form
                ref="ruleForm"
                label-width="7rem"
                class="form"
                :rules="rules"
                :model="ruleForm"
              >
                <el-form-item label="账号名称" prop="adminName">
                  <el-input v-model="ruleForm.adminName"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:5px" class="password">
                  <div>
                    <span>默认密码为Aa123456</span>
                  </div>
                </el-form-item>
                <el-form-item label="使用人姓名" prop="fullname">
                  <el-input v-model="ruleForm.fullname"></el-input>
                </el-form-item>
                <el-form-item label="使用人电话" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="realRoleId">
                  <el-select
                    v-model="ruleForm.realRoleId"
                    placeholder="请选择"
                    @change="roleChange"
                    filterable
                    clearable
                  >
                    <el-option
                      size="small"
                      v-for="item in rolelist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色类型" v-if="ruleForm.roleId != ''">
                  <el-select disabled v-model="ruleForm.roleId" clearable>
                    <el-option
                      size="small"
                      v-for="item in roleType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="归属公司"
                  v-if="ruleForm.roleId != '' && ruleForm.roleId == '-1'"
                >
                  <el-select v-model="ruleForm.specialCondition" clearable>
                    <el-option
                      size="small"
                      v-for="item in specialConditionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据权限" prop="desensitization">
                  <el-checkbox
                    v-model="ruleForm.adminSensitive"
                    @change="checkboxchangeIdcard"
                    >身份证脱敏</el-checkbox
                  >
                  <el-checkbox
                      v-model="ruleForm.mobileSensitive"
                      @change="checkboxchangeMobile"
                    >手机号脱敏</el-checkbox
                  >
                </el-form-item>
              </el-form>
              <el-form
                ref="ruleForm1"
                label-width="7rem"
                class="form"
                :rules="rules1"
                :model="ruleForm1"
                v-if="ruleForm.roleId == 2"
              >
                <el-form-item label="行政区划" prop="cityId">
                  <el-cascader
                    :props="{ emitPath: false, checkStrictly: true }"
                    v-model="ruleForm1.cityId"
                    :options="cityTree"
                    @change="handleCascader"
                    clearable
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="监管类型" prop="trainTypeId">
                  <el-cascader
                    :props="{
                      emitPath: false,
                      value: 'id',
                      label: 'label',
                      children: 'children',
                      checkStrictly: true,
                    }"
                    v-model="ruleForm1.trainTypeId"
                    :options="trainTypeList"
                    @change="handleTrainType"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-form>
              <el-form
                ref="ruleForm2"
                label-width="7rem"
                class="form"
                :rules="rules2"
                :model="ruleForm2"
                v-if="ruleForm.roleId == 3"
              >
                <el-form-item label="关联单位" prop="compId">
                  <el-select
                    clearable
                    v-model="ruleForm2.compId"
                    filterable
                    remote
                    :remote-method="searchCopmp"
                    placeholder="请至少输入三个字搜索"
                  >
                    <el-option
                      size="small"
                      v-for="item in compList"
                      :key="item.compId"
                      :label="item.compName"
                      :value="item.compId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="账号权限" prop="permissionsId">
                  <el-select
                    clearable
                    v-model="ruleForm2.permissionsId"
                    placeholder="请选择账号权限"
                  >
                    <el-option
                      size="small"
                      v-for="item in permissionsList1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="trainTypeIds">
                  <el-cascader
                    placeholder="请选择数据类型"
                    v-model="ruleForm2.trainTypeIds"
                    :options="trainTypeList2"
                    :props="propsTrainType"
                    @change="trainTypeListChange"
                    size="small"
                  ></el-cascader>
                </el-form-item>
              </el-form>
              <el-form
                ref="ruleForm3"
                label-width="7rem"
                class="form"
                :rules="rules3"
                :model="ruleForm3"
                v-show="ruleForm.roleId == -2"
              >
                <el-form-item label="关联课程方" prop="compId">
                  <el-select
                    clearable
                    v-model="ruleForm3.compId"
                    filterable
                    remote
                    :remote-method="searchCourseUser"
                    placeholder="请输入关键字搜索"
                  >
                    <el-option
                      size="small"
                      v-for="item in courseUserList"
                      :key="item.courseOwnerId"
                      :label="item.name"
                      :value="item.courseOwnerId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form
                ref="ruleForm4"
                label-width="7rem"
                class="form"
                :rules="rules4"
                :model="ruleForm4"
                v-show="ruleForm.roleId == -3"
              >
                <el-form-item label="关联代理商" prop="agencyId">
                  <el-select
                    clearable
                    v-model="ruleForm4.agencyId"
                    filterable
                    remote
                    :remote-method="searchAgency"
                    placeholder="请输入关键字搜索"
                    @change="agencyChange"
                  >
                    <el-option
                      size="small"
                      v-for="item in AgencyList"
                      :key="item.agencyId"
                      :label="
                        item.agencyType != '20'
                          ? item.agencyName + '(' + item.agencyMobile + ')'
                          : item.agencyName
                      "
                      :value="item.agencyId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="账号权限" prop="permissionsId">
                  <el-select
                    clearable
                    v-model="ruleForm4.permissionsId"
                    @change="permissionsChange"
                    placeholder="请选择账号权限"
                  >
                    <el-option
                      size="small"
                      v-for="item in permissionsList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据类型" prop="trainTypeId">
                  <el-cascader
                    placeholder="请选择数据类型"
                    v-model="ruleForm4.trainTypeId"
                    :options="trainTypeList1"
                    :props="propsTrainType"
                    size="small"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="创建账号" prop="allowNew">
                  <el-checkbox
                    v-model="ruleForm4.allowNew"
                    @change="checkboxchangeallowNew"
                    >代理商允许新建账号</el-checkbox
                  >
                </el-form-item>
              </el-form>
              <el-form
                ref="ruleForm5"
                label-width="7rem"
                class="form"
                :rules="rules5"
                :model="ruleForm5"
                v-if="ruleForm.roleId == -4"
              >
                <el-form-item label="行政区划" prop="cityId">
                  <el-cascader
                    :props="{ emitPath: false, checkStrictly: true }"
                    v-model="ruleForm5.cityId"
                    :options="cityTree"
                    @change="handleCascader"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn-box flexcc">
              <el-button @click="dohandleOk" class="bgc-bv">取 消</el-button>
              <el-button v-if="stu === 'add'" class="bgc-bv" @click="doAddSave"
                >确 定</el-button
              >
              <el-button v-else class="bgc-bv" @click="doEditSave"
                >确 定</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "operate/accountEdit",
  components: {},
  data() {
    return {
      title: "创建账号",
      stu: "add",
      id: "",
      // 基本信息
      ruleForm: {
        adminName: "", // 角色名称
        fullname: "", // 使用人姓名
        mobile: "", // 使用人电话
        realRoleId: "", // 角色id
        roleId: "", // 角色类型下拉选回显
        adminSensitive: true, // 身份证脱敏
        mobileSensitive: true, //手机号脱敏
        specialCondition: "", // 归属公司
      },
      ruleForm1: {
        cityId: "", // 行政区划id
        trainTypeId: "", // 培训类型
      },
      ruleForm2: {
        compId: "", // 单位
        trainTypeIds: [],
        permissionsId: '',
      },
      ruleForm3: {
        compId: "", // 课程方
      },
      ruleForm4: {
        agencyId: "", // 代理商
        trainTypeId: [],
        permissionsId: '',
        allowNew:false,
      },
      ruleForm5: {
         cityId: "", // 行政区划id
      },
      roleType: [], // 角色类型列表
      rules: {
        adminName: [
          { required: true, trigger: "blur", message: "账号名称不能为空" },
          { trigger: "blur", max: 20, message: "账号名称不超过20个字" },
        ],
        fullname: [
          { required: true, trigger: "blur", message: "使用人姓名不能为空" },
          { trigger: "blur", max: 20, message: "使用人姓名不超过20个字" },
        ],
        realRoleId: [
          { required: true, trigger: "change", message: "请选择角色" },
        ],
        mobile: [
          {
            required: true,
            validator: this.$validatePhone,
            trigger: "blur",
          },
        ],
      },
      rules1: {
        cityId: [
          { required: true, trigger: "change", message: "行政区划不能为空" },
        ],
        trainTypeId: [
          { required: true, trigger: "change", message: "培训类型不能为空" },
        ],
      },
      rules2: {
        compId: [
          { required: true, trigger: "change", message: "关联单位不能为空" },
        ],
        permissionsId: [
          { required: true, trigger: "change", message: "账号权限不能为空" },
        ],
        trainTypeIds: [
          { required: true, trigger: "change", message: "数据类型不能为空" },
        ],
      },
      rules3: {
        compId: [
          { required: true, trigger: "change", message: "课程方不能为空" },
        ],
      },
      rules4: {
        agencyId: [
          { required: true, trigger: "change", message: "代理商不能为空" },
        ],
        permissionsId: [
          { required: true, trigger: "change", message: "账号权限不能为空" },
        ],
        trainTypeId: [
          { required: true, trigger: "change", message: "培训类型不能为空" },
        ],
      },
       rules5: {
        cityId: [
          { required: true, trigger: "change", message: "行政区划不能为空" },
        ],
      },
      courseUserList: [], // 课程方
      cityTree: [], // 行政区划
      rolelist: [], // 角色列表
      trainTypeList: [], // 培训类型
      compList: [], // 单位
      parentName: "", //
      specialConditionList: [], // 归属公司
      AgencyList: [], // 代理商
      permissionsList: [
        {
          value: 10,
          label: "仅本人",
        },
        {
          value: 20,
          label: "仅本公司",
        },
      ],
      permissionsList1: [
        {
          value: 10,
          label: "仅本人",
        },
        {
          value: 20,
          label: "仅本公司",
        },
        {
          value: 30,
          label: "所有公司(包含子单位)",
        },
      ],
      trainTypeList1: [],
      trainTypeList2: [],
      propsTrainType: {
        value: "id",
        label: "label",
        emitPath: false,
        checkStrictly: true,
        multiple: true,
      },
    };
  },
  created() {
    this.stu = this.$route.query.stu;
    this.init();
    if (this.stu == "edit") {
      this.id = this.$route.query.id;
      this.title = "编辑账号";
      this.getDetail(this.id);
    }
  },
  computed: {},
  methods: {
    init() {
      this.getcity(); // 行政区划
      this.getrole(); // 基础角色类型
      this.getTraintype(); // 培训
      this.getspecialConditionList(); // 归属公司
      this.getCourseUser(); // 课程方
      this.getAgency(); // 代理方
      this.getTrainTypeList1();
      if (this.$route.query.agencyId) {
        console.log(this.$route.query.trainTypeIds.split(","));
        this.ruleForm.realRoleId = this.$route.query.realRoleId;
        this.ruleForm.roleId = this.$route.query.roleId;
        this.ruleForm4.agencyId = this.$route.query.agencyId;
        this.ruleForm4.trainTypeId = this.$route.query.trainTypeIds.split(",");
        this.getAgencyL(this.$route.query.agencyId); // 代理商
        this.getTrainTypeList(this.$route.query.agencyId);
      }
    },
    /**
     * tree接口
     */
    getTrainTypeList(agencyId) {
      this.$post("/agency/ma-agency-range/trainTypeTree", { agencyId })
        .then((res) => {
          let data = res.data || [];
          this.trainTypeList1 = data;
        })
        .catch((err) => {
          return;
        });
    },
    getTrainTypeList1() {
      this.$post("/sys/category/train-type/tree")
        .then((res) => {
          let data = res.data || [];
          this.trainTypeList2 = data;
          data.map((el) => {
            this.ruleForm2.trainTypeIds.push(el.id);
            console.log(el);
            if (el.children) {
              el.children.map((ele) => {
                ele.disabled = true;
              });
            }
            // el.children.map(ele => {
            //   ele.disabled = true
            // })
          });
        })
        .catch((err) => {
          return;
        });
    },
    trainTypeListChange(val) {
      this.$forceUpdate();
        console.log(val);
        val.map((el) => {
          this.trainTypeList2.map((els) => {
            if (el != els.id) {
              if (els.children) {
                els.children.map((ele) => {
                  ele.disabled = false;
                   this.$forceUpdate();
                });
              }
            } else {
              console.log('ii',777);
               if (els.children) {
                els.children.map((ele) => {
                  ele.disabled = true;
                });
              }
            }
          
          });
        });
      this.$forceUpdate();
    },
    // 归属公司
    getspecialConditionList() {
      const list = this.$setDictionary("SPECIALCONDITION", "list");
      for (const key in list) {
        this.specialConditionList.push({
          id: key,
          name: list[key],
        });
      }
    },
    checkboxchangeIdcard(val) {
      this.ruleForm.adminSensitive = val;
    },
    checkboxchangeMobile(val) {
      this.ruleForm.mobileSensitive = val;
    },
    checkboxchangeallowNew(val) {
      this.ruleForm4.allowNew = val;
    },
    /**
     * 新增
     */
    doAddSave() {
      const params = {
        adminName: this.ruleForm.adminName,
        fullname: this.ruleForm.fullname,
        mobile: this.ruleForm.mobile,
        realRoleId: this.ruleForm.realRoleId,
        roleId: this.ruleForm.roleId,
        adminSensitive: this.ruleForm.adminSensitive,
        mobileSensitive: this.ruleForm.mobileSensitive,
        allowNew:this.ruleForm4.allowNew,
      };
      if (this.ruleForm.specialCondition) {
        params.specialCondition = this.ruleForm.specialCondition;
      }
      if (this.ruleForm1.cityId) {
        params.areaId = this.ruleForm1.cityId;
      }
      if (this.ruleForm1.trainTypeId) {
        params.trainTypeId = this.ruleForm1.trainTypeId;
      }
      if (this.ruleForm2.compId) {
        params.compId = this.ruleForm2.compId;
      }
      if (this.ruleForm.roleId == "3") {
        if (this.ruleForm2.permissionsId) {
          params.authorizationScope = this.ruleForm2.permissionsId;
        }
        if (this.ruleForm2.trainTypeIds) {
          params.trainTypeIdRange = this.ruleForm2.trainTypeIds.toString();
        }
      }
      if (this.ruleForm3.compId) {
        params.compId = this.ruleForm3.compId;
      }
      if (this.ruleForm4.agencyId) {
        params.compId = this.ruleForm4.agencyId;
      }
      if (this.ruleForm4.permissionsId) {
        params.authorizationScope = this.ruleForm4.permissionsId;
      }
      if (this.ruleForm.roleId == "-3") {
        if (this.ruleForm4.trainTypeId) {
          params.trainTypeIdRange = this.ruleForm4.trainTypeId.toString();
        }
      }
      if (this.ruleForm.roleId == "-4") {
        if (this.ruleForm5.cityId) {
          params.areaId = this.ruleForm5.cityId;
        }
      }
      // console.log(params);
      // console.log(this.ruleForm2.trainTypeId);
      if (this.check()) {
        this.$post("/sys/admin/insert", params)
          .then((res) => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "创建成功",
              });
              this.dohandleOk();
            }
          })
          .catch(() => {
            return;
          });
      }
    },
    /**
     * 编辑
     */
    doEditSave() {
      const params = {
        adminName: this.ruleForm.adminName,
        fullname: this.ruleForm.fullname,
        mobile: this.ruleForm.mobile,
        realRoleId: this.ruleForm.realRoleId,
        roleId: this.ruleForm.roleId,
        adminId: this.id,
        adminSensitive: this.ruleForm.adminSensitive,
        mobileSensitive: this.ruleForm.mobileSensitive,
        allowNew:this.ruleForm4.allowNew,
      };
      if (this.ruleForm.specialCondition) {
        params.specialCondition = this.ruleForm.specialCondition;
      }
      if (this.ruleForm1.cityId) {
        params.areaId = this.ruleForm1.cityId;
      }
      if (this.ruleForm1.trainTypeId) {
        params.trainTypeId = this.ruleForm1.trainTypeId;
      }
      if (this.ruleForm2.compId) {
        params.compId = this.ruleForm2.compId;
      }
      if (this.ruleForm.roleId == "3") {
        if (this.ruleForm2.permissionsId) {
          params.authorizationScope = this.ruleForm2.permissionsId;
        }
        if (this.ruleForm2.trainTypeIds) {
          params.trainTypeIdRange = this.ruleForm2.trainTypeIds.toString();
        }
      }

      if (this.ruleForm3.compId) {
        params.compId = this.ruleForm3.compId;
      }
      if (this.ruleForm4.agencyId) {
        params.compId = this.ruleForm4.agencyId;
      }
      if (this.ruleForm4.permissionsId) {
        params.authorizationScope = this.ruleForm4.permissionsId;
      }
      if (this.ruleForm.roleId == "-3") {
        if (this.ruleForm4.trainTypeId) {
          params.trainTypeIdRange = this.ruleForm4.trainTypeId.toString();
        }
      }
      if (this.ruleForm.roleId == "-4") {
        if (this.ruleForm5.cityId) {
          params.areaId = this.ruleForm5.cityId;
        }
      }

      if (this.check()) {
        this.$post("/sys/admin/modify", params)
          .then((res) => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.dohandleOk();
              // this.$router.push({
              //   path:"/web/operate/accountList",
              //   query:{
              //     refrsh:true
              //   }
              //   });
            }
          })
          .catch(() => {
            return;
          });
      }
    },
    /**
     * 编辑回显
     */
    getDetail(id) {
      this.$post("/sys/admin/adminId", { adminId: id }).then((res) => {
        this.ruleForm = { ...res.data };
        if (res.data.trainTypeId) {
          this.ruleForm1.trainTypeId = res.data.trainTypeId;
        }
        if (res.data.areaId) {
          this.ruleForm1.cityId = res.data.areaId;
        }
        if (res.data.compId) {
          if (res.data.roleId == -2) {
            this.ruleForm3.compId = res.data.compId;
            this.getCourseUserView(res.data.compId);
          } else {
            this.ruleForm2.compId = res.data.compId;
            this.ruleForm2.trainTypeIds = res.data.trainTypeIdRange.split(",");
            this.ruleForm2.permissionsId = res.data.authorizationScope;
          }
          if (res.data.roleId == "3") {
            this.ruleForm2.trainTypeIds = res.data.trainTypeIdRange.split(",");
            this.ruleForm2.permissionsId = res.data.authorizationScope;
            this.getCompany(res.data.compId);
          }
          if (res.data.roleId == "-3") {
            this.ruleForm4.agencyId = res.data.compId;
            this.getAgencyL(res.data.compId);
            this.ruleForm4.trainTypeId = res.data.trainTypeIdRange.split(",");
            this.ruleForm4.permissionsId = res.data.authorizationScope;
            this.ruleForm4.allowNew = res.data.allowNew;
            this.getTrainTypeList(res.data.compId); // 数据类型
          }
        }
         if (res.data.roleId == "-4") {
            this.ruleForm5.cityId = res.data.areaId;
          }
      });
    },
    /**
     * 课程方
     */
    getCourseUser() {
      this.$post("/biz/ec/course/owner/list", {}, 3000, true, 2).then((res) => {
        this.courseUserList = res.data;
      });
    },
    getCourseUserView(courseOwnerId) {
      this.$post("/biz/ec/course/owner/list", { courseOwnerId }, 3000, true, 2).then((res) => {
        this.courseUserList = res.data;
      });
    },

    /**
     * 课程方
     */
    searchCourseUser(query) {
      if (query.trim().length > 0) {
        this.$post("/biz/ec/course/owner/list", { name: query }, 3000, true, 2).then((res) => {
          this.courseUserList = res.data;
        });
      } else {
        this.courseUserList = [];
      }
    },
    /**
     * 代理商
     */
    agencyChange(val) {
      console.log(val);
      this.getTrainTypeList(val); // 数据类型
    },
    getAgency() {
      this.$post("/biz/mercantile/agency/searchList", {}).then((res) => {
        this.AgencyList = res.data;
      });
    },
    searchAgency(query) {
      if (query.trim().length > 0) {
        this.$post("/biz/mercantile/agency/searchList", {
          agencyName: query,
        }).then((res) => {
          this.AgencyList = res.data;
        });
      } else {
        this.AgencyList = [];
      }
    },
    getAgencyL(agencyId) {
      this.$post("/biz/mercantile/agency/searchList", { agencyId }).then(
        (res) => {
          this.AgencyList = res.data || [];
        }
      );
    },
    permissionsChange(val) {
      console.log(val);
      if (val == 10) {
        this.trainTypeList1.map((el) => {
          console.log(el.id);
          this.ruleForm4.trainTypeId.push(el.id);
        });
      }
    },
    /**
     * 角色字段点击
     */
    roleChange(val) {
      this.ruleForm.roleId = this.rolelist.find((i) => i.id == val).parentId;
      this.ruleForm1.trainTypeId = "";
      this.ruleForm1.areaId = "";
      // this.ruleForm2.compId = "";
      this.ruleForm2.permissionsId = 20;
      // this.ruleForm3.compId = "";
      // this.ruleForm4.agencyId = "";
    },
    /**
     * 查询角色列表 /sys/per/role/list
     */
    getrole() {
      this.$post("/sys/per/role/basal")
        .then((res) => {
          this.roleType = res.data || [];
          this.getRoleList(); // 角色类型
        })
        .catch(() => {
          return;
        });
    },
    getRoleList() {
      this.$post("/sys/per/role/limit/list")
        .then((res) => {
          const data = res.data || [];
          data.map((i) => {
            i.name = i.name + "(" + this.getRoleTypeName(i.parentId) + ")";
          });
          this.rolelist = res.data;
        })
        .catch(() => {
          return;
        });
    },
    getRoleTypeName(val) {
      return this.roleType.find((i) => i.id == val).name;
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
    handleCascader(val) {
      console.log(val);
    },
    /**
     * 单位回显接口
     */
    getCompany(id) {
      this.$post("/sys/company/id", { compId: id }).then((res) => {
        this.compList = [res.data];
      });
    },
    handleTrainType(val) {
      console.log(val);
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
    /**
     * 单位
     */
    searchCopmp(query) {
      if (query.trim().length > 2) {
        this.$post("/sys/company/likeCompName", { compName: query }).then(
          (res) => {
            this.compList = res.data;
          }
        );
      } else {
        this.compList = [];
      }
    },
    check() {
      let stu = false;
      const form = this.$refs.ruleForm;
      const form1 = this.$refs.ruleForm1;
      const form2 = this.$refs.ruleForm2;
      const form3 = this.$refs.ruleForm3;
      const form4 = this.$refs.ruleForm4;
      const form5 = this.$refs.ruleForm5;
      form.validate((valid) => {
        if (valid) {
          if (this.ruleForm.roleId == 1 || this.ruleForm.roleId == -1) {
            stu = true;
            if (form1) {
              form1.clearValidate();
            }
            if (form2) {
              form2.clearValidate();
            }
            if (form3) {
              form3.clearValidate();
            }
            this.ruleForm1 = {
              cityId: "", // 行政区划id
              trainTypeId: "", // 培训类型
            };
            this.ruleForm2 = {
              compId: "", // 单位
              trainTypeIds: [], // 培训类型
            };
            this.ruleForm3 = {
              compId: "", // 课程方
            };
          } else if (this.ruleForm.roleId == 2) {
            form1.validate((valid1) => {
              if (valid1) {
                stu = true;
                if (form2) {
                  form2.clearValidate();
                }
                if (form3) {
                  form3.clearValidate();
                }
                this.ruleForm2 = {
                  compId: "", // 单位
                  trainTypeId: [], // 培训类型
                };
                this.ruleForm3 = {
                  compId: "", // 课程方
                };
              } else {
                stu = false;
              }
            });
          } else if (this.ruleForm.roleId == 3) {
            form2.validate((valid2) => {
              if (valid2) {
                stu = true;

                if (form1) {
                  form1.clearValidate();
                }
                if (form3) {
                  form3.clearValidate();
                }
                this.ruleForm1 = {
                  cityId: "", // 行政区划id
                  trainTypeId: "", // 培训类型
                };
                this.ruleForm3 = {
                  compId: "", // 课程方
                };
              } else {
                stu = false;
              }
            });
          } else if (this.ruleForm.roleId == -2) {
            form3.validate((valid3) => {
              if (valid3) {
                stu = true;
                if (form1) {
                  form1.clearValidate();
                }
                if (form2) {
                  form2.clearValidate();
                }
                this.ruleForm1 = {
                  cityId: "", // 行政区划id
                  trainTypeId: "", // 培训类型
                };
                this.ruleForm2 = {
                  compId: "", // 单位
                  trainTypeIds: [], // 培训类型
                };
              } else {
                stu = false;
              }
            });
          } else if (this.ruleForm.roleId == -3) {
            form4.validate((valid4) => {
              if (valid4) {
                stu = true;
                if (form1) {
                  form1.clearValidate();
                }
                if (form2) {
                  form2.clearValidate();
                }
                if (form3) {
                  form3.clearValidate();
                }
                this.ruleForm1 = {
                  cityId: "", // 行政区划id
                  trainTypeId: "", // 培训类型
                };
                this.ruleForm2 = {
                  compId: "", // 单位
                  trainTypeIds: [], // 培训类型
                };
                this.ruleForm3 = {
                  compId: "", // 单位
                };
              } else {
                stu = false;
              }
            });
          } else if (this.ruleForm.roleId == -4) {
            form5.validate((valid4) => {
              if (valid4) {
                stu = true;
                if (form1) {
                  form1.clearValidate();
                }
                if (form2) {
                  form2.clearValidate();
                }
                if (form3) {
                  form3.clearValidate();
                }
                if (form4) {
                  form4.clearValidate();
                }
                this.ruleForm1 = {
                  cityId: "", // 行政区划id
                  trainTypeId: "", // 培训类型
                };
                this.ruleForm2 = {
                  compId: "", // 单位
                  trainTypeIds: [], // 培训类型
                };
                this.ruleForm3 = {
                  compId: "", // 单位
                };
                this.ruleForm4 = {
                  agencyId: "", // 代理商
                  trainTypeId: [],
                  permissionsId: '',
                  allowNew:false,
                };
              } else {
                stu = false;
              }
            });
          } else if (this.ruleForm.roleId == -5) {
            form.validate((valid4) => {
              if (valid4) {
                stu = true;
                if (form1) {
                  form1.clearValidate();
                }
                if (form2) {
                  form2.clearValidate();
                }
                if (form3) {
                  form3.clearValidate();
                }
                if (form4) {
                  form4.clearValidate();
                }
                this.ruleForm1 = {
                  cityId: "", // 行政区划id
                  trainTypeId: "", // 培训类型
                };
                this.ruleForm2 = {
                  compId: "", // 单位
                  trainTypeIds: [], // 培训类型
                };
                this.ruleForm3 = {
                  compId: "", // 单位
                };
                this.ruleForm4 = {
                  agencyId: "", // 代理商
                  trainTypeId: [],
                  permissionsId: '',
                  allowNew:false,
                };
              } else {
                stu = false;
              }
            });
          }
        } else {
          stu = false;
          this.$message.error("校验未通过");
        }
      });
      return stu;
    },
    /**
     * 返回
     */
    dohandleOk() {
      setTimeout(() => {
        this.$router.push({
          path: "/web/operate/accountList",
          query: {
            refrsh: true,
          },
        });
      }, 300);
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
.password {
  .el-form-item__content {
    line-height: 20px;
  }
}
</style>
